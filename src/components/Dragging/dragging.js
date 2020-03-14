import React, { Component } from 'react';
import $ from 'jquery';
import {mapDispatchToProps,mapStateToProps} from '../../redux/store'
import {connect} from 'react-redux';
import {getButtonDom,getFormDom,getImageDom,getCarouselDom} from '../../comDom';

class Dragging extends Component {
	datas={
		move :'both', //可选值为X、Y 、both
		hander  :1, // 1 全部可拖拽
		changeSize :false, // 是否可改变大小
		restricted  : true, // 是否限制区域
		reIndex  : true,
		oriPosition  : {},
		supportDelete  : false,
		border  :'1px solid #fff',
		father:null,
		dragEl:null,
		// img:null,
		data:{},
		resize:''
	}
	constructor(props){
		super(props)

	}
	componentDidMount(){
		var option = this.props.option||{}
		var jQueryObj = $('#'+this.props.ikey);
		$.extend( this.datas,option );
		this.init(jQueryObj)
		this.props.onInit(this.getmyposition())

	}
	getmyposition(){
		var self = this.datas;
		let outW = $('[name=template-img-wrap]').width();
		let outH = $('[name=template-img-wrap]').height();
		let width = Math.round(self.dragEl.width()/outW*100)+'%'
		let height = self.dragEl.height()/outH
		let pos ={
			layerinfo:this.props.layerinfo,
			row:this.props.row,
			col:this.props.col,
			newcol:{
				id:this.props.ikey,
				layout:{
					width:width,
					height:height,
					marginleft:self.dragEl.position().left,
					margintop:self.dragEl.position().top
				}
			}
		}
		return pos;
	}
	init(jQueryObj){
		var self = this.datas;
		var this_ = this
		self.father=jQueryObj.parent();
		self.dragEl=jQueryObj;
		// console.log(self.dragEl)

		// self.img=self.dragEl.find('img');
		this_.initFun(jQueryObj);
	}
	initFun(jQueryObj){
		var self = this.datas;
		var this_ = this ;
		self.data = {
			X : '', //移动之前的pageX
			Y : '', //移动之前的pageY
			xPage : '', //移动之后的pageX
			yPage : '', //移动之后的pageY
			positionX : '',//移动之前的positionX
			positionY : '',//移动之前的positionY
			moveX : '',//移动之后的positionX
			moveY : '',//移动之后的positionY
			disX : '',//X变化量
			dixY : '',//Y变化量
			faWidth : self.father.width(),
			faHeight : self.father.height(),
			elWidth : self.dragEl.outerWidth()+2,
			elHeight : self.dragEl.outerHeight()+2,
			rate : self.dragEl.outerWidth()/self.dragEl.outerHeight()
		}
		self.resize = false; // 是否改变大小
		self.bBtn = true; // resize开关
		self.hasCal = false; // 是否重新计算拖拽 or 改变大小
		self.hander = self.hander == 1 ?  jQueryObj : jQueryObj.find(self.hander);

		// 初始化样式
		self.father.css({"position":"relative"});
		// self.dragEl.css({
		// 	"position":"relative",
		// 	// "width" : self.data.elWidth,
		// 	// "height" : self.data.elHeight
		// });
		if(!$.isEmptyObject(self.oriPosition)){
			self.dragEl.css({
				"left" : self.oriPosition.left,
				"top" : self.oriPosition.top
			});
		}
		// self.img.css({
		// 	'display' : 'block',
		// 	'width' : "100%"
		// })

		self.father.children().css({
			'border' : '1px solid transparent',
			// 'margin' : '-1px'
		});
		// 初始化鼠标形状
		self.dragEl.mousemove(function(e){
			// console.log(self.bBtn)
			e.stopPropagation();
			if(self.bBtn){
				
				this_.moveResizeInit(e);
			}
		})
		
		// 鼠标按下
		self.hander.mousedown(function(e){
			e.stopPropagation();
			this_.mouseDownFn(e);
			//鼠标拖动 
			$(document).mousemove(function(e){
				// e.preventDefault()
				this_.mouseMoveFn(e);
			})
			// 鼠标抬起
			$(document).mouseup(function(e){
				// console.log($('#out'))
				e.stopPropagation();
				let Tagdata =this_.props.datas;
				let type = Tagdata.type;
				!self.bBtn&&this_.props.onChangeWidgets(
					this_.getmyposition()
				)
				// self.dragEl.css({"cursor":"move"});

				// console.log(self.data.faWidth)

				self.bBtn = true;

				self.hasCal = false;

				// document.onmousemove = null;
				$(document).unbind('mousemove')
				$(document).unbind('mouseup')
				// document.onmouseup = null;

			})
			return false;
		});

		if(self.supportDelete){
			this_.deleteEl();
		}
	}
	mouseDownFn(e){
		e.stopPropagation();
		var self = this.datas;
		self.data.X = e.pageX;
		self.data.Y = e.pageY;
		self.data.positionX = self.dragEl.position().left;
		self.data.positionY = self.dragEl.position().top;
		self.data.elWidth = self.dragEl.width();
		self.data.elHeight = self.dragEl.height();
		self.bBtn = false;
		if(self.reIndex){
			self.father.children().css({
				'zIndex' : '0'
			});
			self.dragEl.css({
				'zIndex' : '1'
			});
		}
		$('.block').attr('data-choosen','false');
		$('.block').css({
			'border' : '1px solid transparent'
		});
		
		self.dragEl.css({
			'border' : self.border
		});
		if(self.supportDelete){
			// $('.block').attr('data-choosen','false');
			self.dragEl.attr('data-choosen','true');
		}

	}
	mouseMoveFn(e){
		var self = this.datas;
		self.data.sDisX = e.pageX - self.data.xPage;
		self.data.sDisY = e.pageY - self.data.yPage;
		self.data.xPage = e.pageX;
		self.data.yPage = e.pageY;
		self.data.disX = self.data.xPage - self.data.X;
		self.data.disY = self.data.yPage - self.data.Y;
		self.data.moveX = self.data.positionX + self.data.disX;
		self.data.moveY = self.data.positionY + self.data.disY;
		
		if(!self.bBtn && !self.hasCal){ // 判断是拖拽还是改变大小
			var R = self.dragEl.position().left + self.dragEl.width() - 10;
			var B = self.dragEl.position().top + self.dragEl.height() - 10;
			var T = self.dragEl.position().top + 10;
			var L = self.dragEl.position().left + 10; 
			
			if(e.pageX - self.father.offset().left > R && e.pageY - self.father.offset().top > B){ // 右下角
				self.dragEl.css({"cursor":"se-resize"});
				this.datas.resize = 'se'
			}
			else{
				this.datas.resize = false
			}

			this.datas.hasCal = true
		}
		if(!!self.resize  && !self.bBtn){ // 改变大小
			// 等比例拖拽
			this.thisResize(self.resize,e);
		}else 
		if(this.props.moveable&&!self.resize && !self.bBtn){ //其余位置
			if(self.move.toLowerCase() == "x"){
				this.thisXMove();
			}else if(self.move.toLowerCase() == "y"){
				this.thisYMove();
			}else if(self.move.toLowerCase() == 'both'){
				console.log('both')
				this.thisAllMove();
			}
		}
	}
	thisResize(dir,e){
		var self = this.datas;	
		var limit = this.props.datas	
		if(dir == 'se'){
			let newW = self.data.elWidth + self.data.disX;
			let newH = self.data.elHeight + self.data.disY;
			if(newW<limit.maxW&&newW>limit.minW)
				self.dragEl.css({
					"width" : newW,
				});
			if(newH<limit.maxH&&newH>limit.minH){
				self.dragEl.css({
					"height" : newH
				});

			}

		}
		
	}
	moveResizeInit(e){
		var self = this.datas;
		if(self.changeSize){
			var R = self.dragEl.position().left + self.dragEl.width() - 10;
			var B = self.dragEl.position().top + self.dragEl.height() - 10;
			if(e.pageX - self.father.offset().left > R && e.pageY - self.father.offset().top > B){ // 右下角
				self.dragEl.css({"cursor":"se-resize"});
			}
			else{
				self.hander.css({"cursor":"move"});
			}
		}else{
			self.hander.css({"cursor":"move"});
		}			
	}
	thisXMove (){ //x轴移动
		var self = this.datas;
		
		if(!self.bBtn){
			self.dragEl.css({"left":self.data.moveX});
		}else{
			return;
		}
		if(self.restricted){
			if(self.data.moveX < 0){
				self.dragEl.css({"left":"0"});
			}
			if(self.data.moveX > (self.data.faWidth-self.data.elWidth)){
				self.dragEl.css({"left":self.data.faWidth-self.data.elWidth});
			}
		}
	}
	thisYMove(){
		var self = this.datas;
		if(!self.bBtn){
			self.dragEl.css({"top":self.data.moveY});
		}else{
			return;
		}
		if(self.restricted){
			if(self.data.moveY < 0){
				self.dragEl.css({"top":"0"});
			}
			if(self.data.moveY > (self.data.faHeight-self.data.elHeight)){
				self.dragEl.css({"top":self.data.faHeight-self.data.elHeight});
			}
		}
		
	}
	getMyStyleByType(){
		let Tagdata =this.props.datas;
		let type = Tagdata.type;
		let component;
		let posInArray = {
			level:1,
			row:this.props.parentlayerinfo.row,
			col:this.props.parentlayerinfo.col,
		}
		switch (type) {
			case 'button':
				component=getButtonDom(Tagdata);
				break;
			case 'carousel':
				component=getCarouselDom(Tagdata);
				break;
			case 'form':
				component = getFormDom(Tagdata,posInArray);
				break;
			default:
				component=getImageDom(Tagdata);
				break;
		}
		return component;
	}
	thisAllMove(){
		var self = this.datas;

		if(!self.bBtn){
			self.dragEl.css({
				"left":self.data.moveX+"px",
				"top":self.data.moveY+"px"
			});
		}else{
			return;
		}
		if(self.restricted){
			if(self.data.moveX < 0){
				self.dragEl.css({"left":"0"});
			}
			
			if(self.data.moveX > (self.data.faWidth-self.data.elWidth)){
				
				self.dragEl.css({"left":self.data.faWidth-self.data.elWidth});
			}

			if(self.data.moveY < 0){
				self.dragEl.css({"top":"0"});
			}
			if(self.data.moveY > (self.data.faHeight-self.data.elHeight)){
				self.dragEl.css({"top":self.data.faHeight-self.data.elHeight});
			}
		}
	}
	deleteEl(obj){
		var self = this.datas;
		var [row,col]=[this.props.row,this.props.col]
		var this_=this
		document.onkeydown=function(e){
            if (e.keyCode == 46 || e.keyCode == 8){
			   this_.props.onRemoveItem(row,col)
               self.father.find("[data-choosen=true]").remove();
            }
        }
	}
	selectWidget(e){
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		let Tagdata =this.props.datas;
		let type = Tagdata.type;
		console.log(type)

		this.props.onShowSettingStyle({
			setType:type,
			setVisible:true,
			setKey:null
		})
	}

	render() {
		const defaultstyle = this.props.datas
		return (
			<div id={this.props.ikey} 
			className='block'
			onClick={this.selectWidget.bind(this)}
			style={{position:'relative',display:'inline-block',margin:'2px',border:'solid 1px green',
				height:defaultstyle.h,width:defaultstyle.w
			}}>
					{this.getMyStyleByType()}

            </div>
		);
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Dragging);