import {CHANGE,ADD_LINE,ADD_WIDGET,SELECTROW,SETTINGSHOW,SET_CONTAINNER} from '../actionType';
import {widgetsChangeHandler,widgetsAddHandler,lineAddHandler,setting_show} from './handler'
export function layout(
    state={    
            widgets:[]
            ,selection:null,
            setting:{setKey:null,setVisible:false,setType:null},
            currentContainner:{
                level:0,
                row:0,
                col:0
            }
        }
    
    ,action){
    let newwidgets;
    switch (action.type) {
        case CHANGE :
            // console.log('action',action.payload,'state',state)
            // var newstate = [...state]
            newwidgets =widgetsChangeHandler(state.widgets,action.payload,state.currentContainner)
            return {
                widgets:newwidgets,
            }
        case ADD_WIDGET:
            // console.log('action',action.payload,'state',state)
            newwidgets =widgetsAddHandler(state,action.payload,state.currentContainner)
            // var newstate = [...state]
            return {
                widgets:newwidgets,
            }
        case ADD_LINE:
            newwidgets= lineAddHandler(state.widgets,state.currentContainner)
            return {
                widgets:newwidgets,
            }
        case SELECTROW:
            return {
                selection:action.payload.row,
                widgets:state.widgets,
                setting:{
                    setKey:null,
                    setVisible:true,
                    setType:'row'
                }
            };
        case SETTINGSHOW:
            let setting = setting_show(action.payload)
            return {
                setting:setting,
                widgets:state.widgets,
                selection:state.selection
            }
        case SET_CONTAINNER:
            console.log('SET_CONTAINNER',action.payload)
            return Object.assign({},state, {
                currentContainner:action.payload,
            })
        default:
            return state;
    }
}

export function message(state={},action){
    switch (action.type) {
        case 'RECEIVE':
            // var newstate = [...state]
        return state;
    
        default:
            return state;
    }
}