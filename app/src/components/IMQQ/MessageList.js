import React from 'react';
import { List, Avatar,Icon } from 'antd';
import './index.css';
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
export default class MessageList extends React.PureComponent{
  onSelected(e){

    console.log(e.target)
  }
render(){

    return(
    
    <div style={{width: '30%'}}>
      <List
          className='userlist'
          itemLayout="horizontal"
          dataSource={data}//this.props.userlist
          renderItem={(item) => (
    
            <List.Item className='people' onClick={this.onSelected.bind(this)} tabIndex='0'>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={item.title}
                description={item.msg}
              />
              <Icon type="close" />
            </List.Item>    )}
        />
    </div>
    
    )
}
    
}