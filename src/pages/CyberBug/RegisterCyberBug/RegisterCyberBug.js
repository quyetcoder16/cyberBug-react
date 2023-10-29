import { Button, Input } from 'antd'
import React from 'react'
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { useState } from 'react';
import { USER_SIGN_UP_SAGA } from '../../../redux/types/cyberBugConstant/UserConstant';

function RegisterCyberBug(props) {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;


    return (
        <form onSubmit={handleSubmit} className="container" style={{ height: window.innerHeight }} >
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: window.innerHeight }} >
                <h3 className="text-center" style={{ fontWeight: 400, fontSize: 35 }}>Sign Up</h3>

                <div className="d-flex mt-3" >
                    <Input style={{ width: '100%', minWidth: 450 }} name="email" size="large" placeholder="Email" prefix={<MailOutlined />} onChange={handleChange} />
                </div>
                <div className='text-danger'>{errors.email}</div>
                <div className="d-flex mt-3">
                    <Input onChange={handleChange} style={{ width: '100%', minWidth: 450 }} type="password" name="passWord" size="large" placeholder="Password" prefix={<LockOutlined />} />
                </div>
                <div className='text-danger'>{errors.passWord}</div>
                <div className="d-flex mt-3">
                    <Input onChange={handleChange} style={{ width: '100%', minWidth: 450 }} type="text" name="phoneNumber" size="large" placeholder="Phone Number" prefix={<PhoneOutlined />} />
                </div>
                <div className='text-danger'>{errors.phoneNumber}</div>

                <div className="d-flex mt-3">
                    <Input onChange={handleChange} style={{ width: '100%', minWidth: 450 }} type="text" name="name" size="large" placeholder="Name" prefix={<UserOutlined />} />
                </div>
                <div className='text-danger'>{errors.name}</div>

                <div className='row'>
                    <Button onClick={() => {
                        props.history.push('/login');
                    }} size="large" style={{ minWidth: 150, border: "1px solid rgb(102,117,223)", color: 'rgb(102,117,223)' }} className="mt-4 btn btn-light">Sign In</Button>
                    <Button htmlType='submit' size="large" style={{ minWidth: 150, backgroundColor: 'rgb(102,117,223)', color: '#fff' }} className="mt-4 ml-5">Register</Button>
                </div>
            </div>

        </form>
    )
}

const RegisterCyberBugFormmik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        passWord: '',
        name: '',
        phoneNumber: '',
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().email('invalid Email').required('Required'),
        passWord: Yup.string().min(6, 'password must have min 6 character!').max(32, 'password must have max 32 character'),
        phoneNumber: Yup.number()
            .typeError("That doesn't look like a phone number")
            .positive("A phone number can't start with a minus")
            .integer("A phone number can't include a decimal point")
            .min(10, "phone must have min 10 number")
            .required('A phone number is required'),
        name: Yup.string()
            .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
            .max(40)
            .required("Required"),
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        // console.log(values);
        props.dispatch({
            type: USER_SIGN_UP_SAGA,
            newUser: values,
            typeAction: 'USER_SIGN_UP',
        })
        // console.log(values);
    },

})(RegisterCyberBug);

export default connect()(RegisterCyberBugFormmik);
