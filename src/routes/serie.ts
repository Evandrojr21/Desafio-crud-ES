import { Router } from 'express';
import { serieController} from '../controllers/serie';

const serieRouter = Router();
serieRouter.get('/', serieController.listSeries);
serieRouter.post('/', serieController.insertSerie);
serieRouter.get('/:id', serieController.getSerie);
serieRouter.put('/:id', serieController.updateSerie);
serieRouter.delete('/:id', serieController.deleteSerie);

export { 
    serieRouter,
}