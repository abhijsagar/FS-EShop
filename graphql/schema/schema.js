const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const conversationQuery = require('./query/conversationQuery');
const coupounCodeQuery = require('./query/coupounCodeQuery');
const eventQuery = require('./query/eventQuery');
const messageQuery = require('./query/messageQuery');
const orderQuery = require('./query/orderQuery');
const productQuery = require('./query/productQuery');
const shopQuery = require('./query/shopQuery');
const userQuery = require('./query/userQuery');
const withdrawQuery = require('./query/withdrawQuery');

const conversationMutation = require('./mutation/conversationMutation');
const coupounCodeMutation = require('./mutation/coupounCodeMutation');
const eventMutation = require('./mutation/eventMutation');
const messageMutation = require('./mutation/messageMutation');
const orderMutation = require('./mutation/orderMutation');
const productMutation = require('./mutation/productMutation');
const shopMutation = require('./mutation/shopMutation');
const userMutation = require('./mutation/userMutation');
const withdrawMutation = require('./mutation/withdrawMutation');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...conversationQuery(),
        ...coupounCodeQuery(),
        ...eventQuery(),
        ...messageQuery(),
        ...orderQuery(),
        ...productQuery(),
        ...shopQuery(),
        ...userQuery(),
        ...withdrawQuery(),
    },
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...conversationMutation(),
        ...coupounCodeMutation(),
        ...eventMutation(),
        ...messageMutation(),
        ...orderMutation(),
        ...productMutation(),
        ...shopMutation(),
        ...userMutation(),
        ...withdrawMutation(),
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
