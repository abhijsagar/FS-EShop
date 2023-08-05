const { GraphQLList, GraphQLID, GraphQLString } = require('graphql');
const CoupounCodeType = require('../schema/coupounCodeSchema');
const CoupounCode = require('../../model/coupounCode');

const coupounCodeQuery = () => {
    return {
        getCoupoun: {
            type: new GraphQLList(CoupounCodeType),
            args: { shopId: { type: GraphQLID } },
            resolve(parent, args) {
                return CoupounCode.find(args);
            },
        },
        getCoupounValue: {
            type: CoupounCodeType,
            args: { name: { type: GraphQLString } },
            resolve(parent, args) {
                return CoupounCode.findOne(args).sort({ createdAt: -1 });
            },
        },
    };
};

module.exports = coupounCodeQuery;
