import React from 'react'
import './Button.css'

const Button = (props) => {
    return (
        <button className={`button-${props.size}`}
            onClick={props.clickHandle}
            type={props.type}
            style={{color : props.color, backgroundColor : props.background}}
        >
            {props.name}
        </button>
    )
}

export default Button