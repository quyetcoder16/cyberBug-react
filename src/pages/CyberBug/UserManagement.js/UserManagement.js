import { Button, Input, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GET_ALL_USER_SAGA } from '../../../redux/types/cyberBugConstant/UserConstant';

export default function UserManagement() {

    const dispatch = useDispatch();
    const { arrUser } = useSelector(state => state.UserReducer);

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
                return <>
                    <button className='btn btn-primary'><i className="fa-solid fa-user-pen"></i> Edit</button>
                    <button className='btn btn-danger ml-2'><i className="fa-solid fa-trash"></i> Delete</button>
                </>
            }
        },
    ];

    const renderSearch = () => {
        return <div className='mt-3 ml-4 row'>
            <Input className='col-9' placeholder="Search ...." prefix={<SearchOutlined />} />
            <Button className='col-2 ml-3' type="primary">Search</Button>
        </div>
    }


    return (
        <div className='container-fluid mt-5'>
            <h3>User management</h3>
            <button className='btn btn-primary mt-3'><i className="fa-solid fa-user-plus"></i> Create User</button>
            {renderSearch()}
            <Table className='mt-3' columns={columns} dataSource={arrUser} />;
        </div>
    )
}
