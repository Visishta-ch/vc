import React,{Fragment} from 'react'
import {NavLink} from 'react-router-dom'
import './Nav.css'
const Nav = ({children}) => {
    const menu = [
        {
            path: '/' ,
            name : 'Home',
        },
        {
            path: '/add-scenario',
            name : 'Add scenario',
        },
        {
            path: '/scenario',
            name : 'All scenario',
        },
        
        {
            path: '/add-vehicle',
            name : 'Add-vehicle',
        }

    ]
  return (
    <Fragment>
        <div className="nav-container">
            <div className="sidebar">
                <div className="top-section">
                    {/* <h1>menu</h1> */}
                </div>
                <nav>
                {menu.map((item,index) => (
                     <NavLink to={item.path} exact key={index} activeClassName='active' >
                        <div className='link_text'>{item.name}</div>
                    </NavLink>
                ))}
                </nav>
            </div>
            <main>{children}</main>
        </div>
    </Fragment>
  )
}

export default Nav