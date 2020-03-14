import React, { Component } from 'react';
import {mapDispatchToProps,mapStateToProps} from '../../redux/store'
import Containner from '../Dragging/container'
import _ from "lodash";
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
class IForm extends Component {
    render() {

        return (
            <Containner layerinfo={this.props.layerinfo} >

            </Containner>
        );

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(IForm);