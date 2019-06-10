import React from 'react';
import './styles/App.css';
import 'antd/dist/antd.css';

const { TextArea } = Input

class Message extends React.Component{
    render(){
        let divStyle={marginBottom:20}
        let messageStyle={marginLeft:20}
        return (
            <div style={divStyle}>
            //把data傳傳進來後回傳
            <div>{this.props.name}說：</div>
            <div style={messageStyle}>{this.props.message}</div>
            </div>
        )
    }
}

class MessageBlock extends React.Component{
    render(){
        //用map迴圈把留言資料用props傳進Message組件，再指定給message
        let message = this.props.messageDate.map((item) => {
            return <Message key={item.id} name={item.name} message={item.message} />
        })
        return (
            <div>
                {/*回傳放留言資料的message變數*/}
                {message}
            </div>
        )
    }

}

let date = [
  {id:'1',name:'aa',message:'嗨！大家今天過得好嗎！'},
  {id:'2',name:'bb',message:'not bad!'},
  {id:'3',name:'cc',message:'我過得還不錯'},
  {id:'4',name:'aa',message:'do you finish homework ?'},
  {id:'5',name:'bb',message:'還沒，你呢？'},]


export const App = () => {
  return (
    <div>
      /*透過this.props將data傳入MessageBlock處理 */
      <MessageBlock messageDate={this.props.messageDate}/>
    </div>
  );
}


ReactDOM.render(<App messageDate = {date} />
  ,document.getElementById('root'))



