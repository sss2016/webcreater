import React from 'react';

const option={
    'button':{w: 100, h: 30, minW: 100, maxW: 200,minH:30,maxH:50,
        configs:{buttonStyle:1,font:''}
    },
    'carousel':{w: 300, h: 200, minW: 300, maxW: 1600,minH:200,maxH:500,
        configs:{buttonStyle:1,font:''}
    },
    'form':{w: 300, h: 400, minW: 300, maxW: 1600,minH:200,maxH:500,
        configs:{buttonStyle:1,font:''},widgets:[]
    },

}
const objsConstruct={
    'button':{style:'',font:''},
    'image':{url:''},
    'runImage':{
        imageURLs:[]
    },
    'text':{backGroundURL:'',font:''}


}
export function getObjectModel(type){


}
export function getWidgetsConfig(type){

    return option[type];
}