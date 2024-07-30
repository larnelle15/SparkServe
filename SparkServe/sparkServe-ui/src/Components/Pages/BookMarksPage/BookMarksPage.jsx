import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress, Box, Card, CardMedia, CardContent } from '@mui/material';
import UserNavBar from '../../UserNavBar/UserNavBar';
import Footer from '../../Footer/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

// const baseUrl = "http://localhost:3000";
// const baseUrl = "https://project-1-uljs.onrender.com";
const baseUrl =import.meta.env.VITE_BACKEND_URL;


const BookmarksPage = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            fetchBookmarks();
        } else {
            setError('User ID not found. Please log in.');
            setIsLoading(false);
        }
    }, [userId]);

    const fetchBookmarks = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const bookmarksResponse = await axios.get(`${baseUrl}/bookmarks/users/${userId}/bookmarks`);
            const bookmarkIds = bookmarksResponse.data.map(bookmark => bookmark.opportunityId);
            
            // Fetch full details for each bookmarked opportunity
            const opportunitiesPromises = bookmarkIds.map(id => 
                axios.get(`${baseUrl}/opps/${id}`)
            );
            const opportunitiesResponses = await Promise.all(opportunitiesPromises);
            const bookmarkedOpportunities = opportunitiesResponses.map(response => response.data);
            
            setBookmarks(bookmarkedOpportunities);
        } catch (err) {
            console.error('Error fetching bookmarks:', err);
            setError('Failed to fetch bookmarks. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <UserNavBar />
            <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
                <Typography variant="h4" gutterBottom>Your Favorites</Typography>
                {error && <Typography color="error">{error}</Typography>}
                {bookmarks.length === 0 ? (
                    <Typography>You haven't favorited any opportunities yet.</Typography>
                ) : (
                    <Grid container spacing={3}>
                        {bookmarks.map((opportunity) => (
                            <Grid item xs={12} sm={6} md={4} key={opportunity.opportunityId}>
                                <Card 
                                    component={Link} 
                                    to={`/opportunity/${opportunity.opportunityId}`} 
                                    sx={{ 
                                        textDecoration: 'none', 
                                        height: '100%', 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'scale(1.03)',
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={opportunity.pictureUrl || "https://via.placeholder.com/300x200"}
                                        alt={opportunity.title}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {opportunity.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {opportunity.organization?.name}
                                        </Typography>
                                        <Typography variant="body2">
                                            {opportunity.relatedCause}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
            <Footer />
        </>
    );
};

export default BookmarksPage;