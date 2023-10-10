import React, { useState } from 'react'
import { Prompt } from 'react-router-dom';

export default function Login(props) {

    const [userLogin, setUserLogin] = useState({ userName: '', passWord: '', status: true });

    const handleLogin = (e) => {
        e.preventDefault();
        if (userLogin.userName === 'admin' && userLogin.passWord === 'admin') {
            props.history.goBack();
            localStorage.setItem("userLogin", JSON.stringify(userLogin));

        } else {
            alert('login fail!')
        }
    }

    const handelChange = (e) => {
        const { name, value } = e.target;

        const newUserLogin = {
            ...userLogin,
            [name]: value
        }

        let vaid = true;
        for (let key in newUserLogin) {
            if (key !== 'status') {
                if (newUserLogin[key].trim() !== '') {
                    vaid = false;
                }
            }
        }

        if (vaid === true) {
            newUserLogin.status = false;
        } else {
            newUserLogin.status = true;
        }

        console.log(newUserLogin);

        setUserLogin(newUserLogin);
    }

    return (
        <div>
            <form className='container' onSubmit={handleLogin}>
                <h4 className='display-4'>Login</h4>
                <div className='form-group'>
                    <p>User Name</p>
                    <input name='userName' className='form-control' onChange={handelChange} ></input>
                </div>

                <div className='form-group'>
                    <p>Password</p>
                    <input name='passWord' className='form-control' onChange={handelChange} ></input>
                </div>
                <div className='form-group'>
                    <button className='btn btn-success'>Đăng nhập</button>
                </div>
                <Prompt when={userLogin.status} message={(location) => {
                    console.log(location);
                    return 'bạn có chắc chắn muốn rời khỏi trang này không ?';
                }} />
            </form>
        </div>
    )
}
