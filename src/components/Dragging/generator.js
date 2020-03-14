import React, { Component } from 'react';
import {getButtonDom,getContairDom,getImageDom,getCarouselDom} from '../../comDom';
import _ from "lodash";
class Generator extends Component {
    getMyStyleByType(type,configs){
		let component;
		switch (type) {
			case 'button':
				component=getButtonDom(configs);
				break;
			case 'carousel':
				component=getCarouselDom(configs);
				break;
			default:
				component=getImageDom(configs);
				break;
		}
		return component;
	}
    createEl(){
        var viewH = document.documentElement.clientHeight
        return  _.map(this.props.datas, (l, i) => {
              return(
                  <div  key={i}>
                      {
                      _.map(l.cols,(v,k)=>{

                        return(  
                         <div className='col' key={k} 
                         style={{width:v.layout.width,height:v.layout.height*viewH,
                         marginTop:v.layout.margintop,
                         marginLeft:v.layout.marginleft}} >
                             {this.getMyStyleByType(v.type,v.configs)}
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