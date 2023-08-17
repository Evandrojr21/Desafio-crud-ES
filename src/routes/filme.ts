import { Router } from 'express';
import { filmeController} from '../controllers/filme';

const filmeRouter = Router();
filmeRouter.get('/', filmeController.listFilmes);
filmeRouter.post('/', filmeController.insertFilme);
filmeRouter.get('/:id', filmeController.getFilme);
filmeRouter.put('/:id', filmeController.updateFilme);
filmeRouter.delete('/:id', filmeController.deleteFilme);

export { 
    filmeRouter,
}