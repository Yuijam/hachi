import React, { Component } from 'react'
import AvatarUpload from './AvatarUpload'
import { Descriptions, Button } from 'antd';
import './css/Profile.css'
// const Item = List.Item

class Profile extends Component{
    
    creatDesItem(item){
        return <Descriptions.Item key={item.label} label={item.label}>{item.text}</Descriptions.Item>
    }

    render(){
        // console.log(this.props.isSelf)
        return (
            <div className='profile-body'>
                <div className='avatar-body'>
                    <AvatarUpload className='avatar-upload'/>
                    {this.props.isSelf ? null : <Button className='follow-button'>Follow</Button>}
                </div>
                {/* <List split={false}>
                    <Item>
                        <span className="left">Username:</span>
                        <span>yuijam</span>
                    </Item>
                    <Item>
                        <span className="left">商品名称:</span>
                        <span>电脑</span>
                    </Item>
                    <Item>
                        <span className="left">商品名称:</span>
                        <span>电脑</span>
                    </Item>
                    <Item>
                        <span className="left">商品名称:</span>
                        <span>电脑</span>
                    </Item>
                </List> */}
                <Descriptions className='desc' title="User Info">
                    {this.props.items.map(this.creatDesItem)}
                </Descriptions>
            </div>
        )
    }
}

export default Profile