const Orders = require("../../model/orderModel");
const ExcelJS = require("exceljs");

const generateExcel = async (req, res) => {
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

    const orders = await Orders.find({}).populate([
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

module.exports = {
  generateExcel,
};
