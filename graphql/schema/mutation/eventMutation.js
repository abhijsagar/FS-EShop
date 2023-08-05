const { GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql');
const EventType = require('../schema/eventSchema');
const Event = require('../../model/event');

const eventMutation = () => {
    return {
        deleteEvent: {
            type: EventType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(parent, args) {
                const event = await Event.findById(args.id);

                if (!event) {
                    return next(new ErrorHandler('Product is not found with this id', 404));
                }

                for (let i = 0; 1 < event.images.length; i++) {
                    await cloudinary.v2.uploader.destroy(event.images[i].public_id);
                }

                await event.remove();
            },
        },
    };
};

module.exports = eventMutation;
