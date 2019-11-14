import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Article from '../component/Article'
// import Write from '../component/Write';
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import { reqDeleteArticle, reqArticle } from '../api'

const mapStateToProps = (state, ownProps) => ({
  userInfo: state.userInfo
})

class ArticleContainer extends Component {

  state = {
    del: false,
    redir: false, 
    articleData: {}
  }

  onDelete = async (e) => {
    e.preventDefault();
    let { articleData } = this.props.location
    console.log('onDelete', articleData)
    await reqDeleteArticle(articleData._id)
    this.setState({ del: true })
  }

  componentDidMount() {
    let { articleData } = this.props.location
    if (!articleData) {
      let {id} = this.props.match.params
      this.getArticle(id)
    }
  }

  getArticle = async (id) => {
    let res = await reqArticle(id)
    this.setState({articleData:res.data})
  }

  render() {
    let { redir, del } = this.state;
    let { histroy } = this.props;
    let articleData = this.props.location.articleData || this.state.articleData
    if (!articleData || !articleData._id) {
      return <div></div>
    }

    console.log('this.props.userInfo = ', this.props.userInfo)
    let { username = '' } = this.props.userInfo
    let isOwner = articleData.owner === username
    if (del) return <Redirect to={`/user/${username}`} />;

    if (redir) {
      histroy.replace(`/user/${username}/edit`)
      return;
    }

    return (
      <Article
        articleData={articleData}
        onDelete={this.onDelete}
        isOwner={isOwner}
        toEditUrl={`/user/${username}/edit`}
      />
    )
  }
}

export default connect(mapStateToProps)(ArticleContainer)