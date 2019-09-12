import React, {Component} from 'react'
import { connect } from 'react-redux'
import Write from '../component/Write'
import {updateBtnVisibleState} from '../actions'

const mapStateToProps = (state, ownProps) => ({
    buttonVisible: state.buttonVisible,
    ownProps
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    setBtnVisible: (btnVisible, v) => dispatch(updateBtnVisibleState({...btnVisible, ...v})),
    setBtnDefault: (btnVisible) => dispatch(updateBtnVisibleState({...btnVisible, write:true, done:false}))
})

class BtnCtr extends Component{
    componentDidMount(){
        console.log('BtnCtr new componentDidMount')
        this.props.setBtnVisible(this.props.buttonVisible, {write:false, done:true})
    }

    componentWillUnmount(){
        this.props.setBtnDefault(this.props.buttonVisible)
    }

    render(){
        return(
            <Write {...this.props.ownProps}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BtnCtr)