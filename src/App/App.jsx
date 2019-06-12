import React from 'react'
import 'antd/dist/antd.css'
import { Comment, Avatar, Form, Button, List, Input } from 'antd'
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
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" >
        留言
      </Button>
    </Form.Item>
  </div>
)

/*const useLocalStorge = localStorageKey => {
  const [value,setValue]=React.useState(
    localStorage.getItem(localStorageKey) || ''
  )
  React.useEffect(()=> {
    localStorage.setItem(localStorageKey,value)
  },[value])
  return [value, setValue]
}
*/

export class App extends React.Component {
  state = {
    comments: [],
    submitting: false,
    name: '',
    value: ''
  };
  
  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
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

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  handleNameChange = e => {
    this.setState({
      name: e.target.value
    })
  }
  render() {
    const { comments, submitting, name, value } = this.state;
   /* const [valueLocal, setValue] = useLocalStorge(
      this.handleNameChange
    )
    */
    //console.log(valueLocal)

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
