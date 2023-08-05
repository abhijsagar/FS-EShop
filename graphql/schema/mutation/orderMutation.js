const { GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql');
const AddressType = require('../schema/commonSchema');
const PaymentInfoType = require('../schema/commonSchema');
const OrderType = require('../schema/orderSchema');
const UserType = require('../schema/userSchema');
const ShopType = require('../schema/shopSchema');

const orderMutation = () => {
    return {
        createOrder: {
            type: OrderType,
            args: {
                cart: { type: ShopType },
                shippingAddress: { type: AddressType },
                user: { type: UserType },
                totalPrice: { type: new GraphQLNonNull(GraphQLString) },
                paymentInfo: { type: PaymentInfoType },
            },
            async resolve(parent, args) {
                const shopItemsMap = new Map();

                for (const item of args.cart) {
                    const shopId = item.shopId;
                    if (!shopItemsMap.has(shopId)) {
                        shopItemsMap.set(shopId, []);
                    }
                    shopItemsMap.get(shopId).push(item);
                }

                const orders = [];
                for (const [shopId, items] of shopItemsMap) {
                    const order = await Order.create({
                        cart: items,
                        shippingAddress: args.shippingAddress,
                        user: args.user,
                        totalPrice: args.totalPrice,
                        paymentInfo: args.paymentInfo,
                    });
                    orders.push(order);
                }

                return orders;
            },
        },
        updateOrder: {
            type: OrderType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                status: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                const order = await Order.findById(args.id);
                if (!order) {
                    return next(new ErrorHandler('Order not found with this id', 400));
                }

                order.status = args.status;
                await order.save({ validateBeforeSave: false });
            },
        },
    };
};

module.exports = orderMutation;
