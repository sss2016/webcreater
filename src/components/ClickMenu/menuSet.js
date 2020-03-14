import { Modal, Button,Slider, InputNumber,Select } from 'antd';
import React from "react";
import { Divider } from 'antd';
import {getMenuConfig} from './menuconfig'
import { Radio,Input  } from 'antd';
import {UploadImage,PicturesWall} from '../UploadImage/view'
export  class ButtonPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          buttonName:'default',
          buttonStyle:0

        }
    }
    handleChange(prop,e){
      this.setState({
        [prop] : e.target.value,
        }
      ) 
    }
    getMyData(){

      return {
        'buttonName':this.state.buttonName,
        'buttonStyle':this.state.buttonStyle
      }
    }
  render() {
    return (
        <div>
            <p>按钮名称</p>
            <p>
            <Input placeholder="Basic usage" defaultValue='default' onChange={this.handleChange.bind(this,'buttonName')}  />
            </p>
            <p>按钮风格</p>
            <div style={{marginBottom:10}} >
                <Radio.Group onChange={this.handleChange.bind(this,'buttonStyle')}>
                <Radio value={1}>primary</Radio>
                <Radio value={2}>default</Radio>
                <Radio value={3}>dashed</Radio>
                <Radio value={4}>Danger</Radio>
                <Radio value={5}>Link</Radio>
                </Radio.Group>
            </div>
            <p>左边距</p>
            <p>右边距</p>
            <p>上边距</p>
            <p>下边距</p>
            <p>动作</p>
        </div>
    );
  }
}
export  class ImagePanel extends React.Component {
    constructor(props) {
        super(props);
    }

  render() {

    return (
        <div>
            <p>选择图片</p>
            <UploadImage></UploadImage>
        </div>
    );
  }
}
export  class TextPanel extends React.Component {
    constructor(props) {
        super(props);
    }

  render() {

    return (
        <div>
            <p>文本类型</p>
            {/* <p>
            <Radio.Group >
                <Radio value={1}>primary</Radio>
                <Radio value={2}>default</Radio>
                <Radio value={3}>dashed</Radio>
                <Radio value={4}>Danger</Radio>
                <Radio value={5}>Link</Radio>
            </Radio.Group>
            </p> */}
        </div>
    );
  }
}
export  class CarouselPanel extends React.Component {
    constructor(props) {
        super(props);
    }

  render() {

    return (
        <div>
            <p>设置图片</p>
            <PicturesWall></PicturesWall>
        </div>
    );
  }
}
export  class IFormPanel extends React.Component {
  constructor(props) {
      super(props);
  }

render() {

  return (
      <div>
          <p>背景颜色</p>
          <p>背景图片</p>
          <p>表单提交成页面</p>
          <Select defaultValue="lucy" style={{ width: 120 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
                <Option value="Yiminghe">yiminghe</Option>
          </Select>
      </div>
  );
}
}
export  class RowlPanel extends React.Component {
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

render() {
  const { inputValue } = this.state;

  return (
      <div>

          <p>对齐方式</p>
            <div style={{marginBottom:10}} value={1}>
                <Radio.Group >
                  <Radio value={1}>左对齐</Radio>
                  <Radio value={2}>居中对齐</Radio>
                  <Radio value={3}>右对齐</Radio>
                </Radio.Group>
            </div>
           <p>内边距</p>
           <div>
            <Slider
              min={1}
              max={20}
              onChange={this.onChange}
              value={typeof inputValue === 'number' ? inputValue : 0}
            />
           </div>
      </div>
  );
}
}