import React, { Component } from 'react'

class NavItem extends Component{
    // constructor(props){
    //     super(props);
    //     console.log('props = ', props);
    // }

    onSelectItem(){
        console.log('onSlec');
    }

    render(){
        const {text, link} = this.props.item;
        const {isRight} = this.props
        const className = !isRight ? 'notRight' : 'isRight'
        return (
            <li><a href={link} className={className} onClick={this.onSelectItem.bind(this)}>{text?text:'null'}</a></li>
        )
    }
}

export default NavItem