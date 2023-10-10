import React, { useEffect, useState } from 'react'
import Axios from 'axios';

export default function ToDoListRFC() {

    let [state, setState] = useState(
        {
            taskList: [],
            value: {
                taskName: ''
            },
            errors: {
                taskName: ''
            }
        }
    )

    const handleChange = (e) => {
        let { name, value } = e.target;
        let newValue = { ...state.value };
        newValue = { ...newValue, [name]: value };
        let newErrors = { ...state.errors };
        let regexString = /^[a-z A-Z]+$/;
        if (!regexString.test(value) || value.trim() === '') {
            newErrors[name] = name + ' invalid !';
        } else {
            newErrors[name] = '';
        }

        setState({
            ...state,
            value: newValue,
            errors: newErrors
        })
    }


    // xử lý delete task

    const delTask = (taskName) => {
        let promise = Axios({
            url: `https://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        });

        promise.then(res => {
            alert(res.data);
            getTaskList();
        })

        promise.catch(err => {
            alert(err.response.data);
        });
    }

    // xử lý done task 

    const doneTask = (taskName) => {
        let promise = Axios({
            url: `https://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });

        promise.then(res => {
            alert(res.data);
            getTaskList();
        });

        promise.catch(err => {
            alert(err.response.data);
        });
    }


    // xu ly rejectTask

    const rejectTask = (taskName) => {
        let promise = Axios({
            url: `https://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        });

        promise.then(res => {
            alert(res.data);
            getTaskList();
        });

        promise.catch(err => {
            alert(err.response.data);
        });
    }

    const renderTaskToDo = () => {
        return state.taskList.filter(item => item.status === false).map((item, index) => {
            return (<li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button type='button' onClick={() => {
                        delTask(item.taskName)
                    }} className="remove">
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type='button' onClick={() => {
                        doneTask(item.taskName);
                    }} className="complete">
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>)
        });
    }

    const renderTaskToDoDone = () => {
        return state.taskList.filter(item => item.status === true).map((item, index) => {
            return (<li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button type='button' onClick={() => {
                        delTask(item.taskName)
                    }} className="remove">
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type='button' onClick={() => {
                        rejectTask(item.taskName);
                    }} className="complete">
                        <i className="far fa-undo" />
                        <i className="fas fa-undo" />
                    </button>
                </div>
            </li>)
        });
    }

    const getTaskList = () => {
        let promise = Axios({
            url: 'https://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        });

        promise.then((result) => {
            setState({
                ...state,
                taskList: result.data
            })
            // console.log(result.data);
        });

        promise.catch((err) => {
            console.log(err.response.data);
        })
    }

    const addTask = (e) => {
        e.preventDefault();

        let promise = Axios({
            url: 'https://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: {
                taskName: state.value.taskName
            }
        });

        promise.then(res => {
            getTaskList();
            // console.log(res);
        });

        promise.catch(err => {
            alert(err.response.data);
        });

    }

    useEffect(() => {
        getTaskList();
    }, [])

    return (
        <form onSubmit={addTask}>
            {/* <button onClick={() => { getTaskList() }}>Get task list</button> */}
            <div className="card">
                <div className="card__header">
                    <img src={require('./bg.png')} alt='' />
                </div>
                {/* <h2>hello!</h2> */}
                <div className="card__body">
                    <div className="card__content">
                        <div className="form-group">
                            <div className="card__title">
                                <h2>My Tasks</h2>
                                <p>September 9,2020</p>
                            </div>
                            <div className="card__add">
                                <input name="taskName" onChange={handleChange} id="newTask" type="text" placeholder="Enter an activity..." />

                                <button id="addItem" onClick={addTask}>
                                    <i className="fa fa-plus" />
                                </button>
                            </div>
                            <span className="text text-danger">{state.errors.taskName}</span>
                        </div>

                        <div className="card__todo form-group">
                            {/* Uncompleted tasks */}
                            <ul className="todo" id="todo">
                                {renderTaskToDo()}
                            </ul>
                            {/* Completed tasks */}
                            <ul className="todo" id="completed">
                                {renderTaskToDoDone()}

                                {/* <li>
                                    <span>Ăn sáng</span>
                                    <div className="buttons">
                                        <button className="remove">
                                            <i className="fa fa-trash-alt" />
                                        </button>
                                        <button className="complete">
                                            <i className="far fa-check-circle" />
                                            <i className="fas fa-check-circle" />
                                        </button>
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
