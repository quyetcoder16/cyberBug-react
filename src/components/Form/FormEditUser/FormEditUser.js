import { Input } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { withFormik } from 'formik';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { connect, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { EDIT_USER_SAGA } from '../../../redux/types/cyberBugConstant/UserConstant';

function FormEditUser(props) {

    const dispatch = useDispatch();
    const { userEdit } = useSelector(state => state.UserReducer);
    // console.log(userEdit);

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    useEffect(() => {
        dispatch({ type: 'SET_SUBMIT_EDIT_USER', submitFunction: handleSubmit })
    }, []);

    return (
        <form onSubmit={handleSubmit} className="container">
            <h6 className='ml-1'>User Id</h6>
            <div className="d-flex" >
                <Input name="id" disabled value={values.id} size="large" placeholder="userId" prefix={<UserOutlined />} onChange={handleChange} />
            </div>
            <h6 className='ml-1 mt-3'>Email</h6>
            <div className="d-flex" >
                <Input name="email" value={values.email} size="large" placeholder="Email" prefix={<MailOutlined />} onChange={handleChange} />
            </div>
            <div className='text-danger'>{errors.email}</div>
            <h6 className='mt-3 ml-1'>New Password</h6>
            <div className="d-flex">
                <Input onChange={handleChange} value={values.passWord} style={{ width: '100%', minWidth: 450 }} type="password" name="passWord" size="large" placeholder="New Password" prefix={<LockOutlined />} />
            </div>
            <div className='text-danger'>{errors.passWord}</div>
            <h6 className='mt-3 ml-1'>Phone Number</h6>
            <div className="d-flex">
                <Input value={values.phoneNumber} onChange={handleChange} style={{ width: '100%', minWidth: 450 }} type="text" name="phoneNumber" size="large" placeholder="Phone Number" prefix={<PhoneOutlined />} />
            </div>
            <div className='text-danger'>{errors.phoneNumber}</div>
            <h6 className='mt-3 ml-1'>Name</h6>
            <div className="d-flex">
                <Input value={values.name} onChange={handleChange} style={{ width: '100%', minWidth: 450 }} type="text" name="name" size="large" placeholder="Name" prefix={<UserOutlined />} />
            </div>
            <div className='text-danger'>{errors.name}</div>
        </form >
    )
}

const FormEditUserFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {

        return {
            id: props.userEdit?.userId,
            email: props.userEdit?.email,
            passWord: props.userEdit?.passWord,
            name: props.userEdit?.name,
            phoneNumber: props.userEdit?.phoneNumber,
        }
    },
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
    handleSubmit: (values, { props, setSubmitting, resetForm }) => {
        // console.log(values);
        setSubmitting(false);

        resetForm({
            values: ""
        });

        props.dispatch({
            type: EDIT_USER_SAGA,
            userUpdate: values,
        })

        // props.dispatch({
        //     type: USER_SIGN_UP_SAGA,
        //     newUser: values,
        //     typeAction: 'CREATE_USER',
        // });

        // console.log(values);
    },


})(FormEditUser);

const mapStateToProp = (state) => {
    return {
        userEdit: state.UserReducer.userEdit,
    }
}

export default connect(mapStateToProp)(FormEditUserFormik);
