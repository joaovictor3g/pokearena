import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import pokemonController from './controllers/pokemonController';
import trainerController from './controllers/trainerController';
import addPokemonToTrainer from './controllers/addPokemonToTrainer';
import addAbility from './controllers/addAbility';
import typeController from './controllers/typeController';
import logController from './controllers/logController';

const routes = Router();
const upload = multer(multerConfig);

// Rotas dos Pokemons
routes.get('/see-all-pokemons', pokemonController.index);
routes.post('/catch-pokemons', pokemonController.create);

// Rotas dos Treinadores
routes.post('/', trainerController.create);
routes.post('/edit-profile/:id', upload.single('image'), trainerController.addImageProfile);
routes.get('/see-your-pokemons/:id', trainerController.show);
routes.post('/login',trainerController.signIn);
routes.delete('/delete', trainerController.deletePokemon);
routes.put('/forgot-password', trainerController.updatePassword);
routes.get('/get-all-infos/:id', trainerController.getAllInfos);
routes.get('/get-all-trainers', trainerController.returnAllTrainers);

// Add Pokemon to trainer route
routes.post('/catch/:id', addPokemonToTrainer.create);
routes.get('/see-pokemons-caught/:id', addPokemonToTrainer.show);
routes.put('/update-pokemon', addPokemonToTrainer.updateName);

routes.get('/see-infos/:id_pokemon', addAbility.create);
routes.get('/see-pokemon-infos/:id_pokemon', addAbility.index);

routes.get('/add-types/:id_pokemon', typeController.create);

routes.get('/changelog', logController.index);

export default routes;