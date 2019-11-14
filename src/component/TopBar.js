import React, { Component } from 'react'
import './css/TopBar.css'
import { PageHeader } from 'antd';
import 'antd/dist/antd.css';

class TopBar extends Component {

  render() {
    let { extra } = this.props
    return (
      <PageHeader
        title="Hachi"
        subTitle="ready to work"
        extra={[extra]}
      />
    );
  }
}

export default TopBar