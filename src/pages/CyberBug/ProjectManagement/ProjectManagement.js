import React, { useEffect, useState } from 'react'
import { Button, Space, Table, Tag } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'
import ReactHtmlParser from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { GET_LIST_PROJECT_SAGA } from '../../../redux/types/cyberBugConstant/CyberBugConstants';

export default function ProjectManagement() {

    const { projectList } = useSelector(state => state.ProjectCyberBugsReducer);
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
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => {
                return (<div>
                    <button className="btn mr-2 btn-primary">
                        <FormOutlined style={{ fontSize: 17 }} />
                    </button>
                    <button className="btn btn-danger">
                        <DeleteOutlined style={{ fontSize: 17 }} />
                    </button>
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
