import React, { Component } from 'react'
import Profile from '../component/Profile'
import UpdateProfileForm from '../component/UpdateProfileForm'
import { Modal, message } from 'antd'
import { userInfoWrapper } from '../redux/Wrapper'
import { reqFollow, reqUnFollow, reqUser, reqSession, reqUpdateUser} from '../api'

class ProfileContainer extends Component {

  state = {
    isShow: false,
    userInfo: {},
    items: [
      { label: 'Username', text: 'xxxx' },
      { label: 'Email', text: 'xxxx' },
      { label: 'Gender', text: 'xxxx' },
      { label: 'Location', text: 'xxxx' },
      { label: 'Birthday', text: 'xxxx' },
      { label: 'Articles', text: 'xxxx' },
      { label: 'Description', text: 'xxxx' },
    ],
    followBtnText: 'Follow',
    followBtnLoading: false,
    avatar: '',
  }

  handleCancel = () => {
    // 清除输入数据
    // this.form.resetFields()
    // 隐藏确认框
    this.setState({
      isShow: false
    })
  }

  handleOk = async() => {
    console.log('Received values of form: ', this.form.getFieldsValue());
    const val = this.form.getFieldsValue()
    const {description, gender, location} = val
    const birthday = val.birthday._i
    let data = {...this.props.userInfo, description, gender, location, birthday}
    let res = await reqUpdateUser(data)
    this.handleCancel()
    if (res.status === 0){
      this.getUser()
    }else{
      message.error('update failed')
    }
    // reqUpdateUser()
    // e.preventDefault();
    // this.form.validateFieldsAndScroll((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
  }

  setForm = (form) => {
    this.form = form
  }

  onClickEdit = (e) => {
    console.log('onClickEdit')
    this.setState({ isShow: true })
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.getUser()
  }

  userToItems = (user) => {
    return [
      { label: 'Username', text: user.username },
      { label: 'Email', text: user.email },
      { label: 'Gender', text: user.gender },
      { label: 'Location', text: user.location },
      { label: 'Birthday', text: user.birthday },
      { label: 'Articles', text: user.articleCount },
      { label: 'Description', text: user.description }
    ]
  }

  getUser = async () => {
    console.log('getUser', this.props.userInfo.username)
    let actionUsername = this.props.userInfo.username
    if (!actionUsername) {
      let session = await reqSession()
      if (session.status === 0 && session.data.username) {
        actionUsername = session.data.username
        this.actionUsername = actionUsername
      }
    }

    if (actionUsername && this.curUser){
      const data = { actionUsername, targetUsername: this.curUser }
      console.log(data)
      let res = await reqUser(data)
      const items = this.userToItems(res.data)
      this.setState({ items, avatar:res.data.avatar, followBtnText: res.data.followed ? 'Following' : 'Follow' })
    }
  }

  follow = async (data) => {
    let res = await reqFollow(data)
    // const { targetUser } = res.data
    this.setState({ followBtnLoading: false, followBtnText: 'Following'})
  }

  unFollow = async (data) => {
    console.log('unFollow')
    let res = await reqUnFollow(data)
    // const { targetUser } = res.data
    this.setState({ followBtnLoading: false, followBtnText: 'Follow'})
  }

  onClickFollow = async () => {
    console.log('onClickFollow')
    let actionUsername = this.actionUsername
    if (!this.props.userInfo.username || !actionUsername) {
      let session = await reqSession()
      if (session.status === 0 && session.data.username) {
        actionUsername = session.data.username
        this.actionUsername = actionUsername
      }
    }

    if (actionUsername){
      const data = { actionUsername, targetUsername: this.curUser}
        this.setState({ followBtnLoading: true })
        if (this.state.followBtnText === 'Following') {
          this.unFollow(data)
        } else {
          this.follow(data)
        }
    }
  }

  render() {
    let { userInfo, match } = this.props
    let { username: curUser } = match.params
    let isSelf = curUser === userInfo.username
    this.curUser = curUser
    if (!userInfo.username) return <div></div>

    return (
      <div>
        <Profile
          items={this.state.items}
          isSelf={isSelf}
          onClickEdit={this.onClickEdit}
          followBtnText={this.state.followBtnText}
          followBtnLoading={this.state.followBtnLoading}
          onClickFollow={this.onClickFollow}
          avatar={this.state.avatar}
        />
        <Modal
          title="Edit Profile"
          visible={this.state.isShow}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <UpdateProfileForm setForm={this.setForm} />
        </Modal>
      </div>
    )
  }
}

export default userInfoWrapper(ProfileContainer)