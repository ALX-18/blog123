
import './App.css';
import {Auth} from "./components/auth";
import React from 'react';
import CreateArticle from "./components/CreateArticle.jsx";
function App() {
    return (
        <div className="App">
            <Auth/>
            <CreateArticle/>
        </div>
    );
}

export default App;
