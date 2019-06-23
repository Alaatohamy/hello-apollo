import React, { Component } from 'react';
import { Comment, Tooltip, List, Button, Input, Form } from 'antd';
import moment from 'moment';
import { Query } from 'react-apollo';
import 'antd/dist/antd.css';
import { AllPosts } from '../../services';

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

class PostView extends Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
  };

  generateData = (props) => {
    return props.loading? [] : 
      props.allPosts[0].Comments.map(comment => 
        {return (
          {
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            author: `${comment.id}`,
            content: (<p style={{textAlign: 'left'}}>{comment.body}</p>),
            datetime: 
              <Tooltip
                title={moment(`${comment.date}`, 'HH:mm:ss').format('HH:mm:ss')}
              >
                <span>{moment(`${comment.date}`, 'HH:mm:ss').format('hh:mm a')}</span>
              </Tooltip>
          }
        )
      });
  }

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
        value: '',
        comments: [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
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
  
  render() {
    console.log('props', this.props);
    const { loading, error } = this.props;
    const data = this.generateData(this.props);
    return (
      (error)? <p>{error}</p> :
      (loading) ? <p>..loading</p> :
      <List
        className="comment-list"
        header={`${data.length} comments`}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <li>
            <Comment
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
        )}
      />
    );
  }
}

const Post = props => (
  <Query query={AllPosts}>
    {
      ({error, loading, data}) => {
        return <PostView 
          loading={loading}
          error={error}
          allPosts={data.allPosts}
        />
      }
    }
  </Query>
);

export default Post;