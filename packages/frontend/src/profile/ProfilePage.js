import React, {useContext, useEffect, useState} from 'react'
import { checkSession } from "../auth/authApi";
import { getFeed, submitTweet } from "../feed/feedApi";

import {Paper} from "@material-ui/core";
import Box from "@material-ui/core/Box";

    


export default function ProfilePage() {
    const [user, setUser] = useState({})
    const [tweets, setTweets] = useState([])
    const [numTweets, setNumTweets] = useState(null)
    const [userDate, setUserDate] = useState(null)

    useEffect(() => {
        checkSession().then((user) => {
            setUser(user)
            getTweets(user);
            getDate(user)
        });

        async function getDate(user) {
            const date = new Date (user.joinDate)
            const stringDate = date.toDateString()
            const userDate = stringDate.slice(3, stringDate.length)
            // console.log(userDate.slice(3, userDate.length) ) 
            console.log(">>>>>>>", userDate)
            setUserDate(userDate) 
        }

        async function getTweets(user) {
            const tweets = await getFeed();
            const userTweets = tweets.filter(tweet => {
                return tweet.user._id === user._id
            })
            setTweets(userTweets)
            setNumTweets(userTweets.length)
        }
    }, [])

    return (
        <div>
            <h1> You've reached your Profile Page</h1>
            <img src={user.picture} alt="profile" style={{width: '100px'}}/>
            <p><span>{user.firstName}</span> <span>{user.lastName}</span></p>
            <p>@{user.handle}</p>
            {/* <p>{user.joinDate}</p> */}
            <p>Joined: {userDate}</p>
            <p>{numTweets} posts</p>
            {
            tweets.map((tweet) => (
            <Box key={tweet._id} padding={1}>
                <Paper elevation={1}>
                    <Box padding={1}>@{tweet.user.handle}</Box>
                    <Box padding={1}>{tweet.text}</Box>
                </Paper>
            </Box>
            ))}
        </div>
    )   
}
