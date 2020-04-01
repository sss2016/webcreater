import React from 'react';
import AppBody from './components/layouts/body';
import DesignMan from './datashow/myDesign';
import IMQQ from './components/IMQQ/view'
import { HashRouter, Route, Switch } from 'react-router-dom'

export default class RouteTable extends React.Component{
    render(){
        let createHashHistory =require("history").createHashHistory
        const hashHistory = new createHashHistory();
        console.log('this.props.c_history',this.props.c_history)
        // hashHistory.push(this.props.c_history)
        return(
            <HashRouter history={hashHistory}>
                <Switch>
                    <Route path='/a' exact component={AppBody}/>   
                    <Route path='/mydesign' exact component={DesignMan}/> 
                    <Route path='/myim' exact component={IMQQ}/> 
                </Switch>
            </HashRouter>
        )
    }  
}