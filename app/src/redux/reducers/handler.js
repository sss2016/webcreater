import {getWidgetsConfig} from '../../configs/comconfig';
export function widgetsChangeHandler(oldWidgets,data){
    var newarr = oldWidgets;
    var layerInfo = data.layerinfo;
    console.log('widgetsChangeHandler',layerInfo)
    if(layerInfo&&layerInfo.level==1){
      newarr[layerInfo.row].cols[layerInfo.col].widgets[data.row].cols[data.col].id = data.newcol.id;
      newarr[layerInfo.row].cols[layerInfo.col].widgets[data.row].cols[data.col].layout=data.newcol.layout
      newarr[layerInfo.row].cols[layerInfo.col].widgets[data.row].cols[data.col].configs.name=data.newcol.formname
    }else{
      newarr[data.row].cols[data.col].id = data.newcol.id;
      newarr[data.row].cols[data.col].layout=data.newcol.layout
    }
    return newarr
}
export function propertyChangeHandler(state,configs){
  var newarr = state.widgets;
  var layerInfo = state.currentContainner;
  var setobj = state.setting.setobjInfo;
  if(layerInfo&&layerInfo.level==1){
    
    if(setobj){
      newarr[layerInfo.row].cols[layerInfo.col].widgets[setobj.row].cols[setobj.col].configs =configs
      console.log('更新configs',newarr[layerInfo.row].cols[layerInfo.col].widgets[setobj.row])
    }
  }else{
    if(setobj)
      newarr[layerInfo.row].cols[layerInfo.col].configs=configs
    else{
      newarr[state.selection].configs=configs
      
    }
  }
  return newarr
}
export function widgetsAddHandler(state,type,layerInfo){
    let newcol = {};
    let additem  = getWidgetsConfig(type)
    let data = state.widgets;
    newcol.type = type;
    newcol=Object.assign(newcol,additem)
    if(layerInfo&&layerInfo.level==1){

        data[layerInfo.row].cols[layerInfo.col].widgets[state.selection].cols.push(newcol)
      }else{
        data[state.selection].cols.push(newcol)
      }
    return data;
}

export function lineAddHandler(oldWidgets,layerInfo){
    let newrow =   {
          name:'line3',
          cols:[],
      }
      if(layerInfo&&layerInfo.level==1){
        oldWidgets[layerInfo.row].cols[layerInfo.col].widgets.push(newrow)
      }else{
        oldWidgets.push(newrow)
      }
        
      return oldWidgets;
  }
  export function setting_show(oldWidgets,selection,layerInfo,data){
    console.log(oldWidgets[layerInfo.row].cols)
    let configs=oldWidgets[layerInfo.row].cols[layerInfo.col].configs
    if(layerInfo.level==1&&data.setType!='form')
      configs= oldWidgets[layerInfo.row].cols[layerInfo.col].widgets[data.setobjInfo.row].cols[data.setobjInfo.col].configs

    return{
        setType:data.setType,
        setVisible:data.setVisible,
        setobjInfo:data.setobjInfo,
        configs:configs
    }
  }