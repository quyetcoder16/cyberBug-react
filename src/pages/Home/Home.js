import React from 'react'
import { useSelector } from 'react-redux'

export default function Home(props) {
    // console.log(props);
    const { userLogin } = useSelector(state => state.UserLoginCyberBugReducer);
    console.log(userLogin);
    return (
        <div>
            home
            <p>{userLogin.name}</p>
            <img src={userLogin.avatar} alt={userLogin.avatar} />
        </div>
    )
}
