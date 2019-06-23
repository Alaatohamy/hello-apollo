import React, { Component } from 'react';

class List extends Component {
  state = {
    items: ['Test1', 'Test2'],
  };

  render() {
    const { items } = this.state;
    return (
      <div>
        <h1>My List</h1>
        <ul>
          {
            items.map(item => <li>{item}</li>)
          }
        </ul>
      </div>
    )
  }
}

export default List;