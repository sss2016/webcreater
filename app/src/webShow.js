import React from 'react';
import './App.css';
import  'antd/dist/antd.css';

// import 'whatwg-fetch'
import { Layout,Icon,Menu} from 'antd';
// import RouteTable from './router';
// import { HashRouter as Router, Link } from 'react-router-dom';
// import ChatWindow from './components/IMQQ/chatWindow'
// import { NavLink } from "react-router-dom";
import Generetor from './components/Dragging/generator';
// const { Header} = Layout;
class App extends React.Component {
  state={
    datas:[]
  }
// componentWillMount(){
//   let self = this
//   fetch('/api/getView', {
//     method: 'get',
//   }).then((data)=>data.json()).then(
// function(data){
//   self.setState({
//     datas:data.content
//   })
// }
//   ).catch(err=>{
//     console.log(err)
// })
// }
  render(){
    // let datas = this.state.datas||[]
  return (
    <Generetor datas={this.state.datas}>
        

    </Generetor>
    // <ChatWindow from_user='test111' to_user='adminuser111'>


    // </ChatWindow>
  );
}
}
export default App;