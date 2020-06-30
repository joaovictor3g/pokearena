import { Router } from 'express';

import pokemonController from './controllers/pokemonController';
import trainerController from './controllers/trainerController';
import addPokemonToTrainer from './controllers/addPokemonToTrainer';

const routes = Router();

routes.get('/see-all-pokemons', pokemonController.index);
routes.post('/catch-pokemons', pokemonController.create);

routes.post('/', trainerController.create);
routes.get('/see-your-pokemons/:id', trainerController.show);

routes.post('/catch/:id', addPokemonToTrainer.create);
routes.get('/see-pokemons-caught/:id', addPokemonToTrainer.show);

export default routes;