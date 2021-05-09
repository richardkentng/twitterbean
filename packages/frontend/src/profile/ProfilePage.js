
import React, {useContext, useEffect, useState} from 'react'
import {StateContext} from '../StateProvider'
import { checkSession } from "../auth/authApi";



export default function ProfilePage() {
    // const [user, setUser] = useState([]);
   
    // useEffect(() => {
    //     checkSession().then((user) => {

    //     })
    // })


    const [user, setUser] = useState({})

    useEffect(() => {
        checkSession().then((user) => {
            console.log(user);
            setUser(user)
            // if (user && user._id) {
            //   // this sets the session
            //   dispatch({
            //     type: "setUser",
            //     payload: user,
            //   });
            // }
          });


    }, [])
    return (
        <div>
            <h1> You've reached your Profile Page</h1>
            <img src={user.picture} alt="profile" style={{width: '100px'}}/>
            <p><span>{user.firstName}</span> <span>{user.lastName}</span></p>
            <p>{user.joinDate}</p>
        </div>
    )   
}
