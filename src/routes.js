import { Switch, Route } from 'react-router-dom';

import { Home, Sequencia, Jogar, Vencedor, Perdedor } from './pages';

function Routes() {
  return(
    <Switch>
      <Route path='/' exact component={Home}  />
      <Route path='/seq/:fase' component={Sequencia}  />
      <Route path='/jogar/:fase' component={Jogar}  />
      <Route path='/voce-venceu' component={Vencedor}  />
      <Route path='/voce-perdeu' component={Perdedor}  />
    </Switch>
  );
}

export default Routes;