import { Form, Input, Button, Checkbox,Radio,DatePicker,Select} from 'antd';
import moment from 'moment';
import IForm from '../components/IForm/view'
import React from 'react';
import { Carousel } from 'antd';

// import Container from "./components/Container/view";
const buttonStyle=[
    'primary',
    'default',
    'dashed',
    'danger',
    'link'
];
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
export function getButtonDom(styles,model){

    return (
        
        <Button type={buttonStyle[styles.buttonStyle]}  style={{width: '100%',height:'100%'}}>{styles.buttonName||'default'}</Button>
    );
}
export function getImageDom(styles,model){
    return (
        <div   style={{width: '100%',height:'100%',backgroundColor:'#eee'}}>容器</div>
    );
}
export function getFormDom(styles,layerinfo,model){
    return (
        <IForm  layerinfo={layerinfo}  style={{width: '100%',height:'100%'}}>表单</IForm>
    );
}
export function getCarouselDom(styles,model){
    return(
        <Carousel autoplay style={{height:'100%',width:'100%'}}>
            <div>
            <h3>1</h3>
            </div>
            <div>
            <h3>2</h3>
            </div>
            <div>
            <h3>3</h3>
            </div>
            <div>
            <h3>4</h3>
            </div>
        </Carousel>

      );
}
//获取表单组件
export function getForm_submit(tagData,layerinfo,model){
    return(
    <Form.Item >
        <Button  disabled = {model?true:false} type="primary" htmlType="submit">提交</Button>
    </Form.Item>)
}
export function getForm_datepicker(tagData,layerinfo){
    let dateFormat = 'YYYY/MM/DD';

    return(
    <Form.Item label={tagData.configs.label} name={tagData.configs.name} rules={tagData.configs.rules} style={{margin:0}}>
        <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} disabled = {model?true:false} />
    </Form.Item>)
}
export function getForm_input(tagData,layerinfo,model){
    let mform = layerinfo.mform
    const { getFieldDecorator } = mform
    return(
    <Form.Item label={tagData.configs.label} name={tagData.configs.name}  rules={tagData.configs.rules}  style={{margin:0}}>
        {getFieldDecorator(tagData.configs.name, {
            rules: [{ required: tagData.configs.isRequired, message: 'Please input your'+ tagData.configs.label}],
          })(
            <Input disabled = {model?true:false}></Input>
          )}
        
    </Form.Item>
    )
}
export function getForm_checkbox(tagData,layerinfo,model){
    let mform = layerinfo.mform
    const { getFieldDecorator } = mform
    return(<Form.Item label={tagData.configs.label} name={tagData.configs.name} rules={tagData.configs.rules} className='blockinblock'>
            {getFieldDecorator(tagData.configs.name, {
            rules: [{ required: tagData.configs.isRequired, message: 'Please input your'+ tagData.configs.label}],
          })(
            <Checkbox disabled = {model?true:false}></Checkbox>
          )}
        
    </Form.Item>)
}
export function getForm_select(tagData,layerinfo,model){
    let mform = layerinfo.mform
    const { getFieldDecorator } = mform
    return(
    <Form.Item label={tagData.configs.label} name={tagData.configs.name} rules={tagData.configs.rules} style={{margin:0}} >
        
        {getFieldDecorator(tagData.configs.name, {
            rules: [{ required: tagData.configs.isRequired, message: 'Please input your'+ tagData.configs.label}],
          })(
            <Select  disabled = {model?true:false}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
                Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
         </Select>
          )}
       

    </Form.Item>)
}
export function getForm_radio(tagData,layerinfo,model){
    let mform = layerinfo.mform
    const { getFieldDecorator } = mform
    return(
    <Form.Item label={tagData.configs.label} name={tagData.configs.name}  rules={tagData.configs.rules} style={{margin:0}}>
         {getFieldDecorator(tagData.configs.name, {
            rules: [{ required: tagData.configs.isRequired, message: 'Please input your'+ tagData.configs.label}],
          })(
            <Radio.Group disabled = {model?true:false}>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </Radio.Group>
          )}

    </Form.Item>)
}