const express = require('express');
const { isSeller, isAuthenticated, isAdmin } = require('../middleware/auth');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const router = express.Router();
const Product = require('../model/product');
const Order = require('../model/order');
const Shop = require('../model/shop');
const cloudinary = require('cloudinary');
const ErrorHandler = require('../utils/ErrorHandler');

// get all products
router.get(
    '/get-all-products',
    catchAsyncErrors(async (req, res, next) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });

            res.status(201).json({
                success: true,
                products,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// review for a product
router.put(
    '/create-new-review',
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { user, rating, comment, productId, orderId } = req.body;

            const product = await Product.findById(productId);

            const review = {
                user,
                rating,
                comment,
                productId,
            };

            const isReviewed = product.reviews.find((rev) => rev.user._id === req.user._id);

            if (isReviewed) {
                product.reviews.forEach((rev) => {
                    if (rev.user._id === req.user._id) {
                        (rev.rating = rating), (rev.comment = comment), (rev.user = user);
                    }
                });
            } else {
                product.reviews.push(review);
            }

            let avg = 0;

            product.reviews.forEach((rev) => {
                avg += rev.rating;
            });

            product.ratings = avg / product.reviews.length;

            await product.save({ validateBeforeSave: false });

            await Order.findByIdAndUpdate(orderId, { $set: { 'cart.$[elem].isReviewed': true } }, { arrayFilters: [{ 'elem._id': productId }], new: true });

            res.status(200).json({
                success: true,
                message: 'Reviwed succesfully!',
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

module.exports = router;
