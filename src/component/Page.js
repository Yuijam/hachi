import React, { Component } from 'react'
import { Pagination } from 'antd';
import './css/Page.css'

class Page extends Component{

	onChange = (num)=>{
        if (this.props.onChange){
            this.props.onChange(num)
        }
	}

    render(){
        console.log('Page.js curPage = ', this.props.curPage, this.props.total)
        return(
            <Pagination 
                className='page-body'
                showQuickJumper 
                defaultCurrent={this.props.curPage} 
                total={this.props.total}
                onChange={this.onChange} 
            />
        )
    }
}

export default Page