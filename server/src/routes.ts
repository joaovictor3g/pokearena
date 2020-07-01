import { Router } from 'express';

import pokemonController from './controllers/pokemonController';
import trainerController from './controllers/trainerController';
import addPokemonToTrainer from './controllers/addPokemonToTrainer';
import addAbility from './controllers/addAbility';

const routes = Router();

// Rotas dos Pokemons
routes.get('/see-all-pokemons', pokemonController.index);
routes.post('/catch-pokemons', pokemonController.create);

// Rotas dos Treinadores
routes.post('/', trainerController.create);
routes.get('/see-your-pokemons/:id', trainerController.show);

// Add Pokemon to trainer route
routes.post('/catch/:id', addPokemonToTrainer.create);
routes.get('/see-pokemons-caught/:id', addPokemonToTrainer.show);

routes.get('/see-infos/:id_trainer', addAbility.create);


export default routes;