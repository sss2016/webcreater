import {Slider} from 'antd';
import React from "react";
import {mapDispatchToProps,mapStateToProps} from '../../redux/store'
import {connect} from 'react-redux';
import { Radio,Input  ,Button} from 'antd';
class RowPanel extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
      inputValue: 1,
    };
  
    onChange = value => {
      this.setState({
        inputValue: value,
      });
    };
    arrangeWay(e){
        console.log(e.target)
    }
  render() {
    const { inputValue } = this.state;
  
    return (
        <div>
  
            <p>对齐方式</p>
              <div style={{marginBottom:10}} value={1}>
                  <Radio.Group onChange={this.arrangeWay.bind(this)}>
                    <Radio value={1}>左对齐</Radio>
                    <Radio value={2}>居中对齐</Radio>
                    <Radio value={3}>右对齐</Radio>
                  </Radio.Group>
              </div>
             <p>操作</p>
             <Button size='small' type="danger">删除此行</Button>
             {/* <div>
              <Slider
                min={1}
                max={20}
                onChange={this.onChange}
                value={typeof inputValue === 'number' ? inputValue : 0}
              />
             </div> */}
        </div>
    );
  }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(RowPanel);
