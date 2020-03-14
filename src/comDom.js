import { Layout,Button,Icon,Form} from 'antd';
import IForm from './components/IForm/view'
import React from 'react';
import { Carousel } from 'antd';
import './index.css';

// import Container from "./components/Container/view";
const buttonStyle=[
    'primary',
    'default',
    'dashed',
    'danger',
    'link'
];
export function getButtonDom(styles){
    console.log(buttonStyle[styles.buttonStyle])

    return (
        
        <Button type={buttonStyle[styles.buttonStyle]}  style={{width: '100%',height:'100%'}}>{styles.buttonName||'default'}</Button>
    );
}
export function getImageDom(styles){
    return (
        <div   style={{width: '100%',height:'100%',backgroundColor:'#eee'}}>容器</div>
    );
}
// export function getImageDom(styles){
//     return (
//         <div   style={{width: '100%',height:'100%',backgroundColor:'#eee'}}>容器</div>
//     );
// }
export function getFormDom(styles,layerinfo){
    console.log('layerinfo',layerinfo)
    return (
        <IForm  layerinfo={layerinfo}  style={{width: '100%',height:'100%'}}>表单</IForm>
    );
}
export function getCarouselDom(styles){
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