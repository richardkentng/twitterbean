
import React, {useContext, useEffect} from 'react'
import { checkSession } from '../auth/authApi'
import {StateContext} from '../StateProvider'



export default function ProfilePage() {
    const [user, setUser] = useState([]);
   
    useEffect(() => {
        checkSession().then((user) => {

        })
    })



    return (
        <div>
            <h1> You've reached your Profile Page</h1>
        </div>
    )   
}
