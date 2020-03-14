import { Modal, Button,Card } from 'antd';
import React from "react";
import {mapDispatchToProps,mapStateToProps} from '../../redux/store'
import {connect} from 'react-redux';
import {ButtonPanel,TextPanel,ImagePanel,CarouselPanel,RowlPanel,IFormPanel} from './menuSet'
import { Radio } from 'antd';

class Setting extends React.Component {
  state = {
    loading: false,
    value: 1,
    visible: false,
    setType:null,
    setKey:null
  };
  showMenuSet(){
    // console.log('theKey'+this.props.setKey)
    var source = this.props.setting
    if(!source) return null;
    if (source.setType=='button')
    return (<ButtonPanel ref='dataObj'></ButtonPanel>)
    else if(source.setType=='image')
    return (<ImagePanel  ref='dataObj'></ImagePanel>)
    else if(source.setType=='text')
    return(<TextPanel ref='dataObj'></TextPanel>)
    else if(source.setType=='carousel')
    return (<CarouselPanel ref='dataObj'></CarouselPanel>)
    else if(source.setType=='row')
    return(<RowlPanel ></RowlPanel>)
    else if(source.setType=='form'){
      return(<IFormPanel></IFormPanel>)
    }
    return null
  }
  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  // handleOk = () => {
  //   let widgets = this.props.widgets
  //   let the_widget=widgets[this.props.setKey]
  //   the_widget.configs=this.refs.dataObj.getMyData()
  //   this.props.onWidgetsChange(widgets)
  //   // console.log(this.props.onWidgetsChange)
  //   // console.log(widgets)
  //   // console.log(this.getFromLS("layouts"))
  //   // this.setState({ loading: true });
  //   // setTimeout(() => {
  //   //   this.setState({ loading: false, visible: false });
  //   // }, 3000);
  // };

  handleCancel(){
      this.props.onShowSettingStyle({
        setVisible:false,
        setKey:null,
        setType:null
      });
  };
  render() {
    // const { loading } = this.state;
    const visible=this.props.setting?this.props.setting.setVisible:false;
    // const thisconfig=getMenuConfig(this.props.layout.setting.setType)
    let Component = 
    <Card
    size="small" title="属性设置面板" 
    extra={<span onClick={this.handleCancel.bind(this)} >close</span>} 
    style={{ width: '18%',marginLeft:'10px' }}
  >
    {this.showMenuSet()}

    <div>
       {/* <Button key="back" >
          取消
        </Button> */}
        {/* <Button key="submit" type="primary" loading={loading} onClick={this.handleOk.bind(this)}>
          保存
        </Button> */}
    </div>
  </Card>
    return (
        visible?Component:null
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Setting);
