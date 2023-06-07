import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../sharedComponents/Header";
import { Articles } from "../components/Articles";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Articles/>} />
          <Route>404 Not Found!</Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
