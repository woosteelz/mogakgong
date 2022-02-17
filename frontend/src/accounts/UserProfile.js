import { Box, Container, CssBaseline, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Profile } from './profile/Profile';
import { ProfileDetail } from './profile/ProfileDetail';


export default function UserProfile({ userInfo, setUserInfo }) {
    const [user, setUser] = useState(userInfo)

    useEffect(() => {
        setUser(userInfo)
        console.log('useeffect : run!')
    }, [userInfo, user])

    console.log("user:", user)

    return (
        <>
            <CssBaseline />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        sx={{ mb: 3 }}
                        variant="h4"
                    >
                        프로필
                    </Typography>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid item lg={4} md={6} xs={12}>
                            <Profile userInfo={userInfo} setUserInfo={setUserInfo} />
                        </Grid>
                        <Grid item lg={8} md={6} xs={12}>
                            {/* <ProfileDetail userInfo={userInfo} setUserInfo={setUserInfo} /> */}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
};

