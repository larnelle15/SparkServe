import React from 'react'
import UserNavBar from '../../UserNavBar/UserNavBar'
import { Container, Grid } from '@mui/material'
import Footer from '../../Footer/Footer'
import Cards from '../../Cards/Cards'
import {posts} from '../../DumyData/DummyData'

const NRLandingPage = () => {
    return (
        <>
            <UserNavBar/>
            <Container>
                <div style={{ padding: '20px', background: 'lightblue' }}>
                    <p>Hello World</p>
                </div>
                <Grid 
                    container rowSpacing={4} 
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    {posts.map((post) => (
                        <Grid item xs={12} sm={6} md={4} key={post.id}>
                            <Cards 
                                className="Cards"
                                title={post.title}
                                cover={post.cover}
                                author={post.author}
                                view={post.view}
                                comment={post.comment}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Footer/>
        </>
    )
}

export default NRLandingPage