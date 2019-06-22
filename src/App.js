import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Users from "./Components/Users/Users";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={Users} />
      </div>
    </BrowserRouter>
  );
}

export default App;
