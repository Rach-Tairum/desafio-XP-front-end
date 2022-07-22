/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import ListaAcoes from './pages/ListaAcoes';
import NegociaAcao from './pages/NegociaAcao';
import Unauthorized from './pages/Unauthorized';
import CarteiraDigital from './pages/CarteiraDigital';

import GlobalStyles from './assets/styles/global';
import Provider from './context/Provider';

function App() {
  return (
    <div>
      <Provider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/acoes" component={ListaAcoes} />
            <Route path="/negociacao" component={NegociaAcao} />
            <Route path="/carteira" component={CarteiraDigital} />
            <Route path="/unauthorized" component={Unauthorized} />
          </Switch>
          <GlobalStyles />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
