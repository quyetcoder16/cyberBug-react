import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskAction, deleteTaskAction, doneTaskAction, getTaskListAPIAction, rejectTaskAction } from '../../redux/actions/ToDoListActions';

export default function ToDoListReducer() {

    let { taskList } = useSelector(state => state.ToDoListReducer);
    let dispatch = useDispatch();

    let [state, setState] = useState(
        {
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
        dispatch(deleteTaskAction(taskName));
    }

    // xử lý done task 

    const doneTask = (taskName) => {
        dispatch(doneTaskAction(taskName));
    }


    // xu ly rejectTask

    const rejectTask = (taskName) => {
        dispatch(rejectTaskAction(taskName));
    }

    const renderTaskToDo = () => {
        return taskList.filter(item => item.status === false).map((item, index) => {
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
        return taskList.filter(item => item.status === true).map((item, index) => {
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
        dispatch(getTaskListAPIAction());
    }

    const addTask = (e) => {
        e.preventDefault();

       dispatch(addTaskAction(state.value.taskName));

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

