import React, { Component } from 'react'
import { Upload, Icon, message } from 'antd';
import {userInfoWrapper} from '../redux/Wrapper'

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class AvatarUpload extends Component {
    state = {
        loading: false,
    };

    handleChange = async ({ file, fileList }) =>{
        console.log('handleChange()', file.status, fileList.length, file===fileList[fileList.length-1])

        // 一旦上传成功, 将当前上传的file的信息修正(name, url)
        if(file.status==='done') {
          const result = file.response  // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
          console.log('result = ', result)
          if(result.status===0) {
            message.success('上传图片成功!')
            const {name, url} = result.data
            file = fileList[fileList.length-1]
            file.name = name
            file.url = url
            this.props.updateUserInfo(result.data.user)
          } else {
            message.error('上传图片失败')
          }
        } else if (file.status==='removed') { // 删除图片
        //   const result = await reqDeleteImg(file.name)
        //   if (result.status===0) {
        //     message.success('删除图片成功!')
        //   } else {
        //     message.error('删除图片失败!')
        //   }
        }
    
        // 在操作(上传/删除)过程中更新fileList状态
        // this.setState({imageUrl:fileList[fileList.length-1].url})

    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { avatar:imageUrl } = this.props.userInfo;
        return (
            <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/api/avatar"
                beforeUpload={beforeUpload}
                accept='image/*'
                onChange={this.handleChange}
                data={{username:this.props.userInfo.username, preUrl:imageUrl}}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        );
    }
}

export default userInfoWrapper(AvatarUpload)