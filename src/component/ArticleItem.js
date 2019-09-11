import React, { Component } from 'react'
import {Link} from 'react-router-dom';
// import "antd/dist/antd.css";
import { Typography, Divider } from "antd";

const { Title, Paragraph } = Typography;

class ArticleItem extends Component{

    render(){
        const {title, _id,} = this.props.itemData
        let {url, lastOne} = this.props
        return(
            <div>
                <Link to={`${url}article/${_id}`}><Title level={2}>{title}</Title></Link>
                <Paragraph>
                In the process of internal desktop applications development, many
            different design specs and implementations would be involved, which might
            cause designers and developers difficulties and duplication and reduce the
            efficiency of development.
                </Paragraph>

                {lastOne ? '' : <Divider />}
            </div>
        )
    }
}

export default ArticleItem