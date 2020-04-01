import React, { Component } from 'react';
import {getButtonDom,getFormDom_prod,getImageDom,getCarouselDom} from '../../configs/comDom';
import _ from "lodash";
class Generator extends Component {
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