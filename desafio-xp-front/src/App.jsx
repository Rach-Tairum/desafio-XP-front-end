import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import ListaAcoes from "./pages/ListaAcoes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/acoes" component={ListaAcoes} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
