import React, { Component } from 'react'
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import './css/Article.css'

class Article extends Component{

    render(){
        return (
            <div className='article-body'>
                <div>
                    <h3>{this.props.title}</h3>
                </div>
                <hr/>
                <div>
                    <pre className='text_md' dangerouslySetInnerHTML={{__html: this.props.text_md}}></pre>
                </div>

                <div className='opt'>
                    <Link onClick={this.props.onDelete} to='#'>Delete</Link>
                    
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

                    <Link replace={true} to={this.props.toEditUrl}>Edit</Link>
                </div>
                
            </div>
        )
    }
}

export default Article