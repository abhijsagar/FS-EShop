const { GraphQLList, GraphQLID } = require('graphql');
const EventType = require('../schema/eventSchema');
const Event = require('../../model/event');

const eventQuery = () => {
    return {
        getAllEvents: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                return Event.find();
            },
        },
    };
};

module.exports = eventQuery;
