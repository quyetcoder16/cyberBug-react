import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
export default function Header() {


    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/">Cyberlearn</NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/home">Home </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                        <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/contact">Contact</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/profile">Profile</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">bài tập</a>
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                            <NavLink className="dropdown-item" to="/ToDoListRCC">To Do List RCC</NavLink>
                            <NavLink className="dropdown-item" to='/ToDoListRFC'>To Do List RFC</NavLink>
                            <NavLink className="dropdown-item" to='/ToDoListReducer'>To Do List Reducer</NavLink>
                            <NavLink className="dropdown-item" to='/ToDoListSaga'>To Do List Saga</NavLink>
                            <NavLink className="dropdown-item" to='/DemoHoc'>Demo hoc</NavLink>
                        </div>
                    </li>

                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>

    )
}
