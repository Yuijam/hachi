import React, { Component } from 'react';
import { Avatar, Button, Descriptions } from 'antd';
import './css/SideUserInfo.css'

class SideUserInfo extends Component{
    creatDesItem(item){
        return <Descriptions.Item key={item.label} label={item.label}>{item.text}</Descriptions.Item>
    }
    
    render(){
        const {isSelf, onFollow, followBtnLoading, items, followBtnText} = this.props
        return(
            <div className='side-user-info-body'>
                <div className='avatar-area'>
                    <Avatar size={70} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                    {isSelf ? null : <Button className='side-user-info-follow' onClick={onFollow} loading={followBtnLoading}>{followBtnText}</Button>}
                </div>
                <Descriptions className='desc' title="" column={2} layout='vertical' size='small'>
                    {items.map(this.creatDesItem)}
                </Descriptions>
                
            </div>
        )
    }
}

export default SideUserInfo