"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.getProducts = exports.Product = void 0;
const uuid_1 = require("uuid");
const product_1 = require("../model/product");
const utils_1 = require("../utils/utils");
//Create new product -POST
async function Product(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.createProductSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const record = await product_1.ProductInstance.create({ ...req.body, id });
        res.status(201).json({
            message: "You have succesfully created a product request",
            record // a shoreter way of writing record:record
        }); //note that json was used instead of send. its more proper for json docs. 
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to create',
            route: '/create'
        });
    }
}
exports.Product = Product;
;
//fetch
async function getProducts(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        const record = await product_1.ProductInstance.findAll({ where: {}, limit, offset });
        res.status(200).json({
            messsge: "You have successfully fetch all products",
            record
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to read",
            route: "/read"
        });
    }
}
exports.getProducts = getProducts;
async function getSingleProduct(req, res, next) {
    try {
        const { id } = req.params; // same as const id = req.params.id because the former is destructuring it 
        const record = await product_1.ProductInstance.findOne({ where: { id } });
        return res.status(200).json({
            message: "Suceesfully gotten user information",
            record
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to read single product",
            route: "/read/:id"
        });
    }
}
exports.getSingleProduct = getSingleProduct;
async function updateProduct(req, res, next) {
    try {
        const { id } = req.params; // same as const id = req.params.id because the former is destructuring it 
        const { name, image, brand, category, description, price, countInStock, rating, numReviews } = req.body;
        const validationResult = utils_1.updateProductSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const record = await product_1.ProductInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(400).json({
                Error: "Cannot find existing product",
            });
        }
        const updatedrecord = await record.update({
            name,
            image,
            brand,
            category,
            description,
            price,
            countInStock,
            rating,
            numReviews,
        }); //Outline all the keys you want the users to update. You can give them all the keys and let 
        //them choose what the want to update
        res.status(200).json({
            message: "You have succesfully updated your product",
            updatedrecord
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to update",
            route: "/update/:id"
        });
    }
}
exports.updateProduct = updateProduct;
async function deleteProduct(req, res, next) {
    try {
        const { id } = req.params;
        const record = await product_1.ProductInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                message: "Cannot find product"
            });
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            message: "Commerce deleted succesfully",
            deletedRecord
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to delete",
            route: '/delete:id'
        });
    }
}
exports.deleteProduct = deleteProduct;
