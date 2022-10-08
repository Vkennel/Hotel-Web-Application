import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { UserInstance } from "../model/user";
import bcrypt from "bcryptjs";
import {
  createRegisterSchema,
  generateToken,
  loginSchema,
  options,
} from "../utils/Utils";
import { ListInstance } from "../model/list";

// import passwordHash from "bcryptjs"

//Create new product -POST
export async function RegisterUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validationResult = createRegisterSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const duplicatEmail = await UserInstance.findOne({
      where: { email: req.body.email },
    });
    if (duplicatEmail) {
      return res.status(409).json({
        msg: "Email is used, please change email"
      });
    }

    const duplicatePhone = await UserInstance.findOne({
      where: { phoneNumber: req.body.phoneNumber }
    });

    if (duplicatePhone) {
      return res.status(409).json({
        msg: "Phone number is used"
      });
    }
    const passwordHash = await bcrypt.hash(req.body.password, 8);
    const record = await UserInstance.create({
      id: id,
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: passwordHash
    });


    res.render('login')

    // res.status(201).json({

    //   msg: "You have successfully created a user",
    //   record
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "failed to register",
      route: "/register",
    });
  }
}

export async function LoginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4()
  try {
    const validationResult = loginSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const User = (await UserInstance.findOne({
      where: { email: req.body.email },
    })) as unknown as { [key: string]: string };

    const { id } = User;
    const token = generateToken({ id });
    const validUser = await bcrypt.compare(req.body.password, User.password);

    if (!validUser) {
      res.status(401).json({
        message: "Password do not match",
      });
    }

    if (validUser) {
      res.render('dashboard')
      // res.status(200).json({
      //   message: "Successfully logged in",
      //   token,
      //   User,
      // });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      msg: "failed to login",
      route: "/login",
    });
  }
}

//fetch
export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;

    const record = await UserInstance.findAndCountAll({ where: {}, limit, offset, include:[{model:ListInstance, as: 'list'}] });
    res.status(200).json({
      messsge: "You have successfully fetch all users",
      count: record.count,
      record: record.rows
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to read",
      route: "/read",
    });
  }
}

