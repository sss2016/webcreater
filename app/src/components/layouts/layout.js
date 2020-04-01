import React from 'react';
import '../../App.css';
import { Layout,Icon,Menu} from 'antd';
import RouteTable from '../../router';
import SideMenu from './sideMenu'
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
  onGetPath(key){
    this.props.history.push(key) 
  }
  render(){
    console.log(this.props)
  return (
    <Layout id="components-layout-demo-custom-trigger">
        <SideMenu onGetPath={this.onGetPath.bind(this)}>

        </SideMenu>
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

            <RouteTable></RouteTable>
          </Content>
        </Layout>
      </Layout>
  );
}
}
export default Mylayout;