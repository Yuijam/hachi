import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './css/Article.css'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import { Typography } from 'antd'
const { Title, Paragraph } = Typography;

class Article extends Component {

  render() {
    const { articleData, isOwner, onDelete, toEditUrl } = this.props
    const { title, text_origin, writeTime } = articleData
    const writeTimeStr = new Date(writeTime).toLocaleTimeString()
    return (
      <Paragraph className='article-body'>
        <Title level={2}>{title}</Title>
        <Paragraph>
          <ReactMarkdown source={text_origin} renderers={{ code: CodeBlock }} />
        </Paragraph>
        <p className='write-time'>{`created at ${writeTimeStr}`}</p>

        {isOwner ?
          <div className='opt'>
            <Link onClick={onDelete} to='#'>Delete</Link>

            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

            <Link replace={true} to={{ pathname: toEditUrl, articleData: articleData }}>Edit</Link>
          </div>
          : ''}
      </Paragraph>
    )
  }
}

export default Article