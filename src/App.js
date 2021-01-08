import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Start from "./components/startPage/Start";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Questions from "./components/questionPage/Questions";
import Result from "./components/resultPage/Result";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Start} />
        <Route path="/questions/:id" component={Questions} />
        <Route path="/result/:id" component={Result} />
      </Router>
    </div>
  );
}

export default App;
