import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './css/Article.css'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'
import CodeBlock from './CodeBlock'

class Article extends Component{

    static propTypes = {
        text_md: PropTypes.string,
        title: PropTypes.string,
        isOwner: PropTypes.bool,
        writeTime: PropTypes.number,
        onDelete: PropTypes.func
    }

    static defaultProps = {
        text_md: '',
        title: '',
        isOwner: false,
        onDelete: {}
    } 

    render(){
        const writeTime = new Date(this.props.writeTime).toLocaleTimeString()
        return (
            <div className='article-body'>
                <div>
                    <h4>{this.props.title}</h4>
                </div>
                <div className="text_md">
                    <ReactMarkdown source={this.props.text_origin} renderers={{code: CodeBlock}}/>
                </div>

                <p className='write-time'>{`created at ${writeTime}`}</p>

                {this.props.isOwner ? 
                    <div className='opt'>
                        <Link onClick={this.props.onDelete} to='#'>Delete</Link>
                        
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

                        <Link replace={true} to={this.props.toEditUrl} >Edit</Link>
                    </div>
                    : ''}
                
            </div>
        )
    }
}

export default Article