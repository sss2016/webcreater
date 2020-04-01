import React from "react";
import {mapDispatchToProps,mapStateToProps} from '../../redux/store'
import {connect} from 'react-redux';
import {UploadImage,PicturesWall} from '../UploadImage/view'
class CarouselPanel extends React.Component {
    constructor(props) {
        super(props);
    }

  render() {

    return (
        <div>
            <p>设置图片</p>
            <PicturesWall></PicturesWall>
        </div>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(CarouselPanel);
