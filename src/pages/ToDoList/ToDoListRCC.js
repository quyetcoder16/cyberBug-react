import React, { Component } from 'react'
import './ToDoList.css';
import Axios from 'axios';

export default class ToDoListRCC extends Component {

    state = {
        taskList: [],
        value: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    }

    getTaskList = () => {
        let promise = Axios({
            url: 'https://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        });

        promise.then((result) => {
            this.setState({
                taskList: result.data
            })
            // console.log(result.data);
        });

        promise.catch((err) => {
            console.log(err.response.data);
        })
    }

    componentDidMount() {
        this.getTaskList();
    }

    renderTaskToDo = () => {
        return this.state.taskList.filter(item => item.status === false).map((item, index) => {
            return (<li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button type='button' onClick={() => { this.delTask(item.taskName) }} className="remove">
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type='button' onClick={() => {
                        this.doneTask(item.taskName);
                    }} className="complete">
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>)
        });
    }

    renderTaskToDoDone = () => {
        return this.state.taskList.filter(item => item.status === true).map((item, index) => {
            return (<li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button type='button' onClick={() => { this.delTask(item.taskName) }} className="remove">
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type='button' onClick={() => {
                        this.rejectTask(item.taskName);
                    }} className="complete">
                        <i className="far fa-undo" />
                        <i className="fas fa-undo" />
                    </button>
                </div>
            </li>)
        });
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        let newValue = { ...this.state.value };
        newValue = { ...newValue, [name]: value };
        let newErrors = { ...this.state.errors };
        let regexString = /^[a-z A-Z]+$/;
        if (!regexString.test(value) || value.trim() === '') {
            newErrors[name] = name + ' invalid !';
        } else {
            newErrors[name] = '';
        }

        this.setState({
            ...this.state,
            value: newValue,
            errors: newErrors
        })
    }

    // xử lý delete task

    delTask = (taskName) => {
        let promise = Axios({
            url: `https://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        });

        promise.then(res => {
            alert(res.data);
            this.getTaskList();
        })

        promise.catch(err => {
            alert(err.response.data);
        });
    }

    // xử lý done task 

    doneTask = (taskName) => {
        let promise = Axios({
            url: `https://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });

        promise.then(res => {
            alert(res.data);
            this.getTaskList();
        });

        promise.catch(err => {
            alert(err.response.data);
        });
    }

    // xu ly rejectTask

    rejectTask = (taskName) => {
        let promise = Axios({
            url: `https://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        });

        promise.then(res => {
            alert(res.data);
            this.getTaskList();
        });

        promise.catch(err => {
            alert(err.response.data);
        });
    }


    addTask = (e) => {
        e.preventDefault();

        let promise = Axios({
            url: 'https://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: {
                taskName: this.state.value.taskName
            }
        });

        promise.then(res => {
            this.getTaskList();
            // console.log(res);
        });

        promise.catch(err => {
            alert(err.response.data);
        });

    }

    render() {
        return (
            <form onSubmit={this.addTask}>
                {/* <button onClick={() => { this.getTaskList() }}>Get task list</button> */}
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
                                    <input name="taskName" onChange={this.handleChange} id="newTask" type="text" placeholder="Enter an activity..." />

                                    <button id="addItem" onClick={this.addTask}>
                                        <i className="fa fa-plus" />
                                    </button>
                                </div>
                                <span className="text text-danger">{this.state.errors.taskName}</span>
                            </div>

                            <div className="card__todo form-group">
                                {/* Uncompleted tasks */}
                                <ul className="todo" id="todo">
                                    {this.renderTaskToDo()}
                                </ul>
                                {/* Completed tasks */}
                                <ul className="todo" id="completed">
                                    {this.renderTaskToDoDone()}

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
}
