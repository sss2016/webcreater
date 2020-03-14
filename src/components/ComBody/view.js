
//未使用
export default class DragLayout extends PureComponent {


    render(){
         return(  
         <Content style={{ marginTop: 44,width:'100%',height:100,flexDirection:"row",display:'flex' }}>
            
            <div style={{width:'18%',backgroundColor: '#001529'}}>
            <Collapse defaultActiveKey={['1']} onChange={callback}>
                    <Panel header="基础组件" key="1">
                        <Button type="dashed" style={{'marginRight':'7px'}} onClick={this.addChart.bind(this,'button')}>按钮</Button>
                        <Button type="dashed" style={{'marginRight':'7px'}} onClick={this.addChart.bind(this,'image')}>图片</Button>
                        <Button type="dashed" style={{'marginRight':'7px'}} onClick={this.addChart.bind(this,'word')}>文字</Button>
                    </Panel>
                    <Panel header="表单" key="2">
                    <p>{text}</p>
                    </Panel>
                    <Panel header="展示" key="3" >
                        <Button type="dashed" style={{'marginRight':'7px'}} onClick={this.addChart.bind(this,'carousel')}>轮播图</Button>
                    </Panel>
            </Collapse>
            </div>
         </Content>) ;
    }
}