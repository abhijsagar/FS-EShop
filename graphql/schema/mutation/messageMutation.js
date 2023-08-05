const { GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql');
const MessageType = require('../schema/messageSchema');
const ImageType = require('../schema/commonSchema');
const Messages = require('../../model/messages');

const messageMutation = () => {
    return {
        createNewConversation: {
            type: MessageType,
            args: {
                conversationId: { type: new GraphQLNonNull(GraphQLString) },
                text: { type: new GraphQLNonNull(GraphQLString) },
                sender: { type: new GraphQLNonNull(GraphQLString) },
                images: { type: ImageType },
            },
            async resolve(parent, args) {
                if (args.images) {
                    const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
                        folder: 'messages',
                    });
                    const images = {
                        public_id: myCloud.public_id,
                        url: myCloud.url,
                    };
                }
                const message = new Messages({
                    conversationId: args.conversationId,
                    text: args.text,
                    sender: args.sender,
                    images: images,
                });

                await message.save();
            },
        },
    };
};

module.exports = messageMutation;
