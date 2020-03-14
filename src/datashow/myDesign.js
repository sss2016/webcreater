import React from 'react';
import { Table, Divider, Tag } from 'antd';
import 'whatwg-fetch'
const { Column, ColumnGroup } = Table;

export default class DesignMan extends React.PureComponent{


    data = [
        {
          key: '1',
          firstName: 'John',
          lastName: 'Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          firstName: 'Jim',
          lastName: 'Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          firstName: 'Joe',
          lastName: 'Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];
    state={
      data:[]
    }
    getDesigns(){
      let self = this
    fetch('/api/getDesigns', {
      method: 'get',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response)=>
        response.json()
    ).then(function(res){
      console.log(res)
        self.setState({
          data:res.data.list
        })
    }).catch((err)=>{
      console.log(err)
    })
    }
    componentWillMount(){
      this.getDesigns();
    }
    render(){
    return( <Table dataSource={this.state.data}>
          <Column title="标题" dataIndex="d_name" key="d_name" />
        <Column title="作者" dataIndex="author_name" key="author_name" />
        <Column title="创建时间" dataIndex="creat_date" key="creat_date" />
        <Column title="修改时间" dataIndex="update_date" key="update_date" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
              <a>Invite {record.lastName}</a>
              <Divider type="vertical" />
              <a>Delete</a>
            </span>
          )}
        />
      </Table>
      )   

    }


}