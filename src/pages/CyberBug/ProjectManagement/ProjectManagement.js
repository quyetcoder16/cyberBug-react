import React, { useEffect, useState } from 'react'
import { AutoComplete, Popover, Avatar, Button, Space, Table, Tag } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'
import ReactHtmlParser from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { GET_LIST_PROJECT_SAGA } from '../../../redux/types/cyberBugConstant/CyberBugConstants';
import FormEditProject from '../../../components/Form/FormEditProject';
import { message, Popconfirm } from 'antd';

export default function ProjectManagement() {

    const { projectList } = useSelector(state => state.ProjectCyberBugsReducer);
    const { userSearch } = useSelector(state => state.UserLoginCyberBugReducer);
    // console.log(userSearch);
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_LIST_PROJECT_SAGA
        })
    }, []);

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    const clearFilters = () => {
        setFilteredInfo({});
    };
    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };
    const setAgeSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'age',
        });
    };


    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName'
        },
        // {
        //     title: 'description',
        //     dataIndex: 'description',
        //     key: 'description',
        //     render: (text, record, index) => {
        //         const jsx = ReactHtmlParser(text);
        //         return <div>
        //             {jsx}
        //         </div>
        //     }
        // },
        {
            title: 'category',
            dataIndex: 'categoryName',
            key: 'categoryName'
        },
        {
            title: 'creator',
            // dataIndex: 'creator',
            key: 'creator',
            render: (text, record, index) => {
                return <Tag color="green">{record.creator?.name}</Tag>
            }
        },
        {
            title: 'members',
            key: 'members',
            render: (text, record, index) => {
                // console.log(record);
                // console.log(record);
                console.log(record.members);
                return <div>
                    {record.members?.splice(0, 3).map((member, index) => {
                        return <Popover key={index} placement='top' content={() => {
                            return (<table className='table'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>avatar</th>
                                        <th>name</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {record.members?.map((item, index) => {
                                        console.log(index);
                                        return <tr key={index}>
                                            <td>{item.userId}</td>
                                            <td><img src={item.avatar} width="30" height="30" style={{ borderRadius: '15px' }} alt={index} /></td>
                                            <td>{item.name}</td>
                                            <td>
                                                <button onClick={() => {
                                                    dispatch({
                                                        type: 'REMOVE_USER_PROJECT_API',
                                                        userProject: {
                                                            userId: item.userId,
                                                            projectId: record.id
                                                        }
                                                    })

                                                }} className="btn btn-danger" style={{ borderRadius: '50%' }}>X</button>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>)
                        }}>
                            <Avatar key={index} src={member.avatar} />
                        </Popover>
                    })}
                    {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}
                    <Popover placement="topLeft" title="Add user" content={() => {
                        return <AutoComplete
                            options={userSearch?.map((user, index) => {
                                return { label: user.name, value: user.userId.toString() }
                            })}
                            value={value}
                            onChange={(text) => {
                                console.log(text);
                                setValue(text);
                            }}
                            onSelect={(valueSelect, option) => {
                                // console.log(record);
                                dispatch({
                                    type: 'ADD_USER_PROJECT_API',
                                    userProject: {
                                        "projectId": record.id,
                                        "userId": Number(valueSelect)
                                    }
                                })
                            }}
                            onSearch={(value) => {
                                dispatch({
                                    type: 'GET_USER_API',
                                    keyWord: value
                                })
                            }}
                            style={{ width: '100%' }
                            } />
                    }} trigger="click">
                        <Button style={{ borderRadius: '50%' }}>+</Button>
                    </Popover>
                </div>
            }
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => {
                return (<div>
                    <button className="btn mr-2 btn-primary" onClick={() => {
                        const action = {
                            type: 'OPEN_FORM_EDIT_PROJECT',
                            Component: <FormEditProject />,
                        }

                        //dispatch lên reducer nội dung drawer
                        dispatch(action);

                        const actionEditProject = {
                            type: 'EDIT_PROJECT',
                            projectEditModel: record
                        }
                        dispatch(actionEditProject);
                    }}>
                        <FormOutlined style={{ fontSize: 17 }} />
                    </button>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => {
                            dispatch({
                                type: 'DELETE_PROJECT_SAGA',
                                idProject: record.id,
                            })
                        }}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="btn btn-danger">
                            <DeleteOutlined style={{ fontSize: 17 }} />
                        </button>
                    </Popconfirm>

                </div>);
            }
        }
    ];

    return (
        <div className='container-fluid mt-5'>
            <h3>Project management</h3>
            <>
                <Space
                    style={{
                        marginBottom: 16,
                    }}
                >
                    <Button onClick={setAgeSort}>Sort age</Button>
                    <Button onClick={clearFilters}>Clear filters</Button>
                    <Button onClick={clearAll}>Clear filters and sorters</Button>
                </Space>
                <Table columns={columns} dataSource={projectList} onChange={handleChange} />
            </>
        </div>
    )
}
