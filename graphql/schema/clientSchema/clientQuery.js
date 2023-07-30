const { GraphQLID, GraphQLList } = require('graphql');
const ClientType = require('./clientSchema');

const clientQuery = () => {
    return {
        getClients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find();
            },
        },
        getClientById: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Client.findById(args.id);
            },
        },
    };
};

module.exports = clientQuery;
