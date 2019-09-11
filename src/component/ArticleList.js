import React, { Component } from 'react'
import ArticleItem from './ArticleItem'
import "antd/dist/antd.css";
import './css/ArticleList.css'
import { Typography } from "antd";

class ArticleList extends Component {

    render(){
        const {article_list, url} = this.props
        console.log('article_list', article_list)
        return (
            <Typography className='article-list-body'>
                {article_list.map((itemData, i) => {
                    return (<ArticleItem 
                            className='articleItem' 
                            itemData={itemData} 
                            key={itemData._id} 
                            url={url} 
                            lastOne={i===article_list.length-1}
                        />)
                })}
            </Typography>
        )
    }
}

export default ArticleList