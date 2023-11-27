const User = require("../../model/userModel");

// Getting all Admins to list on super admin dashboard
const getAdmins = async (req, res) => {
  try {
    const { status, search } = req.query;

    let filter = {};

    if (status) {
      if (status === "active") {
        filter.isActive = true;
      } else {
        filter.isActive = false;
      }
    }

    if (search) {
      if (search.includes(" ")) {
        const [firstName, lastName] = search.split(" ");
        filter.firstName = { $regex: new RegExp(firstName, "i") };
        filter.lastName = { $regex: new RegExp(lastName, "i") };
      } else {
        filter.$or = [
          { firstName: { $regex: new RegExp(search, "i") } },
          { lastName: { $regex: new RegExp(search, "i") } },
        ];
      }
    }

    const admins = await User.find(
      { role: "admin", ...filter },
      {
        password: 0,
        dateOfBirth: 0,
        role: 0,
        walletBalance: 0,
        isEmailVerified: 0,
      }
    );
    if (admins.length === 0) {
      throw Error(`No ${isActive ? "active" : "blocked"} admin`);
    }

    res.status(200).json({ admins });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAdmin = (req, res) => {
  const { id } = req.params;

  console.log(id);

  res.status(200).json({ msg: `Admin id ${id}` });
};

// Creating new Admin if needed for Super Admin
const addAdmin = async (req, res) => {
  try {
    const userCredentials = req.body;

    const user = await User.signup(userCredentials, "admin", true);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAdmin = (req, res) => {
  const { id } = req.params;

  console.log(id);

  res.status(200).json({ msg: `Admin Number ${id} - updated` });
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await User.findOneAndDelete({ _id: id });

    if (!admin) {
      throw Error("No Such Admin");
    }

    res.status(200).json({ admin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const blockOrUnBlock = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const admin = await User.findByIdAndUpdate(
      id,
      { $set: { isActive } },
      { new: true }
    );
    res.status(200).json({ admin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAdmins,
  getAdmin,
  addAdmin,
  deleteAdmin,
  updateAdmin,
  blockOrUnBlock,
};
