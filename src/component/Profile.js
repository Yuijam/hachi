import React, { Component } from 'react'
import AvatarUpload from './AvatarUpload'
import { Descriptions, Button } from 'antd';
import './css/Profile.css'

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
                <Descriptions className='desc' title="User Info">
                    {this.props.items.map(this.creatDesItem)}
                </Descriptions>
            </div>
        )
    }
}

export default Profile