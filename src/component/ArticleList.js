import React, { Component } from 'react'
import ArticleItem from './ArticleItem'
import './css/ArticleList.css'

class ArticleList extends Component {

    render(){
        console.log('articlelist render')
        const {article_list, url} = this.props
        return (
            <div className='artcleList'>       
                {article_list.map((itemData, i) => {
                    return (<ArticleItem className='articleItem' itemData={itemData} key={i} url={url}/>)
                })}
            </div>
        )
    }
}

export default ArticleList