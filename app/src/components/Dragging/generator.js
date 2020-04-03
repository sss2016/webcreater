import React, { Component } from 'react';
import {getButtonDom,getFormDom_prod,getCarouselDom} from '../../configs/ssrCom';
import _ from "lodash";
import axios from 'axios';
class Generator extends Component {
    constructor(props){
        super(props)
        this.state={
            datas:[]
        }
    }
    componentWillMount(){
 
        const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
    axios.get('/api/getView')
    .then(function (response) {
      _this.setState({
        datas:response.data.content,
      });
    })
    .catch(function (error) {
      console.log(error);
    })
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
    }
    getMyStyleByType(Tagdata){
        let component;
        let model=null
		switch (Tagdata.type) {
			case 'button':
				component=getButtonDom(Tagdata.configs,model);
				break;
			case 'carousel':
				component=getCarouselDom(Tagdata.configs,model);
				break;
			case 'form':
				component = getFormDom_prod(Tagdata.widgets,model);
                break;
                
		}
		return component;
	}
    createEl(){
        let boxarrangeWay = ['left','center','right']
        let flexarrangeWay=['flex-start','center','flex-end']
        let renderData = this.props.datas?this.props.datas:this.state.datas
        console.log('renderData',renderData)
        return  _.map(renderData, (l, i) => {
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
                  <div  key={i} style={style}>
                      {
                      _.map(l.cols,(v,k)=>{

                        return(  
                         <div className='col' key={k} 
                         style={{width:v.layout.width,height:v.layout.height,
                         marginTop:v.layout.margintop,
                         marginLeft:v.layout.marginleft}} >
                             {this.getMyStyleByType(v)}
                        </div>
                        )
                      })
                      }
                  </div>
              )
          })
        
      }
    render() {
        return (
            <div>
                {this.createEl()}
            </div>
        );
    }
}

export default Generator;