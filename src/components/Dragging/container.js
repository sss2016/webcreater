import React, { Component } from 'react';
import {mapDispatchToProps,mapStateToProps} from '../../redux/store'
import _ from "lodash";
import $ from 'jquery';
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import './front.css';
import Dragging from './dragging'
class Container extends Component {
 
    // LayoutChangeHandler(data){
    //     this.props.onChangeWidgets(data)
    //     // this.props.selectOne(newarr[data.row].cols[data.col].type);
    // }
    removeHandler(r,c){

        this.props.onRemoveItem(r,c);
    }
    constructor(props){
        super(props)
        this.state={
            layerinfo:this.props.layerinfo||{
                level:0, //判断该容器是几级容器，目前只有两级  0 为 顶级容器，1为 下层容器 如表单嵌入
                            //该容器在常规组件数组的位置  第几行第几列
                row:0,
                col:0
            }
        }
    }
    onSelectRow(row,e){
        var selector = e.target;
        e.nativeEvent.stopImmediatePropagation()
        if(!$(selector).hasClass('line')) return;
        $('.line').css({
            border:'none',
            borderBottom:'1px solid #8899BB'
        })
        selector.style.border='1px dashed #000'
        console.log(selector)
        let rowstyle = {
            row:row,
            setType:'row',
            setVisible:true,
        }
        this.props.onSelectRow(rowstyle);
    }
    createEl(){
        const option = {
            move : 'both',
            restricted : false,
            changeSize : true,
            supportDelete : true,
            reIndex : false,
            border: '1px solid #f5a351',
            
        }
        let row = this.state.layerinfo.row;
        let col = this.state.layerinfo.col
        let level = this.state.layerinfo.level
        let widgets = this.state.layerinfo.level==1?this.props.widgets[row].cols[col].widgets:this.props.widgets
        return  _.map(widgets, (l, i) => {
                console.log(widgets)
                let h = l.cols.length<1?{height:'100px'}:{};
              return(
                  <div className='line' iname={l.name} key={i} style={h} onClick={this.onSelectRow.bind(this,i)}>
                      {
                      _.map(l.cols,(v,k)=>{

                        return(  
                         <div className='col' key={k} onClick={(e)=>{
                                     e.stopPropagation();
                                        e.nativeEvent.stopImmediatePropagation()
                         }}>
                             <Dragging option={option} row={i} col={k} ikey={level+''+row+''+col+''+i+''+k} datas={v} parentlayerinfo={this.state.layerinfo}
                             onLayoutChange={(data)=>{
                               this.props.onChangeWidgets(data);
                            }}
                            onInit={(data)=>{
                                this.props.onChangeWidgets(data);
                            }}
                            onRemoveItem={(r,c)=>{
                                this.removeHandler(r,c)
                            }}
                        ></Dragging>
                        </div>
                        )
                      })
                      }
                  </div>
              )
          })
        
      }
      onSetCurrentContainner(e){
        // e.stopPropagation();
        // e.nativeEvent.stopImmediatePropagation()
        console.log('容器信息',this.state.layerinfo)
        this.props.onSetCurrentContainner(this.state.layerinfo)
      }
    render() {
            console.log('渲染')
            console.log(this.props)
        return (
                <div name="template-img-wrap"  onClick={this.onSetCurrentContainner.bind(this)}
                style={{width:'100%',height:'100%',border:'1px solid #333'}}>
                   {this.createEl()}
                </div>
        );
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Container);
