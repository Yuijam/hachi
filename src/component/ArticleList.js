import React, { Component } from 'react'
import { List, Avatar, Icon } from 'antd';
import './css/ArticleList.css'
import { Link } from 'react-router-dom';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class ArticleList extends Component {

  render() {
    const { articles, onPageChange, pageSize, total } = this.props
    return (
      <List
        className='article-list-body'
        itemLayout="vertical"
        size="large"
        dataSource={articles}
        // footer={
        //     <div>
        //         <b>ant design</b> footer part
        //     </div>
        // }
        pagination={{
          onChange: page => {
            console.log(page);
            onPageChange(page)
          },
          pageSize: pageSize,
          total: total,
          hideOnSinglePage: true
        }}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText type="star-o" text="156" key="list-vertical-star-o" />,
              <IconText type="like-o" text="156" key="list-vertical-like-o" />,
              <IconText type="message" text="2" key="list-vertical-message" />,
              <p>{`by ${item.owner}`}</p>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />}
              // title={<Link href={item.href}>{item.title}</a>}
              title={<Link to={{ pathname: `/user/${item.owner}/article/${item._id}`, articleData: item }}>{item.title}</Link>}
            // description={item.text_origin}
            />
            {item.text_origin}
          </List.Item>
        )}
      />
    )
  }
}

export default ArticleList