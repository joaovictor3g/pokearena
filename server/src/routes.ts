import { Router } from 'express';

import pokemonController from './controllers/pokemonController';
import trainerController from './controllers/trainerController';
import addPokemonToTrainer from './controllers/addPokemonToTrainer';
import addAbility from './controllers/addAbility';
import typeController from './controllers/typeController';

const routes = Router();

// Rotas dos Pokemons
routes.get('/see-all-pokemons', pokemonController.index);
routes.post('/catch-pokemons', pokemonController.create);

// Rotas dos Treinadores
routes.post('/', trainerController.create);
routes.get('/see-your-pokemons/:id', trainerController.show);
routes.post('/login', trainerController.signIn);
routes.delete('/delete/:id_trainer', trainerController.deletePokemon);

// Add Pokemon to trainer route
routes.post('/catch/:id', addPokemonToTrainer.create);
routes.get('/see-pokemons-caught/:id', addPokemonToTrainer.show);

routes.get('/see-infos/:id_pokemon', addAbility.create);
routes.get('/see-pokemon-infos/:id_pokemon', addAbility.index);

routes.get('/add-types/:id_pokemon', typeController.create);

export default routes;