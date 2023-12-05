const User = require("../models/userModel");

async function update_profile({ userid, profile }) {
  try {
    const user = await User.findOne({ userid });
    if (user) {
      if (profile.name) user.name = profile.name;
      if (profile.email) user.email = profile.email;
      if (profile.gender) user.gender = profile.gender;
      if (profile.contact_number) user.contact_number = profile.contact_number;
      await user.save();
      return {
        status: 200,
        response: {
          success: true,
          message: "Profile Updated.",
          profile: user.getUserProfile(),
        },
      };
    } else {
      return {
        status: 500,
        response: {
          success: false,
          message: "Internal Server Error.",
          user: user.getUserProfile(),
        },
      };
    }
  } catch (error) {
    console.log(error.message);
    return {
      status: 500,
      response: {
        success: false,
        message: error.message,
      },
    };
  }
}

async function get_profile({ userid }) {
  try {
    const user = await User.findOne({ userid });
    if (user) {
      return {
        status: 200,
        response: {
          success: true,
          profile: user.getUserProfile(),
        },
      };
    } else {
      return {
        status: 505,
        response: {
          success: false,
          message: "Internal Server Error.",
        },
      };
    }
  } catch (error) {
    console.log(error.message);
    return {
      status: 500,
      response: {
        success: false,
        message: error.message,
      },
    };
  }
}

async function delete_user({ userid }) {
  try {
    const user = await User.deleteOne({ userid });
    return {
      status: 200,
      response: {
        success: true,
        message: "User Deleted.",
      },
    };
  } catch (error) {
    console.log(error.message);
    return {
      status: 500,
      response: {
        success: false,
        message: error.message,
      },
    };
  }
}

module.exports = {
  update_profile,
  get_profile,
  delete_user,
};
