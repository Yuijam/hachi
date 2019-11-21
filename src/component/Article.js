import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './css/Article.css'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import { Typography, Comment, Avatar, Form, Button, List, Input } from 'antd'

const { Title, Paragraph } = Typography;

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

class Article extends Component {

  state = {
    value: '',
  };

  handleSubmit = async () => {
    if (!this.state.value) {
      return;
    }

    if (this.props.handleSubmit) {
      await this.props.handleSubmit(this.state.value)
      this.setState({value:''})
    }
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { articleData, isOwner, onDelete, toEditUrl, comments, submitting, commentAvatar } = this.props
    const { title, text_origin, writeTime } = articleData
    const writeTimeStr = new Date(writeTime).toLocaleDateString() + ' ' + new Date(writeTime).toLocaleTimeString()
    const { value } = this.state;

    return (
      <div className='article-body'>
        <Paragraph>
          <Title level={2}>{title}</Title>
          <Paragraph>
            <ReactMarkdown source={text_origin} renderers={{ code: CodeBlock }} />
          </Paragraph>
          <p className='write-time'>{`${writeTimeStr}`}</p>

          {isOwner ?
            <div className='opt'>
              <Link onClick={onDelete} to='#'>Delete</Link>

              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

              <Link replace={true} to={{ pathname: toEditUrl, articleData: articleData }}>Edit</Link>
            </div>
            : ''}

        </Paragraph>
        <div>
          {comments.length > 0 && <CommentList comments={comments} />}
          <Comment
            avatar={
              <Avatar
                src={commentAvatar}
                icon={commentAvatar ? null : 'user'}
              />
            }
            content={
              <Editor
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                submitting={submitting}
                value={value}
              />
            }
          />
        </div>
      </div>
    )
  }
}

export default Article