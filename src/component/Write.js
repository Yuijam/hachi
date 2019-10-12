import React, {Component} from 'react'
import './css/Write.css'
import marked from 'marked';
import hljs from 'highlight.js';
// import 'highlight.js/styles/atom-one-dark.css';
import 'highlight.js/styles/github.css';
import PropTypes from 'prop-types'
// import 'highlight.js/styles/monokai-sublime.css';
import { Button, Divider } from 'antd';
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'

marked.setOptions({
    highlight: function(code, lang, callback) {
        return hljs.highlightAuto(code).value;
    }
});

class Write extends Component{

    constructor(props){
        super(props)
        this.inputTextarea = React.createRef();
    }

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

    onCancel = ()=>{
        if (this.props.onCancel){
            this.props.onCancel()
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
            let start = this.inputTextarea.current.selectionStart
            let end = this.inputTextarea.current.selectionEnd;
            let value = this.inputTextarea.current.value;
            console.log('start = ', start, end)
            if (start === end){
                e.target.value = e.target.value.substring(0, start) + '    ' + e.target.value.substring(end)
                this.inputTextarea.current.selectionStart = this.inputTextarea.current.selectionEnd = start + 4
            }else{
    
                var lineStart = value.lastIndexOf('\n', start),
                    lineEnd = value.indexOf('\n', end),
                    offset = 0;
                console.log('lineStart lineEnd', lineStart, lineEnd)
                if (lineStart === -1) lineStart = 0;
                if (lineEnd === -1) lineEnd = value.length;
        
                if (lineStart === lineEnd);
                else if (lineStart !== 0) lineStart += 1;
        
                let lines = value.substring(lineStart, lineEnd).split('\n');
                console.log([lineStart, lineEnd], lines);
        
                if (lines.length > 1) {
                    offset = lines.length;
                    lines = '\t' + lines.join('\n\t');
        
                    this.inputTextarea.current.value = value.substring(0, lineStart) + lines + value.substring(lineEnd);
        
                    this.inputTextarea.current.selectionStart = start + 1;
                    this.inputTextarea.current.selectionEnd = end + offset;
                } else {
                    offset = 1;
                    lines = lines[0];
        
                    this.inputTextarea.current.value = value.substring(0, start) + '\t' + value.substring(end);
        
                    this.inputTextarea.current.selectionStart = this.inputTextarea.current.selectionEnd = start + offset;
                }
            }

        }
    }

    render(){
        return(
            <div className='write-body'>
                <div className='tool-bar'>
                    <Button onClick={this.onCancel}>Cancel</Button>
                    <Button onClick={this.onPublish} loading={this.props.isDoneLoading}>Done</Button>
                </div>

                <div className='text-area'>
                    <div className='input-text-area'>
                        <input autoFocus='autofocus' className='input-title' placeholder='input title' onChange={this.onTitleChange} value={this.state.title} />
                        {/* <hr/> */}
                        <textarea ref={this.inputTextarea} onKeyDown={this.onKeyDown} className='input-content' placeholder='input content' onChange={this.onTextChange} value={this.state.text_origin}/>
                    </div>
                    <Divider className='divider' type="vertical" dashed={true}/>
                    <div className='md-text-area'>
                        <h4 className='md-title'>{this.state.title}</h4>
                        <div className="result-pane">
                            <ReactMarkdown className='md-content' source={this.state.text_origin} renderers={{code: CodeBlock}}/>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Write