import { Router } from 'express';

import pokemonController from './controllers/pokemonController';
import trainerController from './controllers/trainerController';

const routes = Router();

routes.post('/catch', pokemonController.create);

routes.post('/', trainerController.create);
routes.get('/see-your-pokemons/:id', trainerController.show);

export default routes;