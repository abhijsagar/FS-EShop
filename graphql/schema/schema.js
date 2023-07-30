const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const clientQuery = require('./clientSchema/clientQuery');
const clientMutation = require('./clientSchema/clientMutation');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: clientQuery(),
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: clientMutation(),
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
