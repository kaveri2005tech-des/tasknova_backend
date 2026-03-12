import { Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import { hash } from "bcrypt";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: [true, "Email address already exist"],
      required: [true, "Email address is required"],
      validate: [isEmail, "Not an Valid Email"],
    },
    password: {
      type: String,
      max: [16, "max limit of 16 characters"],
      min: [, "min limit of 16 characters"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^()[\]{}])[A-Za-z\d@.#$!%*?&^()[\]{}]{8,16}$/,
        "Password must be 8-16 characters and include uppercase, lowercase, number, and special character",
      ],
    },
    confirmPassword: {
      type: String,
      max: [16, "max limit of 16 characters"],
      min: [, "min limit of 16 characters"],
      validate: [
        function (val) {
          return val === this.password;
        },
        "Confirm Password and Password didn't match",
      ],
    },
  },
  { expires: 30000 },
);

userSchema.pre("save", async function () {
  this.password = await hash(this.password, 8);
  this.confirmPassword = undefined;
});

const User = model("User", userSchema);
export default User;
