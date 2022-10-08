"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteList = exports.updateList = exports.getSingleList = exports.getList = exports.List = void 0;
const uuid_1 = require("uuid");
const list_1 = require("../model/list");
const user_1 = require("../model/user");
const Utils_1 = require("../utils/Utils");
//Create new product -POST
async function List(req, res, next) {
    const id = (0, uuid_1.v4)();
    // let todo = {...req.body, id}
    try {
        const verified = req.user;
        const validationResult = Utils_1.createListSchema.validate(req.body, Utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await list_1.ListInstance.create({
            id,
            ...req.body,
            userId: verified.id,
        });
        res.status(201).json({
            msg: "You have successfully created a todo",
            record,
        });
    }
    catch (err) {
        res.status(500).json({
            err,
            msg: "failed to create",
            route: "/create",
        });
    }
}
exports.List = List;
//fetch
async function getList(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        // const record = await ListeningInstance.findAll({ where: {}, limit, offset });
        const record = await list_1.ListInstance.findAndCountAll({
            limit,
            offset,
            include: [
                {
                    model: user_1.UserInstance,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            message: "failed to read",
            route: "/read",
        });
    }
}
exports.getList = getList;
async function getSingleList(req, res, next) {
    try {
        const { id } = req.params; // same as const id = req.params.id because the former is destructuring it
        const record = await list_1.ListInstance.findOne({ where: { id } });
        return res.status(200).json({
            message: "Suceesfully gotten user information",
            record,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to read single lister",
            route: "/read/:id",
        });
    }
}
exports.getSingleList = getSingleList;
async function updateList(req, res, next) {
    // console.log("test");
    try {
        const { id } = req.params; // same as const id = req.params.id because the former is destructuring it
        const { image, address, price, numOfBeds, numOfBaths, rating } = req.body;
        const validationResult = Utils_1.updateListSchema.validate(req.body, Utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await list_1.ListInstance.findOne({ where: { id } });
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
    }
    catch (error) {
        res.status(500).json({
            message: "failed to update",
            route: "/update/:id",
        });
    }
}
exports.updateList = updateList;
async function deleteList(req, res, next) {
    try {
        const { id } = req.params;
        const record = await list_1.ListInstance.findOne({ where: { id } });
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
    }
    catch (error) {
        res.status(500).json({
            message: "failed to delete",
            route: "/delete:id",
        });
    }
}
exports.deleteList = deleteList;
