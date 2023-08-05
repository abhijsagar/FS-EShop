const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList } = require('graphql');

const ImageType = new GraphQLObjectType({
    name: 'Image',
    fields: () => ({
        id: { type: GraphQLID },
        public_id: { type: GraphQLString },
        url: { type: GraphQLString },
    }),
});

const AddressType = new GraphQLObjectType({
    name: 'Address',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    }),
});

const WithdrawType = new GraphQLObjectType({
    name: 'Withdraw',
    fields: () => ({
        id: { type: GraphQLID },
        public_id: { type: GraphQLString },
        url: { type: GraphQLString },
    }),
});

const TransectionType = new GraphQLObjectType({
    name: 'Transection',
    fields: () => ({
        id: { type: GraphQLID },
        amount: { type: GraphQLFloat },
        status: { type: GraphQLFloat },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});

const ReviewType = new GraphQLObjectType({
    name: 'Review',
    fields: () => ({
        id: { type: GraphQLID },
        user: { type: GraphQLString },
        rating: { type: GraphQLFloat },
        comment: { type: GraphQLString },
        productId: { type: GraphQLString },
        createdAt: { type: GraphQLString },
    }),
});

const CartType = new GraphQLObjectType({
    name: 'Cart',
    fields: () => ({
        id: { type: GraphQLID },
    }),
});

const PaymentInfoType = new GraphQLObjectType({
    name: 'Payment',
    fields: () => ({
        id: { type: GraphQLID },
    }),
});

module.exports = ImageType;
module.exports = AddressType;
module.exports = WithdrawType;
module.exports = TransectionType;
module.exports = ReviewType;
module.exports = CartType;
module.exports = PaymentInfoType;
