const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList } = require('graphql');
const PaymentInfoType = require('./commonSchema');
const AddressType = require('./commonSchema');
const CartType = require('./commonSchema');
const UserType = require('./userSchema');

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        id: { type: GraphQLID },
        cart: { type: new GraphQLList(CartType) },
        shippingAddress: { type: AddressType },
        user: { type: UserType },
        totalPrice: { type: GraphQLFloat },
        status: { type: GraphQLString },
        sender: { type: GraphQLString },
        paymentInfo: { type: PaymentInfoType },
        paidAt: { type: GraphQLString },
        deliveredAt: { type: GraphQLString },
        createdAt: { type: GraphQLString },
    }),
});

module.exports = OrderType;
