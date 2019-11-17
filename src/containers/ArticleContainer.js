import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Article from '../component/Article'
import {userInfoWrapper} from '../redux/Wrapper'
import { reqDeleteArticle, reqArticle, reqAddComment, reqGetComments } from '../api'
import moment from 'moment'

class ArticleContainer extends Component {

  state = {
    del: false,
    redir: false, 
    articleData: {},
    comments: [],
    submitting: false
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
    this.getComments()
  }

  getArticle = async (id) => {
    let res = await reqArticle(id)
    this.setState({articleData:res.data})
  }

  getComments = async () => {
    const article_id = this.props.match.params.id
    console.log('getComments', article_id)
    let comments = await reqGetComments({article_id})
    comments = comments.data.map(c => {
      return {...c, datetime:moment(c.datetime).fromNow()}
    })
    this.setState({comments})
  }

  handleSubmit = async (value) => {
    
    this.setState({submitting: true});

    // var commentSchema = new Schema({
    //   username:String,
    //   text:String,
    //   avatar:String,
    //   commentTime:Number,
    //   article_id:String,
    // })
    const {userInfo} = this.props
    let comment = {
      author:userInfo.username, 
      content:value, 
      avatar:userInfo.avatar, 
      datetime:Number(new Date().valueOf()),
      article_id:this.props.match.params.id
    }
    let res = await reqAddComment(comment)
    this.setState({submitting:false})
    if (res.status === 0){
      this.getComments()
    }
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
        comments={this.state.comments}
        submitting={this.state.submitting}
        handleSubmit={this.handleSubmit}
        commentAvatar={this.props.userInfo.avatar}
      />
    )
  }
}

export default userInfoWrapper(ArticleContainer)