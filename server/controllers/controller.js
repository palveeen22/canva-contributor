const { compareHash } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "Invalid email/password" };
      }

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw { name: "Invalid email/password" };
      }

      const isValidPassword = compareHash(password, user.password);
      if (!isValidPassword) {
        throw { name: "Invalid email/password" };
      }

      const accessToken = signToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json({ access_token: accessToken });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
