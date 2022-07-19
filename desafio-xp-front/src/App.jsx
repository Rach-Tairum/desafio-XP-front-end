/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import ListaAcoes from './pages/ListaAcoes';
import NegociaAcao from './pages/NegociaAcao';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/acoes" component={ListaAcoes} />
          <Route path="/negociacao" component={NegociaAcao} />
          <Route path="/unauthorized" component={Unauthorized} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
