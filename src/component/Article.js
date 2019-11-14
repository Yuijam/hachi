import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './css/Article.css'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'

class Article extends Component{

    render(){
        const {articleData, isOwner, onDelete, toEditUrl} = this.props
        const {title, text_origin, writeTime} = articleData
        const writeTimeStr = new Date(writeTime).toLocaleTimeString()
        return (
            <div className='article-body'>
                <div>
                    <h4>{title}</h4>
                </div>
                <div className="text_md">
                    <ReactMarkdown source={text_origin} renderers={{code: CodeBlock}}/>
                </div>

                <p className='write-time'>{`created at ${writeTimeStr}`}</p>

                {isOwner ? 
                    <div className='opt'>
                        <Link onClick={onDelete} to='#'>Delete</Link>
                        
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

                        <Link replace={true} to={{pathname:toEditUrl, articleData:articleData}}>Edit</Link>
                    </div>
                    : ''}
                
            </div>
        )
    }
}

export default Article