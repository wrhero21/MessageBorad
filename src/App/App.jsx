import React from 'react'
import 'antd/dist/antd.css'
import { Comment, Form, Button, List, Input } from 'antd'
import moment from 'moment';
import './styles/App.css'

const { TextArea } = Input

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
)
const Editor = ({ onChange,onChangeName, onSubmit, submitting, name, value }) => (
  <div>
    <Form.Item>
      <Input type="text" size="large" onChange={onChangeName} value={name} placeholder="請輸入名稱..." />       
      <TextArea rows={4} onChange={onChange} value={value} placeholder="請輸入留言..." />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" >留言</Button>
    </Form.Item>
  </div>
)

export class App extends React.Component {
  state = {
    comments: [],
    submitting: false,
    name: '',
    value: ''
  }
  
  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    })

    const useLocalStorge = (key, value) =>{
      const reKey = localStorage.getItem(key)
      const keyObj = reKey ? reKey + ',' + value : value
      const setLocalStorge = localStorage.setItem(key,keyObj)
      return setLocalStorge
    }
    

    setTimeout(() => {
     const authorNew = useLocalStorge('author',this.state.name)
      const commentsNew = useLocalStorge('comments',this.state.value)
      const datetimeNew = useLocalStorge('datetime',moment().fromNow())
    /* 

     
      const authorL = localStorage.getItem('author')
      const authorObj = authorL ? authorL + "," + this.state.name : this.state.name
      const commentsL = localStorage.getItem('comments')
      const commentsObj = commentsL ? commentsL + "," + this.state.value : this.state.value
      const datetimeL = localStorage.getItem('datetime')
      const datetimeObj = datetimeL ? datetimeL + "," + moment().fromNow() : moment().fromNow()
      console.log('=====setTime()======')
      console.log('authorL:',authorL)
      console.log('authorObj:',authorObj)
      console.log('commentsL:',commentsL)
      console.log('commentsObj',commentsObj)
      console.log('datetimeL',datetimeL)
      console.log('datetimeObj',datetimeObj)
    

      console.log(JSON.stringify(this.state.comments));
      
      localStorage.setItem('author', authorNew)
      localStorage.setItem('comments', commentsNew)
      localStorage.setItem('datetime', datetimeNew)
    */

      this.setState({
        submitting: false,
        name: '',
        value: '',
        comments: [
          {
            author: <p>{this.state.name}</p>,
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    })
  }
  handleChange = e => {
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    const author = localStorage.getItem('author') ? localStorage.getItem('author').split(',') : []
    const comment = localStorage.getItem('comments') ? localStorage.getItem('comments').split(',') : []
    const datetime = localStorage.getItem('datetime') ? localStorage.getItem('datetime').split(',') : []
   // console.log('====renfer()===')
   // console.log('comments.length=',this.state.comments.length)
   // console.log('submit.value:',this.state.submitting)
   // console.log('author:',author)
   // console.log('comment:',comment)
   // console.log('==============')
    if(this.state.comments.length < 1) {
      author.forEach( (value, index) => {
        console.log('value = ' + value)
        console.log('index = ' + index) 
        this.state.comments = [
          {
            author: <p>{value}</p>,
            content: <p>{comment[index]}</p>,
            datetime: datetime[index],
          },
          ...this.state.comments,
        ]
      });
    }
    const { comments, submitting, name, value } = this.state;
    return (
      <div>
        <header>
          <h1>Messageborad</h1>
        </header>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          content={
            <Editor
              onChangeName={this.handleNameChange}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              name={name}
              value={value}
            />
          }
        />
      </div>
    );
  }
}
