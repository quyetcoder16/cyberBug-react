import { Button, Input, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DELETE_USER_SAGA, EDIT_USER, GET_ALL_USER_SAGA, GET_USER_BY_KEYWORD_SAGA } from '../../../redux/types/cyberBugConstant/UserConstant';
import FormCreateUser from '../../../components/Form/FormCreateUser/FormCreateUser';
import { useState } from 'react';
import FormEditUser from '../../../components/Form/FormEditUser/FormEditUser';

export default function UserManagement() {

    const dispatch = useDispatch();
    const { arrUser } = useSelector(state => state.UserReducer);

    const [dataSearch, setDataSearch] = useState("");

    useEffect(() => {
        dispatch({ type: GET_ALL_USER_SAGA });
    }, []);

    const columns = [
        {
            title: 'user Id',
            dataIndex: 'userId',
            sorter: (a, b) => a.userId - b.userId,
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => {
                // console.log(record);
                return <>
                    <button className='btn btn-primary' onClick={() => {

                        dispatch({
                            type: EDIT_USER,
                            userEdit: record,
                        })

                        dispatch({
                            type: 'OPEN_FORM_EDIT_PROJECT',
                            title: "Edit User",
                            Component: <FormEditUser />,
                        });

                    }}><i className="fa-solid fa-user-pen"></i> Edit</button>
                    <button className='btn btn-danger ml-2' onClick={() => {
                        dispatch({
                            type: DELETE_USER_SAGA,
                            userId: record.userId,
                            keyWord: dataSearch,
                        });
                    }}><i className="fa-solid fa-trash"></i> Delete</button>
                </>
            }
        },
    ];

    const renderSearch = () => {
        return <div className='mt-3 ml-4 row'>
            <Input onChange={(e) => {
                setDataSearch(e.target.value);
            }} className='col-9' placeholder="Search ...." prefix={<SearchOutlined />} />
            <Button onClick={() => {
                dispatch({
                    type: GET_USER_BY_KEYWORD_SAGA,
                    keyWord: dataSearch,
                })
            }} className='col-2 ml-3' type="primary">Search</Button>
        </div>
    }


    return (
        <div className='container-fluid mt-5'>
            <h3>User management</h3>
            <button className='btn btn-primary mt-3' onClick={() => {
                dispatch({
                    type: "OPEN_FORM_EDIT_PROJECT",
                    title: "Create User",
                    Component: <FormCreateUser />
                });
            }}><i className="fa-solid fa-user-plus"></i> Create User</button>
            {renderSearch()}
            <Table className='mt-3' columns={columns} dataSource={arrUser} />;
        </div>
    )
}
