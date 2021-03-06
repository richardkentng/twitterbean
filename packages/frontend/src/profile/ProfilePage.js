import React, {useContext, useEffect, useState} from 'react'
import { checkSession } from "../auth/authApi";
import { getFeed, submitTweet } from "../feed/feedApi";

import {Paper} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import EditProfile from './EditProfile';

    


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
            // console.log(">>>>>>>", userDate)
            setUserDate(userDate) 
        }

        async function getTweets(user) {
            const tweets = await getFeed();
            const userTweets = tweets.filter(tweet => {
                return tweet.user._id === user._id
            })
            setNumTweets(userTweets.length)
            setTweets(userTweets)
            setNumTweets(userTweets.length)
        }
    }, [])


    function editTweet(content, id) {
        const fetchOptions = { 
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({content})        
        }
        
        fetch(`http://localhost:3000/api/posts/${id}`, fetchOptions).then(res => res.json())
        .then(data=> {
            const tweetsCopy = [...tweets]
            const tweetToBeUpdated = tweetsCopy.find(tweet => {
                return tweet._id === id
            })
            tweetToBeUpdated.text = data.text
            setTweets(tweetsCopy)
        })
    }

    return (
        <div>
            <h1> You've reached your Profile Page</h1>
            <img src={user.picture} alt="profile" style={{width: '100px'}}/>
            <p><span>{user.firstName}</span> <span>{user.lastName}</span></p>
            <p>@{user.handle}</p>
            <p>Joined: {userDate}</p>
            <p>{numTweets} posts</p>

            {
            tweets.map((tweet) => (
            <Box key={tweet._id} padding={1}>
                <Paper elevation={1}>
                    <Box padding={1}>@{tweet.user.handle}</Box>
                    <Box padding={1}>{tweet.text}</Box>
                    <EditProfile {...tweet} editTweet={editTweet}/>
                </Paper>
            </Box>
            ))}
        </div>
    )   
}
