import React, { Component } from 'react';
import { List } from "antd";
import './css/Message.css'

const data = [
    "yuijam comment on your article: leetCode",
    "miojam followed you",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires."
];
class MessageContainer extends Component {

    render() {
        return (
            <List
                className='message-body'
                size="large"
                // header={<div>Header</div>}
                // footer={<div>Footer</div>}
                // bordered
                dataSource={data}
                renderItem={item => <List.Item>{item} <a href='http://www.google.com'>here</a></List.Item>}
            />
        )
    }
}

export default MessageContainer