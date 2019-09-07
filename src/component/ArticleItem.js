import React, { Component } from 'react'
import {Link} from 'react-router-dom';

class ArticleItem extends Component{

    render(){
        const {title, _id} = this.props.itemData
        let {url} = this.props
        return(
            <div>
                <div className='article_item'>
                    <Link to={`${url}/article/${_id}`}>{title}</Link>
                </div>
            </div>
        )
    }
}

export default ArticleItem