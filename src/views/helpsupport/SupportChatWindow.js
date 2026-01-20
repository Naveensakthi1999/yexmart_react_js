import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    IconButton,
    Avatar,
    Divider,
    Button,
    Stack,
    CircularProgress
} from '@mui/material';
import { IconSend, IconX, IconPaperclip } from '@tabler/icons';
import axios from '../../utils/req';

const SupportChatWindow = ({ chatId, chatInfo, onEndChat, senderType = 'user' }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`/support/chat/messages/${chatId}`);
            setMessages(res.data.data);
            setLoading(false);
            scrollToBottom();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 5000); // Polling for messages
        return () => clearInterval(interval);
    }, [chatId]);

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            await axios.post('/support/chat/message', {
                chat_id: chatId,
                message_content: newMessage,
                sender_type: senderType
            });
            setNewMessage('');
            fetchMessages();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <Box display="flex" justifyContent="center" p={5}><CircularProgress /></Box>;

    return (
        <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <Box p={2} sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h6">Support Chat - #{chatId.slice(0, 8)}</Typography>
                    <Typography variant="caption">{chatInfo?.help_category}</Typography>
                </Box>
                <IconButton size="small" onClick={onEndChat} sx={{ color: 'inherit' }}>
                    <IconX size={20} />
                </IconButton>
            </Box>

            {/* User Info Card */}
            <Box p={2} sx={{ bgcolor: 'grey.100' }}>
                <Typography variant="subtitle2">{chatInfo?.user_name}</Typography>
                <Typography variant="caption" color="textSecondary">{chatInfo?.user_email}</Typography>
            </Box>

            <Divider />

            {/* Message Area */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                {messages.map((msg, index) => (
                    <Box key={index} sx={{ alignSelf: msg.sender_type === senderType ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                        <Paper sx={{ p: 1.5, bgcolor: msg.sender_type === senderType ? 'primary.light' : 'grey.200', borderRadius: 2 }}>
                            <Typography variant="body2">{msg.message_content}</Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 0.5, textAlign: 'right' }}>
                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                        </Paper>
                    </Box>
                ))}
                <div ref={messagesEndRef} />
            </Box>

            {/* Input Area */}
            <Box p={2} component="form" onSubmit={handleSend}>
                <Stack direction="row" spacing={1}>
                    <IconButton size="small">
                        <IconPaperclip size={20} />
                    </IconButton>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <IconButton type="submit" color="primary" disabled={!newMessage.trim()}>
                        <IconSend size={20} />
                    </IconButton>
                </Stack>
                <Box mt={1} display="flex" justifyContent="center">
                    <Button size="small" color="error" onClick={onEndChat}>End Chat</Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default SupportChatWindow;
