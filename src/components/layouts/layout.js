import React from 'react';
import '../../App.css';
import { Layout,Icon,Menu} from 'antd';
import RouteTable from '../../router';
import { HashRouter as Router, Link } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
// const socket = require('socket.io-client')('http://localhost:3000');  
// socket.on('Messageadminuser111',function(msg){
//   global.msgcache.data.push(msg)
//   // console.log(global.MSG_CACHE)
// })
class Mylayout extends React.Component {
  state = {
    collapsed: false,
    c_link:'/'
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  getDom(e){
    this.setState({
      c_link:e.key
    })
  }
  render(){
    console.log(this.props)
  return (
    <Layout id="components-layout-demo-custom-trigger">
        <Router>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['/mydesign']} onSelect={this.getDom.bind(this)}>
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
              <Layout>
              <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 600,
            }}
          >
            <RouteTable c_history={this.state.c_link}></RouteTable>
          </Content>
        </Layout>
      </Layout>
  );
}
}
export default Mylayout;