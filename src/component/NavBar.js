import React, { Component } from 'react'
import './css/NavBar.css'
import { NavLink } from 'react-router-dom'


class NavBar extends Component{

    render(){
        const {items} = this.props;
        return (
            <nav className='navbar-body'>
                <ul className='item-list'>
                    {items.map((item, i) => {
                        return (<div key={i} ><span>&nbsp;&nbsp;&nbsp;</span><NavLink to={item.to}>{item.text}</NavLink><span>&nbsp;&nbsp;&nbsp;</span> {items.length-1 !== i ? '|' : ''}</div>)
                    })}
                </ul>
            </nav>
        )
    }
}

export default NavBar