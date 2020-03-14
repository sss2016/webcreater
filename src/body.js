import React, { PureComponent } from 'react';
import { Collapse,Button,Modal,Input } from 'antd';
import { connect } from 'react-redux'
import {mapDispatchToProps,mapStateToProps} from './redux/store'
import ReactDOM from 'react-dom';
import ToolsBar from './components/toolsBar/ToolsBar'
// import IForm from './components/IForm/view'
import _ from "lodash";
import 'whatwg-fetch'
import Setting from "./components/ClickMenu/view";
import {getWidgetsConfig} from './comconfig';
import Container from "./components/Dragging/container";
const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
class AppBody extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selection:null,
      widgets:[],
      visible:false,
      setType:null,
      setKey:null,
      saveVisible:false
    }
  }
  addLine(){
    let newrow =   {
          name:'line3',
          cols:[],
      }
      console.log('添加行')
      this.setState({
          widgets:[...this.state.widgets,newrow]
      },function(){
        console.log(this.state.widgets)
      })

  }
  addCol(type){
      let newcol = {};
      let additem  = getWidgetsConfig(type)
      let data = this.state.widgets;
      if(this.state.selection==null) return false;
      newcol.type = type;
      newcol=Object.assign(newcol,additem)
      console.log('合并',newcol)
      data[this.state.selection].cols.push(newcol)
      this.setState({
          widgets:[...data]
      })
  }
  onRemoveItem(r,c){
    let newWigets=this.state.widgets;
    newWigets[r].cols.splice(c,1)
    this.setState(
        {
          visible:false,
        widgets: [...newWigets]
        }
      );
  }
  onRemoveLine(r){
    let newWigets=this.state.widgets.filter((item,index) => index !=r)
    this.setState(
        {
        widgets: newWigets
        }
      );

  }
  onSelectRow(r){
    this.setState({
      selection:r
    })
  }
  onLayoutChange(data){
    this.setState({
      widgets:[...data]
    })
  }
  onSaveMydesign(){
    let element = ReactDOM.findDOMNode(this.refs.d_name)
    let data = {
      d_name:element.value||'空',
      content:this.state.widgets
    
    };
    // The actual fetch request
    fetch('/api/saveDesign', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function(data){
        console.log(data)
    }).catch(err=>{
      console.log(err)
  })
  }
  render() {
    console.log('weiii',this.props.widgets)
   return(  
    <div>
    <div style={{width:'60%',margin:'auto',height:'50px',textAlign:"center"}}>
    标题： <Input ref='d_name'  style={{width:'70%'}} placeholder='请输入一个标题'></Input>
      <Button type="primary" style={{'marginRight':'20px','marginLeft':'20px'}} onClick={this.onSaveMydesign.bind(this)}>保存</Button>
    </div>
    <div style={{display:'flex' ,flexDirection:"row"}}>

        <div style={{width:'18%',backgroundColor: '#fff'}}>
          <ToolsBar selection={this.props.selection}>

          </ToolsBar>
        </div>
        <div style={{width:'60%',height:'600px'}}>
          <Container 
          widgets={this.props.widgets} 
          onRemoveItem={(r,c)=>{
            this.onRemoveItem(r,c)
          }}
          onRemoveLine={(r)=>{
            this.onRemoveLine(r)
          }}
          // onLayoutChange={(data)=>{
          //   this.onLayoutChange(data)
          // }}
          // onSelectRow={(r)=>{
          //   this.onSelectRow(r)
          // }}
          selectOne={(type)=>{

            this.setState({
              setType:type,
              visible:true
            })
          }}
          >
          </Container>

        </div>

        {/* <IForm>  </IForm> */}
        <Setting visible={this.state.visible}
      //  setType={this.state.setType} 
      //  setKey={this.state.setKey} 
      //  handleCancel={this.handleCancel} 
      //  widgets={this.state.widgets}
      //  onWidgetsChange={
      //   (widgets)=>{
      //     console.log(widgets)
      //     this.handleChangeWidgets(widgets)}
      // }
       >
       </Setting>
    </div>
    {/* <Modal
          title="Basic Modal"
          visible={this.state.saveVisible}
          onOk={this.onSaveMydesign}
          onCancel={() => {
              this.setState({
                saveVisible: false,
              });
            }
        }
        >
          <p>请输入一个标题</p>
          <p>标题 <Input ></Input></p>
        </Modal> */}
    </div>

   )
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AppBody)
