import React from 'react';
const option={
    'button':{
       'name':'button',
       'ON':false,
       'color':['red','green'],
       'content':'默认按钮',
    },
    'text':{
        'name':'text',
        'ON':false,
        'color':['red','green'],
        'content':'请输入内容',
    }

}
export function getMenuConfig(type){

    return option[type];
}