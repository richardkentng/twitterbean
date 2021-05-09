
import React, {useContext, useEffect, useState} from 'react'
import {StateContext} from '../StateProvider'
import { checkSession } from "../auth/authApi";
import { getFeed, submitTweet } from "../feed/feedApi";
import {
    
    Paper,
  } from "@material-ui/core";
  
  import Box from "@material-ui/core/Box";

export default function ProfilePage() {
    // const [user, setUser] = useState([]);
   
    // useEffect(() => {
    //     checkSession().then((user) => {

    //     })
    // })


    const [user, setUser] = useState({})
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        checkSession().then((user) => {
            console.log(user);
            setUser(user)
            getTweets(user);
        });

        async function getTweets() {
            const tweets = await getFeed();

            const userTweets = tweets.filter(tweet => {
                return tweet.user._id === user._id
            })
            setTweets(tweets);
        }


    }, [])
    return (
        <div>
            <h1> You've reached your Profile Page</h1>
            <img src={user.picture} alt="profile" style={{width: '100px'}}/>
            <p><span>{user.firstName}</span> <span>{user.lastName}</span></p>
            <p>@{user.handle}</p>
            <p>{user.joinDate}</p>
            <p>{user.posts}</p>
           
            {tweets.map((tweet) => (
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
