import React, { Component } from 'react'
import AvatarUpload from './AvatarUpload'
import { Descriptions, Button, Avatar } from 'antd';
import './css/Profile.css'

class Profile extends Component {

  creatDesItem(item) {
    return <Descriptions.Item key={item.label} label={item.label}>{item.text}</Descriptions.Item>
  }

  onClickEdit = (e) => {
    if (this.props.onClickEdit){
      this.props.onClickEdit(e)
    }
  }

  onClickFollow = (e) => {
    if (this.props.onClickFollow){
      this.props.onClickFollow(e)
    }
  }

  render() {
    // console.log(this.props.isSelf)
    return (
      <div className='profile-body'>
        <div>
          {this.props.isSelf ? 
            <AvatarUpload className='avatar-upload' />
            : <Avatar size={80} src={this.props.avatar}/>
          }
        </div>
        
        {this.props.isSelf ? null : 
          <Button 
            className='follow-button' 
            icon={'plus'} 
            onClick={this.onClickFollow} 
            loading={this.props.followBtnLoading}>
              {this.props.followBtnText}
          </Button>
        }
        {this.props.isSelf ? 
          <Button 
            className='edit-profile-button' 
            icon={'edit'} 
            onClick={this.onClickEdit}>
              Edit
          </Button> : null
        }
        <Descriptions className='desc' title="User Info">
          {this.props.items.map(this.creatDesItem)}
        </Descriptions>
      </div>
    )
  }
}

export default Profile