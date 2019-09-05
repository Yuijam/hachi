import React, { Component } from 'react'
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import './css/Article.css'

class Article extends Component{

    state={
        id: -1,
        title: '',
        text_md: '',
        text_origin:'',
        del:false,
        redir:false
    }

    componentWillMount(){
        let {match} = this.props
        this.setState({id:match.params.id})
        axios.get(`/api/article/${match.params.id}`).then((response) => {
            this.setState({title:response.data.title, text_md:response.data.text_md, text_origin:response.data.text_origin});
        }).catch((error) => {
            console.log(error);
        });
    }

    onDelete = (e)=>{
        e.preventDefault();
        axios.delete(`/api/article/${this.state.id}`).then((response) => {
            console.log('on del article = ', response.data);
            this.setState({del:true})
        }).catch((error) => {
            console.log(error);
        });
    }

    render(){
        let {redir, del} = this.state;
        let {histroy} = this.props;

        if (del) return <Redirect to={`/`}/>;

        if (redir) {
            histroy.replace('/edit')
            return;
        }

        return (
            <div className='article-body'>
                <div>
                    <h3>{this.state.title}</h3>
                </div>
                <hr/>
                <div>
                    <pre className='text_md' dangerouslySetInnerHTML={{__html: this.state.text_md}}></pre>
                </div>

                <div className='opt'>
                    <Link onClick={this.onDelete} to='#'>Delete</Link>
                    
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

                    <Link replace={true} to={{pathname:'/edit', state:this.state}}>Edit</Link>
                </div>
                
            </div>
        )
    }
}

export default Article