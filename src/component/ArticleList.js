import React, { Component } from 'react'
import ArticleItem from './ArticleItem'
import "antd/dist/antd.css";
import './css/ArticleList.css'
import { Typography } from "antd";

class ArticleList extends Component {

    render(){
        console.log('this.props', this.props)
        const {article_list, username} = this.props
        if (article_list.length === 0) return <div />
        return (
            <Typography className='article-list-body'>
                {article_list.map((itemData, i) => {
                    return (<ArticleItem 
                            className='articleItem' 
                            itemData={itemData} 
                            key={itemData._id} 
                            lastOne={i===article_list.length-1}
                            username={username}
                        />)
                })}
            </Typography>
        )
    }
}

export default ArticleList