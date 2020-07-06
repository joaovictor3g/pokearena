import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Logged from './pages/Logged';
import NewTrainer from './pages/NewTrainer';
import SeePokemonCaughtes from './pages/SeePokemonCaughtes';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/catch/:id" exact component={Logged} />
                <Route path="/sign-up" exact component={NewTrainer} />
                <Route path="/see-your-pokemons/:id" component={SeePokemonCaughtes} />
            </Switch>
        </BrowserRouter>
    )
}
