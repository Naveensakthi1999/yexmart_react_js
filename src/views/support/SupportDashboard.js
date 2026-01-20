import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Divider,
    Chip,
    Button,
    Card,
    CardContent,
    Stack
} from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import SupportChatWindow from '../helpsupport/SupportChatWindow';
import axios from '../../utils/req';

const SupportDashboard = () => {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [loading, setLoading] = useState(true);

    const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Support Dashboard' }];

    const fetchChats = async () => {
        try {
            const res = await axios.get('/support/chat/list');
            setChats(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchChats();
        const interval = setInterval(fetchChats, 10000); // Refresh every 10s
        return () => clearInterval(interval);
    }, []);

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
    };

    const handleResolve = async (id) => {
        try {
            await axios.put(`/support/chat/${id}/resolve`);
            fetchChats();
            if (selectedChat?.chat_id === id) setSelectedChat(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <PageContainer title="Support Dashboard" description="Manage active support chats">
            <Breadcrumb title="Support Dashboard" items={BCrumb} />

            <Grid container spacing={3} sx={{ height: 'calc(100vh - 200px)' }}>
                {/* Left: Chats List */}
                <Grid item xs={12} md={3} sx={{ height: '100%' }}>
                    <Paper sx={{ height: '100%', overflowY: 'auto' }}>
                        <Box p={2}>
                            <Typography variant="h6">Active Chats</Typography>
                        </Box>
                        <Divider />
                        <List>
                            {chats.map((chat) => (
                                <ListItem
                                    button
                                    key={chat.chat_id}
                                    onClick={() => handleSelectChat(chat)}
                                    selected={selectedChat?.chat_id === chat.chat_id}
                                    sx={{ borderLeft: chat.priority === 'High' ? '4px solid red' : 'none' }}
                                >
                                    <ListItemAvatar>
                                        <Avatar>{chat.user_name[0]}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={chat.user_name}
                                        secondary={
                                            <React.Fragment>
                                                <Typography component="span" variant="caption" color="textPrimary">
                                                    {chat.help_category}
                                                </Typography>
                                                <br />
                                                <Chip
                                                    label={chat.status}
                                                    size="small"
                                                    color={chat.status === 'pending' ? 'warning' : 'success'}
                                                    sx={{ fontSize: '10px', height: '18px' }}
                                                />
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            ))}
                            {chats.length === 0 && <Box p={3} textAlign="center"><Typography color="textSecondary">No active chats</Typography></Box>}
                        </List>
                    </Paper>
                </Grid>

                {/* Middle: Chat Window */}
                <Grid item xs={12} md={6} sx={{ height: '100%' }}>
                    {selectedChat ? (
                        <SupportChatWindow
                            chatId={selectedChat.chat_id}
                            chatInfo={selectedChat}
                            onEndChat={() => setSelectedChat(null)}
                            senderType="agent"
                        />
                    ) : (
                        <Paper sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography color="textSecondary">Select a chat to start responding</Typography>
                        </Paper>
                    )}
                </Grid>

                {/* Right: User Details & Context */}
                <Grid item xs={12} md={3} sx={{ height: '100%' }}>
                    {selectedChat ? (
                        <Stack spacing={2} sx={{ height: '100%' }}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>User Details</Typography>
                                    <Typography variant="body2"><strong>Email:</strong> {selectedChat.user_email}</Typography>
                                    <Typography variant="body2"><strong>Issue:</strong> {selectedChat.issue_description}</Typography>
                                    <Typography variant="body2"><strong>Priority:</strong> {selectedChat.priority}</Typography>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Session Context</Typography>
                                    <Typography variant="body2"><strong>URL:</strong> {selectedChat.help_page_url}</Typography>
                                    <Typography variant="body2"><strong>Started:</strong> {new Date(selectedChat.created_at).toLocaleString()}</Typography>
                                </CardContent>
                            </Card>
                            <Box flexGrow={1} />
                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                onClick={() => handleResolve(selectedChat.chat_id)}
                            >
                                Mark as Resolved
                            </Button>
                        </Stack>
                    ) : (
                        <Paper sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography color="textSecondary">Chat details will appear here</Typography>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default SupportDashboard;
