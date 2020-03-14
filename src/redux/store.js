import {changeLayout,el_add,line_add,row_select,setting_show,containner_set}from './actions'
export function mapDispatchToProps(dispatch){
    return {
        onChangeWidgets:(e)=>dispatch(changeLayout(e)),
        onAddWidgets:(e)=>dispatch(el_add(e)),
        onAddLine:(e)=>dispatch(line_add(e)),
        onSelectRow:(e)=>dispatch(row_select(e)),
        onShowSettingStyle:(e)=>dispatch(setting_show(e)),
        onSetCurrentContainner:(e)=>dispatch(containner_set(e))
    }

};
export function mapStateToProps(state){
    return {
        widgets:state.layout.widgets||[],
        selection:state.layout.selection,
        setting:state.layout.setting,
        currentContainner:state.layout.currentContainner,
    }

};

