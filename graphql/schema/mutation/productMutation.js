const { GraphQLID, GraphQLString, GraphQLNonNull, GraphQLFloat, GraphQLInt, GraphQLInputObjectType, GraphQLObjectType, GraphQLList } = require('graphql');
const ProductType = require('../schema/productSchema');
const ImageType = require('../schema/commonSchema');
const ShopType = require('../schema/shopSchema');
const UserType = require('../schema/userSchema');

const productMutation = () => {
    return {
        createProduct: {
            type: ProductType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                category: { type: new GraphQLNonNull(GraphQLString) },
                tags: { type: new GraphQLNonNull(GraphQLString) },
                originalPrice: { type: new GraphQLNonNull(GraphQLFloat) },
                discountPrice: { type: new GraphQLNonNull(GraphQLFloat) },
                stock: { type: new GraphQLNonNull(GraphQLInt) },
                shopId: { type: new GraphQLNonNull(GraphQLID) },
                // shop: { type: new GraphQLInputObjectType(ShopType) },
                // images: { type: new GraphQLList(ImageType) },
            },
            async resolve(parent, args) {
                const shop = await Shop.findById(args.shopId);
                if (!shop) {
                    return next(new ErrorHandler('Shop Id is invalid!', 400));
                } else {
                    let images = [];
                    if (typeof args.images === 'string') {
                        images.push(args.images);
                    } else {
                        images = args.images;
                    }
                    const imagesLinks = [];
                    for (let i = 0; i < images.length; i++) {
                        const result = await cloudinary.v2.uploader.upload(images[i], {
                            folder: 'products',
                        });
                        imagesLinks.push({
                            public_id: result.public_id,
                            url: result.secure_url,
                        });
                    }
                    const product = new Product({
                        name: args.name,
                        description: args.description,
                        category: args.category,
                        tags: args.tags,
                        originalPrice: args.originalPrice,
                        discountPrice: args.discountPrice,
                        stock: args.stock,
                        shopId: args.shopId,
                        shop: shop,
                        images: imagesLinks,
                    });
                    return product.save();
                }
            },
        },

        deleteProduct: {
            type: ProductType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(parent, args) {
                const product = await Product.findById(args.id);
                if (!product) {
                    return next(new ErrorHandler('Product is not found with this id', 404));
                }
                for (let i = 0; 1 < product.images.length; i++) {
                    const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id);
                }
                return product.remove();
            },
        },

        updateProduct: {
            type: ProductType,
            args: {
                productId: { type: new GraphQLNonNull(GraphQLID) },
                orderId: { type: new GraphQLNonNull(GraphQLID) },
                rating: { type: new GraphQLNonNull(GraphQLString) },
                comment: { type: new GraphQLNonNull(GraphQLString) },
                // user: { type: UserType },
            },
            async resolve(parent, args) {
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
                return await Order.findByIdAndUpdate(
                    orderId,
                    { $set: { 'cart.$[elem].isReviewed': true } },
                    { arrayFilters: [{ 'elem._id': productId }], new: true }
                );
            },
        },
    };
};

module.exports = productMutation;
