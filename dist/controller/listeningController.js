"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteListener = exports.updateListener = exports.getSingleListener = exports.getListener = exports.Listener = void 0;
const uuid_1 = require("uuid");
const listing_1 = require("../model/listing");
const listingUtils_1 = require("../utils/listingUtils");
//Create new product -POST
async function Listener(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = listingUtils_1.createListenerSchema.validate(req.body, listingUtils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        // console.log(req.body);
        const record = await listing_1.ListeningInstance.create({ ...req.body, id });
        console.log(record);
        res.status(201).json({
            message: "You have succesfully created a list request",
            record, // a shoreter way of writing record:record
        }); //note that json was used instead of send. its more proper for json docs.
    }
    catch (err) {
        res.status(500).json({
            message: err,
            route: "/create",
        });
    }
}
exports.Listener = Listener;
//fetch
async function getListener(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        // const record = await ListeningInstance.findAll({ where: {}, limit, offset });
        const record = await listing_1.ListeningInstance.findAndCountAll({ limit, offset });
        //   where: {},
        //   limit,
        //   offset,
        // });
        res.status(200).json({
            messsge: "You have successfully fetch all products",
            count: record.count,
            record: record.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to read",
            route: "/read",
        });
    }
}
exports.getListener = getListener;
async function getSingleListener(req, res, next) {
    try {
        const { id } = req.params; // same as const id = req.params.id because the former is destructuring it
        const record = await listing_1.ListeningInstance.findOne({ where: { id } });
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
exports.getSingleListener = getSingleListener;
async function updateListener(req, res, next) {
    console.log("test");
    try {
        const { id } = req.params; // same as const id = req.params.id because the former is destructuring it
        const { image, address, price, numOfBeds, numOfBaths, rating } = req.body;
        const validationResult = listingUtils_1.updateListenerSchema.validate(req.body, listingUtils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await listing_1.ListeningInstance.findOne({ where: { id } });
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
exports.updateListener = updateListener;
async function deleteListener(req, res, next) {
    try {
        const { id } = req.params;
        const record = await listing_1.ListeningInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                message: "Cannot find listener",
            });
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            message: "Commerce deleted succesfully",
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
exports.deleteListener = deleteListener;
