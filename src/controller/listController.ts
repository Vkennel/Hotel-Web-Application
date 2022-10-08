import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { ListInstance } from "../model/list";
import { UserInstance } from "../model/user";
import { createListSchema, options, updateListSchema } from "../utils/Utils";

//Create new product -POST
export async function List(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  // let todo = {...req.body, id}
  try {
    const verified = req.user;
    const validationResult = createListSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const record = await ListInstance.create({
      id,
      ...req.body,
      userId: verified.id,
    });
    res.status(201).json({
      msg: "You have successfully created a todo",
      record,
    });
  } catch (err) {
    res.status(500).json({
      err,
      msg: "failed to create",
      route: "/create",
    });
  }
}

//fetch
export async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;

    // const record = await ListeningInstance.findAll({ where: {}, limit, offset });
    const record = await ListInstance.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: UserInstance,
          attributes: ["id", "fullName", "email", "phoneNumber"],
          as: "user",
        },
      ],
    }); //list is the name of my list file in database
    //   where: {},
    //   limit,
    //   offset,
    // });

    res.status(200);
    res.json({
      messsge: "You have successfully fetch all list",
      count: record.count,
      record: record.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "failed to read",
      route: "/read",
    });
  }
}

export async function getSingleList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params; // same as const id = req.params.id because the former is destructuring it
    const record = await ListInstance.findOne({ where: { id } });
    return res.status(200).json({
      message: "Suceesfully gotten user information",
      record,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to read single lister",
      route: "/read/:id",
    });
  }
}

export async function updateList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // console.log("test");

  try {
    const { id } = req.params; // same as const id = req.params.id because the former is destructuring it

    const { image, address, price, numOfBeds, numOfBaths, rating } = req.body;
    const validationResult = updateListSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }

    const record = await ListInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(400).json({
        Error: "Cannot find existing listener",
      });
    }
    const updatedrecord = await record.update({
      image,
      address,
      price,
      numOfBeds,
      numOfBaths,
      rating,
    }); //Outline all the keys you want the users to update. You can give them all the keys and let
    //them choose what the want to update
    res.status(200).json({
      message: "You have succesfully updated user",
      updatedrecord,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to update",
      route: "/update/:id",
    });
  }
}

export async function deleteList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await ListInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        message: "Cannot find listener",
      });
    }
    const deletedRecord = await record.destroy();
    return res.status(200).json({
      message: "list deleted succesfully",
      deletedRecord,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to delete",
      route: "/delete:id",
    });
  }
}
