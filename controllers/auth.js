import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register User
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.json({
        massage: "Даний вже username занятий.",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,

      { expiresIn: "30d" }
    );

    await newUser.save();

    res.json({
      newUser,
      token,
      massage: "Регістрація пройшла успішно!",
    });
  } catch (error) {
    res.json({
      message: "Ошибка при созданії User",
    });
  }
};

//Login User
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        message: "Такого юзера немає",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({
        message: "Нeправильний пароль.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,

      { expiresIn: "30d" }
    );

    res.json({
      token,
      user,
      message: "Ви війшли у систему.",
    });
  } catch (error) {
    res.json({
      massage: "Ошибка при авторизації.",
    });
  }
};

//Get me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({
        message: "Такого юзера немає",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,

      { expiresIn: "30d" }
    );

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.json({
      message: "Немає доступу.",
    });
  }
};
