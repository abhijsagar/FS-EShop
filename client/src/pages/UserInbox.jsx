import React, { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import socketIO from 'socket.io-client';
import { server } from '../server';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ENDPOINT = 'https://socket-ecommerce-tu68.onrender.com/';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

const UserInbox = () => {
    const { user, loading } = useSelector((state) => state.user);
    const [conversations, setConversations] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [currentChat, setCurrentChat] = useState();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [userData, setUserData] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [, setImages] = useState();
    const [, setActiveStatus] = useState(false);
    const [open, setOpen] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        socketId.on('getMessage', (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        const getConversation = async () => {
            try {
                const resonse = await axios.get(`${server}/conversation/get-all-conversation-user/${user?._id}`, {
                    withCredentials: true,
                });

                setConversations(resonse.data.conversations);
            } catch (error) {
                // console.log(error);
            }
        };
        getConversation();
    }, [user, messages]);

    useEffect(() => {
        if (user) {
            const sellerId = user?._id;
            socketId.emit('addUser', sellerId);
            socketId.on('getUsers', (data) => {
                setOnlineUsers(data);
            });
        }
    }, [user]);

    const onlineCheck = (chat) => {
        const chatMembers = chat.members.find((member) => member !== user?._id);
        const online = onlineUsers.find((user) => user.userId === chatMembers);

        return online ? true : false;
    };

    // get messages
    useEffect(() => {
        const getMessage = async () => {
            try {
                const response = await axios.get(`${server}/message/get-all-messages/${currentChat?._id}`);
                setMessages(response.data.messages);
            } catch (error) {
                console.log(error);
            }
        };
        getMessage();
    }, [currentChat]);

    // create new message
    const sendMessageHandler = async (e) => {
        e.preventDefault();

        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };
        const receiverId = currentChat.members.find((member) => member !== user?._id);

        socketId.emit('sendMessage', {
            senderId: user?._id,
            receiverId,
            text: newMessage,
        });

        try {
            if (newMessage !== '') {
                await axios
                    .post(`${server}/message/create-new-message`, message)
                    .then((res) => {
                        setMessages([...messages, res.data.message]);
                        updateLastMessage();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateLastMessage = async () => {
        socketId.emit('updateLastMessage', {
            lastMessage: newMessage,
            lastMessageId: user._id,
        });

        await axios
            .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
                lastMessage: newMessage,
                lastMessageId: user._id,
            })
            .then((res) => {
                setNewMessage('');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleImageUpload = async (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImages(reader.result);
                imageSendingHandler(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const imageSendingHandler = async (e) => {
        const receiverId = currentChat.members.find((member) => member !== user._id);

        socketId.emit('sendMessage', {
            senderId: user._id,
            receiverId,
            images: e,
        });

        try {
            await axios
                .post(`${server}/message/create-new-message`, {
                    images: e,
                    sender: user._id,
                    text: newMessage,
                    conversationId: currentChat._id,
                })
                .then((res) => {
                    setImages();
                    setMessages([...messages, res.data.message]);
                    updateLastMessageForImage();
                });
        } catch (error) {
            console.log(error);
        }
    };

    const updateLastMessageForImage = async () => {
        await axios.put(`${server}/conversation/update-last-message/${currentChat._id}`, {
            lastMessage: 'Photo',
            lastMessageId: user._id,
        });
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ beahaviour: 'smooth' });
    }, [messages]);

    return (
        <div className='w-full'>
            {!open && (
                <div className='max-w-container my-8 mx-6'>
                    <h2 className='mb-4 text-4xl text-primeColor font-titleFont font-bold'>All Messages</h2>
                    {/* All messages list */}
                    {conversations &&
                        conversations.map((item, index) => (
                            <MessageList
                                data={item}
                                key={index}
                                index={index}
                                setOpen={setOpen}
                                setCurrentChat={setCurrentChat}
                                me={user?._id}
                                setUserData={setUserData}
                                userData={userData}
                                online={onlineCheck(item)}
                                setActiveStatus={setActiveStatus}
                                loading={loading}
                            />
                        ))}
                </div>
            )}
        </div>
    );
};

const MessageList = ({ data, index, setOpen, setCurrentChat, me, setUserData, userData, online, setActiveStatus, loading }) => {
    const [active, setActive] = useState(0);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/inbox?${id}`);
        setOpen(true);
    };

    useEffect(() => {
        setActiveStatus(online);
        const userId = data.members.find((user) => user !== me);
        const getUser = async () => {
            try {
                const res = await axios.get(`${server}/shop/get-shop-info/${userId}`);
                setUser(res.data.shop);
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [me, data]);

    return (
        <div
            className={`w-full flex p-3 px-3 ${active === index ? 'bg-[#00000010]' : 'bg-transparent'}  cursor-pointer`}
            onClick={(e) => setActive(index) || handleClick(data._id) || setCurrentChat(data) || setUserData(user) || setActiveStatus(online)}>
            <div className='relative'>
                <img src={`${user?.avatar?.url}`} alt='' className='w-[50px] h-[50px] rounded-full' />
                {online ? (
                    <div className='w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]' />
                ) : (
                    <div className='w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]' />
                )}
            </div>
            <div className='pl-3'>
                <h1 className='text-[18px]'>{user?.name}</h1>
                <p className='text-[16px] text-[#000c]'>
                    {!loading && data?.lastMessageId !== userData?._id ? 'You:' : userData?.name.split(' ')[0] + ': '} {data?.lastMessage}
                </p>
            </div>
        </div>
    );
};

export default UserInbox;
