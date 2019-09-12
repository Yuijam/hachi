import React, {Component} from 'react'
import './css/Write.css'
import marked from 'marked';
import hljs from 'highlight.js';
// import 'highlight.js/styles/atom-one-dark.css';
import 'highlight.js/styles/github.css';
import PropTypes from 'prop-types'
// import 'highlight.js/styles/monokai-sublime.css';
import { Button } from 'antd';

marked.setOptions({
    highlight: function(code, lang, callback) {
        return hljs.highlightAuto(code).value;
    }
});

class Write extends Component{

    static propTypes = {
        title: PropTypes.string,
        onPublish: PropTypes.func,
        text_origin: PropTypes.string,
        text_md: PropTypes.string
    }
    
    static defaultProps = {
        title: '',
        text_origin: '',
        text_md: ''
    }

    state = {title:'', text_md:'', text_origin:''}

    componentWillMount(){
        let {title, text_origin, text_md} = this.props
        this.setState({title, text_origin, text_md})
    }

    onTextChange = (event)=>{
        // console.log(marked(event.target.value))
        this.setState({text_md:marked(event.target.value), text_origin:event.target.value})
    }

    onPublish = () => {
        if (this.props.onPublish){
            this.props.onPublish(this.state)
        }
    }

    onTitleChange = (event)=>{
        this.setState({
            title: event.target.value
        })
    }

    onKeyDown = (e)=>{
        if (e.key === "Tab") {
            e.preventDefault();
            this.setState({text_origin:this.state.text_origin+'    '})
        }
    }

    render(){
        return(
            <div className='write-body'>
                <div className='tool-bar'>
                    <Button onClick={this.onPublish} loading={this.props.isDoneLoading}>Done</Button>
                </div>
                <div className='text-area'>
                    <div className='input-text-area'>
                        <input autoFocus='autofocus' className='input-title' placeholder='input title' onChange={this.onTitleChange} value={this.state.title} />
                        {/* <hr/> */}
                        <textarea onKeyDown={this.onKeyDown} className='input-content' placeholder='input content' onChange={this.onTextChange} value={this.state.text_origin}/>
                    </div>

                    <div className='md-text-area'>
                        <h4 className='md-title'>{this.state.title}</h4>
                        {/* <hr/> */}
                        <pre className='md-content' dangerouslySetInnerHTML={{__html: this.state.text_md}}></pre>
                    </div>
                </div>
            
                {/* <button className='publish' onClick={this.onPublish}>Done</button> */}
            </div>
        );
    }
}

export default Write