import { createRef, useEffect, useState } from "react";
import Home from "./components/Home";
import Main from "./pages/Main";

function App() {
  return (
    <div className="App">
      <main className="App-header">
        <div className="main-container">
            <Main />
        </div>
      </main>
    </div>
  );
}

export default App;
