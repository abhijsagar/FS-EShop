const { GraphQLList, GraphQLID } = require('graphql');
const OrderType = require('../schema/orderSchema');
const Order = require('../../model/order');

const orderQuery = () => {
    return {
        // getAllOrders: {
        //     type: new GraphQLList(OrderType),
        //     args: { user: { id: GraphQLID } },
        //     resolve(parent, args) {
        //         return Order.find().sort({ createdAt: -1 });
        //     },
        // },
    };
};

module.exports = orderQuery;
