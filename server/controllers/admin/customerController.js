const User = require("../../model/userModel");

// Getting all Customer to list on admin dashboard
const getCustomers = async (req, res) => {
  try {
    const customers = await User.find();

    res.status(200).json({ customers });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCustomer = (req, res) => {
  const { id } = req.params;

  console.log(id);

  res.status(200).json({ msg: `User id ${id}` });
};

// Creating new Customer if needed for admin
const addCustomer = async (req, res) => {
  try {
    // Will be update later
    let formData = { ...req.body, isActive: true };
    const files = req?.files;

    if (files && files.length > 0) {
      formData.moreImageURL = [];
      formData.imageURL = "";
      files.map((file) => {
        if (file.fieldname === "imageURL") {
          formData.imageURL = file.filename;
        } else {
          formData.moreImageURL.push(file.filename);
        }
      });
    }

    console.log(formData);

    const customer = await User.create(formData);

    console.log(customer);

    res.status(200).json({ customer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCustomer = (req, res) => {
  const { id } = req.params;

  console.log(id);

  res.status(200).json({ msg: `Customer Number ${id} - updated` });
};

const deleteCustomer = (req, res) => {
  const { id } = req.params;

  console.log(id);

  res.status(200).json({ msg: `Customer Number ${id} - Deleted` });
};

module.exports = {
  getCustomers,
  getCustomer,
  addCustomer,
  deleteCustomer,
  updateCustomer,
};
