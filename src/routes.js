import { Switch, Route } from 'react-router-dom';

import { Home, Sequencia1, Sequencia2, Sequencia3 } from './pages';

function Routes() {
  return(
    <Switch>
      <Route path='/' exact component={Home}  />
      <Route path='/seq1' component={Sequencia1}  />
      <Route path='/seq2' component={Sequencia2}  />
      <Route path='/seq3' component={Sequencia3}  />
    </Switch>
  );
}

export default Routes;