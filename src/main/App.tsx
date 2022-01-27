import React from 'react';
import './App.scss';
import {NextCallSidebar} from "./componets/NextCallSidebar/NextCallSidebar";
import {TodoList} from "./componets/Notes/TodoList";


function App() {
    return (
        <div className="App">
            <div className="container">
                <div className='main-wrapper'>
                    <NextCallSidebar/>
                    <TodoList/>
                </div>
            </div>
        </div>
    );
}

export default App;