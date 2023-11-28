const Order = require("../../model/orderModel");
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");
const csv = require("csv");
const stringify = csv.stringify;

// Generating Excel sheet for orders.
const generateOrderExcel = async (req, res) => {
  const { startingDate, endingDate } = req.query;

  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Orders");

    worksheet.columns = [
      { header: "Order ID", key: "_id", width: 20 },
      { header: "User ID", key: "user._id", width: 20 },
      { header: "User Name", key: "user.firstName" },
      { header: "User Email", key: "user.email" },
      { header: "Status", key: "status" },
      { header: "Address", key: "address.address", width: 35 },
      { header: "City", key: "address.city" },
      { header: "Products", key: "products", width: 40 },
      { header: "Subtotal", key: "subTotal" },
      { header: "Shipping", key: "shipping" },
      { header: "Tax", key: "tax" },
      { header: "Total Price", key: "totalPrice" },
    ];

    // Filtering based on dates. If they are provided along the URL as query
    const filter = {};
    if (startingDate) {
      const date = new Date(startingDate);
      filter.createdAt = { $gte: date };
    }
    if (endingDate) {
      const date = new Date(endingDate);
      filter.createdAt = { ...filter.createdAt, $lte: date };
    }

    // Fetching all the orders
    const orders = await Order.find(filter).populate([
      "user",
      "address",
      "statusHistory",
      "products",
      "products.productId",
    ]);

    orders.map((item) => {
      const productsDetails = item.products
        .map((product) => {
          return `${product.productId.name} (${product.quantity} units, ₹${product.price} each)`;
        })
        .join("\n");

      const row = {
        _id: item._id.toString(),
        "user._id": item.user._id.toString(),
        "user.firstName": item.user.firstName + " " + item.user.lastName,
        "user.email": item.user.email,
        status: item.status,
        "address.address": item.address.address,
        "address.city": item.address.city,
        products: productsDetails,
        subTotal: item.subTotal,
        shipping: item.shipping,
        tax: item.tax,
        totalPrice: item.totalPrice,
      };

      worksheet.addRow(row);
    });

    // Set headers for the response
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=orders.xlsx");

    const buffer = await workbook.xlsx.writeBuffer();

    res.send(buffer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Generating CSV for orders
const generateOrderCSV = async (req, res) => {
  const { startingDate, endingDate } = req.query;

  try {
    // Filtering based on dates. If they are provided along the URL as query
    const filter = {};
    if (startingDate) {
      const date = new Date(startingDate);
      filter.createdAt = { $gte: date };
    }
    if (endingDate) {
      const date = new Date(endingDate);
      filter.createdAt = { ...filter.createdAt, $lte: date };
    }

    // Fetching all the orders
    const orders = await Order.find(filter).populate([
      "user",
      "address",
      "statusHistory",
      "products",
      "products.productId",
    ]);

    const csvData = [];

    // Headers
    const headers = [
      "Order ID",
      "User ID",
      "User Name",
      "User Email",
      "Status",
      "Address",
      "City",
      "Products",
      "Subtotal",
      "Shipping",
      "Tax",
      "Total Price",
    ];

    csvData.push(headers);

    orders.forEach((item) => {
      const productsDetails = item.products
        .map((product) => {
          return `${product.productId.name} (${product.quantity} units, ₹${product.price} each)`;
        })
        .join("\n");

      const row = [
        item._id.toString(),
        item.user._id.toString(),
        item.user.firstName + " " + item.user.lastName,
        item.user.email,
        item.status,
        item.address.address,
        item.address.city,
        productsDetails,
        item.subTotal,
        item.shipping,
        item.tax,
        item.totalPrice,
      ];

      csvData.push(row);
    });

    // Set headers for the response
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=orders.csv");

    // Convert the CSV data to a string and send it in the response
    stringify(csvData, { quoted: true }, (err, output) => {
      if (err) {
        return res.status(500).json({ error: "Failed to generate CSV" });
      }

      res.send(output);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Generate PDF function

const generatePDF = async (orderData) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });

      const buffers = [];
      doc.on("data", (buffer) => buffers.push(buffer));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", (error) => reject(error));

      doc.text("Order History", { align: "center", fontSize: 18 }).moveDown();

      // Headers
      const headers = [
        "_id",
        "user._id",
        "user.firstName",
        "user.email",
        "status",
        "address.address",
        "address.city",
        "subTotal",
        "shipping",
        "tax",
        "totalPrice",
      ];

      // Calculate column widths
      const columnWidths = headers.map((header) =>
        Math.max(
          header.length,
          ...orderData.map((item) => String(item[header]).length)
        )
      );

      // Table row with bottom line
      const generateTableRow = (y, values) => {
        values.forEach((value, index) => {
          doc.text(value, 50 + index * 100, y);
          if (index < values.length - 1) {
            doc
              .moveTo(50 + (index + 1) * 100, y)
              .lineTo(50 + (index + 1) * 100, y + 15);
          }
        });
      };

      // Print headers with styling
      generateTableRow(doc.y + 10, headers);

      doc.moveDown();

      // Loop through orders and add content manually
      orderData.forEach((item) => {
        generateTableRow(
          doc.y,
          headers.map((header) => String(item[header]))
        );

        doc.moveDown(); // Move down for the next row
      });

      // End the document
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

// Controller function for Generating PDF for orders
const generateOrderPDF = async (req, res) => {
  const { startingDate, endingDate } = req.query;

  try {
    // Filtering based on dates. If they are provided along the URL as query
    const filter = {};
    if (startingDate) {
      const date = new Date(startingDate);
      filter.createdAt = { $gte: date };
    }
    if (endingDate) {
      const date = new Date(endingDate);
      filter.createdAt = { ...filter.createdAt, $lte: date };
    }

    // Fetching all the orders
    const orders = await Order.find(filter).populate([
      "user",
      "address",
      "statusHistory",
      "products",
      "products.productId",
    ]);

    const pdfBuffer = await generatePDF(orders);

    // Set headers for the response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=orders.pdf");

    res.status(200).end(pdfBuffer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  generateOrderExcel,
  generateOrderCSV,
  generateOrderPDF,
};
