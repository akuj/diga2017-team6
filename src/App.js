import React, { Component } from 'react';
import TodoItem from './components/TodoItem';
import TodoListHeader from './components/TodoListHeader';
import Menu from './components/Menu';
import NewItemInputs from './components/NewItemInputs';


class App extends Component {
  render() {
    const data = [
      {
        description: "Buy chocko",
        dueDate: "22.11.2017",
        type: "shop",
        id: 1
      },
      {
        description: "Learn React",
        dueDate: "1.11.2017",
        type: "learn",
        id: 2
      },
      {
        description: "Read book",
        dueDate: "2.12.2017",
        type: "read",
        id: 3
      }
    ];

    return (
      <div className="container">
        <Menu />
        <TodoListHeader />
        <NewItemInputs showInputs={ false }/>
        {
          data.map(element => <TodoItem description={element.description}
                                        dueDate={element.dueDate} 
                                        type={element.type}
                                        key={element.id} />)
        }
      </div>
    );
  }
}

export default App;
