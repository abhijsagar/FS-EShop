const { GraphQLList, GraphQLID } = require('graphql');
const UserType = require('../schema/userSchema');
const User = require('../../model/user');

const userQuery = () => {
    return {
        getUsers: {
            type: new GraphQLList(UserType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.find();
            },
        },
    };
};

module.exports = userQuery;
