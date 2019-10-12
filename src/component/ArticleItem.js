import React, { Component } from 'react'
import {Link} from 'react-router-dom';
// import "antd/dist/antd.css";
import { Typography, Divider } from "antd";

const { Title, Paragraph } = Typography;

class ArticleItem extends Component{

    render(){
        const {title, _id, text_origin} = this.props.itemData
        let {lastOne, username} = this.props
        return(
            <div>
                <Link to={{pathname:`/user/${username}/article/${_id}`, articleData:this.props.itemData}}><Title level={2}>{title}</Title></Link>
                <Paragraph ellipsis={{ rows: 5, expandable: false }}>
                {text_origin}
                </Paragraph>
                {lastOne ? '' : <Divider />}
            </div>
        )
    }
}

export default ArticleItem