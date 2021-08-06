import { Switch, Route } from 'react-router-dom';

import { Home, Sequencia, Jogar, Fim } from './pages';

function Routes() {
  return(
    <Switch>
      <Route path='/' exact component={Home}  />
      <Route path='/seq/:fase' component={Sequencia}  />
      <Route path='/jogar/:fase' component={Jogar}  />
      <Route path='/fim' component={Fim}  />
    </Switch>
  );
}

export default Routes;