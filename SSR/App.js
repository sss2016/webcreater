import React from 'react';
import Generetor from '../app/src/components/Dragging/generator';
class App extends React.Component {
  render(){
    return (
        <Generetor  datas={this.props.datas}>
            

        </Generetor>

    );
    }
}
export default App;