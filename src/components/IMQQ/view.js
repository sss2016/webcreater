import React from 'react';
import { Card, Icon, Avatar } from 'antd';
import MessageList from './MessageList';
import FriendList from './FriendList';
import ChatWindow from './chatWindow'
const { Meta } = Card;
const tabList = [
    {
      key: 'tab1',
      tab: '消息列表',
    },
    {
      key: 'tab2',
      tab: '我的好友',
    },
  ];
  

  // const oldMsgData = global.MSG_CACHE
  
  // global.MSG_CACHE=[]
// const socket = require('socket.io-client')('http://localhost:3000?user=123');  
export default class IMQQ extends React.PureComponent{

    constructor(){
        super()
        console.log('全局对象',global.msgcache)
    }
    state = {
        key: 'tab1',
        noTitleKey: 'app',
        message:"默认消息",
        userInfo:"用户1",
        userlist:[],
        visible:false
      };

      onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
      };
      onReceiveMessage(msg){
        console.log('列表消息',msg)
        let user = {
          title:msg.from_user,
          msg:'约吗？'

        }
        this.setState(
          {
            userlist:[...new Set(this.state.userlist.concat(user))]
          }
        )
        
        
      }
      getcontentList(key){
        let contentList = {
          tab1: <MessageList userlist={this.state.userlist}></MessageList>,
          tab2: <FriendList></FriendList>,
        };
        return contentList[key]
      }
      onClose(){
        this.setState({
          visible:false
        })
      }
    render(){
        return(
            <div style={{display:'flex',flexDirection:"row"}}>
            <div style={{width:'300px',height:'500px',
            backgroundImage:"url("+require('./cover.jpg')+")"
            ,backgroundSize:'100% 100%',
            overflow:"hidden",
            borderRadius:"5px"
            }}>
            <div style={{width:'80%',margin:'20px auto',height:'100px',backgroundColor:'#fff',display:"flex",flexDirection:"row"}}>
                <div style={{border:"2px #fff solid",width:'64px'}}>
                    <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"  />
                </div>
                <div style={{padding:"5px"}}>
                    <h2>name</h2>
                    <span>describe</span>
                </div>

            </div>
        <Card
          style={{ width: '100%',height:"330px",overflow:'auto' }}
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={key => {
            this.onTabChange(key, 'key');
          }}
        >
          {this.getcontentList(this.state.key)}
        </Card>
            </div>
            <div style={{marginLeft:"50px"}}>

                 <ChatWindow 
                 visible={this.state.visible}
                 from_user='adminuser111' 
                 to_user='test111' 
                 msgList={global.msgcache.data}
                 onClose={()=>{
                   this.onClose()
                 }}
                 onReceiveMessage={(msg)=>{

                    this.onReceiveMessage(msg)
                 }}
                 > </ChatWindow>

            </div>
     </div>
        );
    }


}