import React from 'react';
import { Card, Icon, Avatar,List } from 'antd';
var SocketClient = require('socket.io-client');
import MessageList from './MessageList';
import FriendList from './FriendList';
import ChatWindow from './chatWindow'
const { Meta } = Card;

  // const oldMsgData = global.MSG_CACHE
  
  // global.MSG_CACHE=[]
// const socket = require('socket.io-client')('http://localhost:3000?user=123');  
export default class IMQQ extends React.PureComponent{

    constructor(props){
        super(props)
        let socket=new SocketClient('http://localhost:4000')
        console.log('全局对象',global.msgcache)
        var that = this;
        // console.log('已监听'+'Message'+props.from_user)
        socket.on('Message'+props.from_user, function(msg){
            console.log('收到')
            // console.log(ioUserInfo);    //ioUserInfo为发送msg的用户信息    
            // console.log(msg)    //消息内容
        that.onReceiveMessage(msg);
        (!that.props.msgList||!(that.state.msgList.length==that.props.msgList.length))&&that.addToMsgList(msg)
        })
    }

    state = {
        noTitleKey: 'app',
        message:"默认消息",
        userInfo:"用户1",
        userlist:[],
        visible:false
      };
      onSendMessage(msg){
        this.state.socket.emit('sendMessage',msg)
      }
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
      onClose(){
        this.setState({
          visible:false
        })
      }
    render(){
        return(
          <div style={{paddingRight:'2%',boxShadow:'1px 2px 3px 1px',width:'70%'}}>
                <div style={{display:'flex',flexDirection:"row"}}>
                    <MessageList></MessageList>
                    <div>
                        <ChatWindow 
                        visible={this.state.visible}
                        from_user='adminuser111' 
                        to_user='test111' 
                        msgList={global.msgcache.data}
                        onClose={()=>{
                          this.onClose()
                        }}
                        onSendMessage={(msg)=>{

                            this.onSendMessage(msg)
                        }}
                        > </ChatWindow>
                  </div>
              </div>
        </div>
        );
    }


}