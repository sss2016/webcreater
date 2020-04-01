import {CHANGE,ADD_LINE,ADD_WIDGET,SELECTROW,SETTINGSHOW,SET_CONTAINNER,SET_Field,SET_PROPERTY} from '../actionType';
import {widgetsChangeHandler,widgetsAddHandler,lineAddHandler,setting_show,propertyChangeHandler} from './handler'
export function layout(
    state={    
            widgets:[]
            ,selection:null,
            setting:{setKey:null,setVisible:false,setType:null},
            currentContainner:{
                level:0,
                row:0,
                col:0
            },
            formFiled:[]
        }
    
    ,action){
    let newwidgets;
    switch (action.type) {
        case CHANGE :
            // console.log('action',action.payload,'state',state)
            // var newstate = [...state]
            newwidgets =widgetsChangeHandler(state.widgets,action.payload,state.currentContainner)
            return {
                widgets:[...newwidgets],
                currentContainner:state.currentContainner,
                selection:state.selection,
            }
        case ADD_WIDGET:
            // console.log('action',action.payload,'state',state)
            newwidgets =widgetsAddHandler(state,action.payload,state.currentContainner)
            // var newstate = [...state]
            return {
                selection:state.selection,
                widgets:[...newwidgets],
                currentContainner:state.currentContainner
            }
        case ADD_LINE:
            console.log('ADD_LINE',state)
            newwidgets= lineAddHandler(state.widgets,state.currentContainner)
            return {
                widgets:[...newwidgets],
                currentContainner:state.currentContainner
            }
        case SELECTROW:
            return {
                selection:action.payload.row,
                widgets:state.widgets,
                setting:{
                    setKey:null,
                    setVisible:true,
                    setType:'row'
                },
                currentContainner:state.currentContainner
            };
        case SETTINGSHOW:
            let setting = setting_show(state.widgets,state.selection,state.currentContainner,action.payload)
            return {
                setting:setting,
                widgets:state.widgets,
                selection:state.selection,
                currentContainner:state.currentContainner
            }
        case SET_CONTAINNER:
            console.log('SET_CONTAINNER',action.payload)
            return Object.assign({},state, {
                currentContainner:action.payload,
            })
        case SET_Field:
            state.formFiled = action.payload
            return {
                setting:state.setting,
                widgets:state.widgets,
                selection:state.selection,
                currentContainner:state.currentContainner,
            }
        case SET_PROPERTY:
            propertyChangeHandler(state,action.payload)
            return {
                setting:state.setting,
                widgets:[...state.widgets],
                selection:state.selection,
                currentContainner:state.currentContainner,
            }
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