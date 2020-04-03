import { Menu, Icon, Layout } from 'antd';
import React from 'react';
const { Header, Sider, Content } = Layout;
import { HashRouter as Router, Link } from 'react-router-dom';
export default class SideMenu extends React.Component {
  state = {
    collapsed: false,
  };
  onGetPath(e){
    this.props.history.push(e.key)
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    return (
      <Router>
      <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['/mydesign']} onSelect={this.onGetPath.bind(this)}>
          <Menu.Item key="/mydesign" to='/mydesign'>
            <Icon type="user" />
            <span> 我的设计</span>
           
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span>文章管理</span>
          </Menu.Item>
          <Menu.Item key="myim">
            <Icon type="upload" />
            <span>我的IM</span>
          </Menu.Item>
          <Menu.Item key="mysubmit">
            <Icon type="upload" />
            <span>表单管理</span>
          </Menu.Item>
          <Menu.Item key="imagemanager">
            <Icon type="upload" />
            <span>图片管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      </Router>
    );
  }
}