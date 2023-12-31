import React from 'react'
import { NavLink } from 'react-router-dom';

export default function MenuCyberBug() {
    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src={require('../../../assets/img/download.jfif')} alt='1' />
                </div>
                <div className="account-info">
                    <p>app project Management</p>
                    <p>Report bugs</p>
                </div>
            </div>
            <div className="control">
                <div>
                    <i className="fa fa-credit-card mr-1" />
                    <NavLink className="text-dark" activeStyle={{ color: 'blue' }} to="/cyberbug" activeClassName="active font-weight-bold text-primary" >Cyber Board</NavLink>
                </div>
                <div>
                    <i className="fa fa-cog mr-1" />
                    <NavLink className="text-dark" activeStyle={{ color: 'blue' }} to='/createproject' activeClassName="active font-weight-bold  text-primary" >Create project</NavLink>
                </div>
                <div>
                    <i className="fa fa-cog mr-1" />
                    <NavLink className="text-dark" activeStyle={{ color: 'blue' }} to='/ProjectManagement' activeClassName="active font-weight-bold  text-primary" >Project Management</NavLink>
                </div>
                <div>
                    <i className="fa fa-cog mr-1" />
                    <NavLink className="text-dark" activeStyle={{ color: 'blue' }} to='/UserManagement' activeClassName="active font-weight-bold  text-primary" >User Management</NavLink>
                </div>
            </div>
            <div className="feature">
                <div>
                    <i className="fa fa-truck mr-1" />
                    <span>Releases</span>
                </div>
                <div>
                    <i className="fa fa-equals mr-1" />
                    <span>Issues and filters</span>
                </div>
                <div>
                    <i className="fa fa-paste mr-1" />
                    <span>Pages</span>
                </div>
                <div>
                    <i className="fa fa-location-arrow mr-1" />
                    <span>Reports</span>
                </div>
                <div>
                    <i className="fa fa-box mr-1" />
                    <span>Components</span>
                </div>
            </div>
        </div>

    )
}
