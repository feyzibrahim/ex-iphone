const User = require("../../model/userModel");

// Getting all Customer to list on admin dashboard
const getCustomers = async (req, res) => {
  try {
    const query = req.query;

    let customers;

    // Getting all users
    if (Object.keys(query).length === 0) {
      customers = await User.find(
        { role: "user" },
        {
          password: 0,
          dateOfBirth: 0,
          role: 0,
          walletBalance: 0,
          isEmailVerified: 0,
        }
      );
    } else {
      // Fetching only active or not active users
      let { isActive } = query;

      customers = await User.find(
        { role: "user", isActive },
        {
          password: 0,
          dateOfBirth: 0,
          role: 0,
          walletBalance: 0,
          isEmailVerified: 0,
        }
      );
      if (customers.length === 0) {
        throw Error(`No ${isActive ? "active" : "blocked"} users`);
      }
    }

    res.status(200).json({ customers });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Not completed
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

    const customer = await User.create(formData);

    res.status(200).json({ customer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Not completed
const updateCustomer = (req, res) => {
  const { id } = req.params;

  console.log(id);

  res.status(200).json({ msg: `Customer Number ${id} - updated` });
};

// Delete a user
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await User.findOneAndDelete({ _id: id });

    if (!customer) {
      throw Error("No Such Customer");
    }

    res.status(200).json({ customer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Block or unblock user
const blockOrUnBlockCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const customer = await User.findByIdAndUpdate(
      id,
      { $set: { isActive } },
      { new: true }
    );
    res.status(200).json({ customer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCustomers,
  getCustomer,
  addCustomer,
  deleteCustomer,
  updateCustomer,
  blockOrUnBlockCustomer,
};
