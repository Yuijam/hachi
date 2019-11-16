import React, { Component } from 'react'
import { reqTimeline } from '../api'
import ArticleList from '../component/ArticleList'
import { PAGE_SIZE } from '../const'

class TimelineContainer extends Component {
  state = { username: '', articles: [], total: 0 }

  componentDidMount() {
    const { username } = this.props.match.params
    this.getData(username);
  }

  getData = async (username, pageIdx = 1) => {
    let res = await reqTimeline(username, pageIdx, PAGE_SIZE)
    this.setState({ username: username, articles: res.data.articles, total: res.data.total });
  }

  onPageChange = (pageIdx) => {
    console.log('onPageChange ', pageIdx)
    const { username } = this.props.match.params
    this.getData(username, pageIdx)
  }

  render() {
    return (
      <div>
        <ArticleList
          articles={this.state.articles}
          onPageChange={this.onPageChange}
          pageSize={PAGE_SIZE}
          total={this.state.total}
        />
      </div>
    )
  }
}

export default TimelineContainer