import { Router } from "@reach/router";
import { useState } from "react";
import Main from "./pages/Main";

function App() {
  return (
    <div className="App">
      <Router>
        <Main path="/" />
      </Router>
    </div>
  );
}

export default App;
