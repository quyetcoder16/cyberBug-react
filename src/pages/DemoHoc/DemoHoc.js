import React from 'react'
import { useDispatch } from 'react-redux'
import Login from '../Login/Login';
import Register from '../Register/Register';
import SlideDown from '../../HOC/SlideDown';

export default function DemoHoc() {

    const dispatch = useDispatch();
    const LoginSlideDown = new SlideDown(Login);
    return (
        <div>
            {/* Button trigger modal */}
            <button onClick={() => {
                dispatch({
                    type: 'OPEN_FORM',
                    component: <Login />
                })
            }} type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
                Login
            </button>
            <button onClick={() => {
                dispatch({
                    type: 'OPEN_FORM',
                    component: <Register />
                })
            }} type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">register</button>

            {/* <LoginSlideDown /> */}
            {LoginSlideDown}

        </div>
    )
}
