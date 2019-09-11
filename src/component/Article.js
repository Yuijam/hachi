import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './css/Article.css'

class Article extends Component{

    render(){
        console.log('this.props.text_md', this.props.text_md)
        return (
            <div className='article-body'>
                <div>
                    <h3>{this.props.title}</h3>
                </div>
                <hr/>
                <div>
                    <pre className='text_md' dangerouslySetInnerHTML={{__html: this.props.text_md}}></pre>
                </div>

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