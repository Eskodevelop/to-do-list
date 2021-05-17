import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";


class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {

            var items = JSON.parse(localStorage.getItem("todos") || "[]");
          
        this.setState({items});
    }
    

    addItem(e) {
        if (this._inputElement.value !== "") {
            var newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };

            
           this.setState({
               items: [newItem, ...this.state.items]
           }, () => {

            localStorage.setItem("todos", JSON.stringify(this.state.items));
           })
        
          
      
        }

        this._inputElement.value = "";

        

        e.preventDefault();
    }

    deleteItem(key) {
       


        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key)
        });
        localStorage.setItem("todos", JSON.stringify(filteredItems));
        this.setState({
            items: filteredItems
        });

    }

    render() {
        return (
            <div className="todoListMain">
                <div className="header">
                    <div id="head">THINGS TO DO</div>
                    <div className="form">
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this._inputElement = a}
                            placeholder="Enter your task..." required>

                        </input>
                        <button type="submit">Add</button>
                    </form>
                    </div>
                </div>
                <TodoItems entries={this.state.items}
                    delete={this.deleteItem} />

            </div>
        );

    }
}

export default TodoList;