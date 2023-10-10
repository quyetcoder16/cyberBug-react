import React from 'react'
import { Redirect } from 'react-router-dom';

export default function Profile(props) {
    if (localStorage.getItem('userLogin')) {
        return (<div>
            profile : {localStorage.getItem("userLogin")}
        </div>);
    } else {
        alert("login before want to go profile!")
        return (<Redirect to='/Login' />)
    }
}
