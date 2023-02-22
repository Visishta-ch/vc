import React from 'react'
// import styles from './Button.module.css'
import { Link } from 'react-router-dom'
const Button = ({backgroundColor, children, onClick, to}) => {
  
  const buttonStyle = {
    color:'white', 
    backgroundColor:backgroundColor,
    padding:'10px 20px',
    textAlign:'center',
     margin:'15px'
  }
  return (
    <>
        <Link to={to} style={buttonStyle} onClick={onClick} >{children}</Link>
    </>
  )
}

export default Button