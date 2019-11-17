import React, { Component } from 'react'
import { Menu , Icon} from 'antd';
import {Link} from 'react-router-dom';
import './css/NavMenu.css'
const { SubMenu} = Menu;

class NavMenu extends Component {
    state = {
        current: 'home',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    createItemsUi = (item) => {
        if (item.child){
            return (
                <SubMenu title={<span><Icon type={item.icon} /> {item.text}</span>} key={item.key}>
                    {item.child.map(this.createItemsUi)}
                </SubMenu>
            )
        }else{
            return (
                <Menu.Item key={item.key} onClick={item.onClick}>
                    <Link className='topbar-nav' to={{pathname:item.url}}>
                        {item.ui}
                        {item.icon ? <Icon type={item.icon}/> : null}
                        {item.text}
                    </Link>
                </Menu.Item>
            )
        }
    }

    render() {
        let { items } = this.props
        return (
            <Menu className='nav-menu-body' onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                {items.map(this.createItemsUi)}
            </Menu>
        );
    }
}

export default NavMenu