import TopBar from '../component/TopBar'
import React, { Component } from 'react'
import NavMenu from './NavMenuContainer'

class TopBarContainer extends Component{
    
    render(){
        return(
            <TopBar 
                extra={<NavMenu key='navmenu'/>}
            />
        )
    }
}

export default TopBarContainer