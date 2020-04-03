import React, { Component } from 'react';
import {Form} from 'antd';
import _ from "lodash";
import {
	getForm_checkbox,getForm_select,getForm_datepicker,
	getForm_radio,getForm_submit,getForm_input
} from '../../configs/ssrCom';
class MForm extends Component {
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
            }
          });
    }
    getMyStyleByType(type,Tagdata){
		let component;
		let posInArray = {
			mform:this.props.form
		}
		let model= null
		switch (type) {
			case 'form_input':
				component = getForm_input(Tagdata,posInArray,model);
				break;
			case 'form_datepicker':
				component = getForm_datepicker(Tagdata,posInArray,model);
				break;
			case 'form_select':
				component = getForm_select(Tagdata,posInArray,model);
			break;
			case 'form_submit':
				component = getForm_submit(Tagdata,posInArray,model);
				break;
			case 'form_radio':
				component = getForm_radio(Tagdata,posInArray,model);
				break;
			case 'form_checkbox':
				component = getForm_checkbox(Tagdata,posInArray,model);
				break;	
			default:
				component=null;
				break;
		}
		return component;
    }
    createEl(){
        let boxarrangeWay = ['left','center','right']
        let flexarrangeWay=['flex-start','center','flex-end']
        return  _.map(this.props.datas, (l, i) => {
          let style =!l.configs.isAuto?{
            height:l.configs.lineH,
            display:'flex',
            alignItems:flexarrangeWay[l.configs.arrangeWay_y-1],
            justifyContent:flexarrangeWay[l.configs.arrangeWay_x-1],
        }:{
            height:'auto',
            textAlign:boxarrangeWay[l.configs.arrangeWay_x-1]
        }
              return(
                  <div  key={i} style={style} >
                      {
                      _.map(l.cols,(v,k)=>{

                        return(  
                         <div className='col' key={k} 
                         style={{width:v.layout.width,height:v.layout.height,
                         marginTop:v.layout.margintop,
                         marginLeft:v.layout.marginleft}} >
                             {this.getMyStyleByType(v.type,v)}
                        </div>
                        )
                      })
                      }
                  </div>
              )
          })
        
      }
    render() {
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };

        return (
            <Form
            {...formItemLayout}
            name="basic"
            onSubmit={this.handleSubmit.bind(this)}
            style={{height:'100%',width:'100%'}}
            >
                {this.createEl()}
            </Form>
        );
    }
}
export default Form.create({ name: 'MForm' })(MForm);