import React from 'react'
import 'antd/dist/antd.css'
import { Comment, Form, Button, List, Input } from 'antd'
import moment from 'moment'
import './styles/App.scss'

const { TextArea } = Input
//留言區域的顯示
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
)
//輸入留言的地方
const Editor = ({ onChange,onChangeName, onSubmit, submitting, name, value }) => (
  <div >
    <Form.Item>
      <Input type="text" size="large" onChange={onChangeName} value={name} placeholder="請輸入名稱..." />       
      <TextArea rows={4} onChange={onChange} value={value} placeholder="請輸入留言..." />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" style={{ marginTop: 20 }} >留言</Button>
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
    if (!this.state.value || !this.state.name) {
      return alert("請輸入名稱和留言!")
    }

    this.setState({
      submitting: true,
    })

    setTimeout(() => {
      
      let dataObj = {'author' : this.state.name, 'comment': this.state.value, 'datetime': moment().format('YYYY-MM-DD HH:mm:ss')}
      let localData = localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : []
      localData.length > 0 ? localData[localData.length] = dataObj  : localData = [ dataObj ]
    
      localStorage.setItem('comments', JSON.stringify(localData))

      this.setState({
        submitting: false,
        name: '',
        value: '',
        comments: [
          {
            author: <p>{this.state.name}</p>,
            content: <p>{this.state.value}</p>,
            datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
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

    const commentL = localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : []
    
    if(this.state.comments.length < 1) {
      commentL.forEach( (value, index) => {
        this.state.comments = [
          {
            author: <p>{value.author}</p>,
            content: <p>{value.comment}</p>,
            datetime: value.datetime,
          },
          ...this.state.comments,
        ]
      })
    }   
    
    const { comments, submitting, name, value } = this.state;
    return (
      <div>
        <header className='header'>
          <h1>Messageborad</h1>
        </header>
        {comments.length > 0 && <CommentList comments={comments} />}
        <div className='editor'>
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
        
      </div>
    );
  }
}
