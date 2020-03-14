import {getWidgetsConfig} from '../../comconfig';
export function widgetsChangeHandler(oldWidgets,data){
    var newarr = oldWidgets;
    newarr[data.row].cols[data.col].id = data.newcol.id;
    newarr[data.row].cols[data.col].layout=data.newcol.layout
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
      console.log('line3333',layerInfo)
      if(layerInfo&&layerInfo.level==1){
        oldWidgets[layerInfo.row].cols[layerInfo.col].widgets.push(newrow)
      }else{
        oldWidgets.push(newrow)
      }
        
      return oldWidgets;
  }
  export function setting_show(data){
    return{
        setType:data.setType,
        setKey:data.setKey,
        setVisible:data.setVisible
    }
  }