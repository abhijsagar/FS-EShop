const express = require('express');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const Category = require('../model/category');
const router = express.Router();
const { isSeller } = require('../middleware/auth');

// create cateogry
router.post(
    '/create-category',
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const isCategoryExists = await Category.find({
                name: req.body.name,
            });

            if (isCategoryExists.length !== 0) {
                return next(new ErrorHandler('Category already exists!', 400));
            }

            const category = await Category.create(req.body);

            res.status(201).json({
                success: true,
                category,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// get all cateogry
router.get(
    '/get-cateogry',
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const categorys = await Category.find();
            res.status(201).json({
                success: true,
                categorys,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// delete cateogry
router.delete(
    '/delete-category/:id',
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const category = await Category.findByIdAndDelete(req.params.id);

            if (!category) {
                return next(new ErrorHandler("Category dosen't exists!", 400));
            }
            res.status(201).json({
                success: true,
                message: 'Category deleted successfully!',
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

module.exports = router;
