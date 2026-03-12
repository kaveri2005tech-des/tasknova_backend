import User from "../models/userModel.js";

export const isUserValid = async function (compareEmail) {
  const userEmails = await User.find().select({
    _id: false,
    email: true,
  });
  const arrUserEmails = userEmails.map((obj) => obj.email);
  if (typeof compareEmail === "string")
    return arrUserEmails.includes(compareEmail);
  else {
    const resultArr = compareEmail.map((val) => {
      return arrUserEmails.includes(val);
    });
    return !resultArr.includes(false);
  }
};
