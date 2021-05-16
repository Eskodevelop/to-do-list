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
        const items = [];

        for (let [key, value] of Object.entries(localStorage)) {
            var item = {
                text: value,
                key: key
            };
            items.push(item);
        }
        this.setState({items});
    }
    

    addItem(e) {
        if (this._inputElement.value !== "") {
            var newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };

            localStorage.setItem(newItem.key, newItem.text);
           this.setState({
               items: [newItem, ...this.state.items]
           })

        }

        this._inputElement.value = "";

        

        e.preventDefault();
    }

    deleteItem(key) {
       
       localStorage.removeItem(key);

        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key)
        });

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
                            placeholder="Enter your task...">

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