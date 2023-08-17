import { Request, Response } from 'express';
import { badRequest, internalServerError, validateNumber, notFound, ok } from '../services/util';
import { Serie, serieModel } from '../models/serie';

const insertSerie = (req: Request, res: Response) => {

    {
        const serie = req.body;
        if (!serie)
            return badRequest(res, "serie inválida");

        if (!serie.nome)
            return badRequest(res, 'Informe o nome da serie');

        if (!serie.descricao)
            return badRequest(res, 'Informe a descrição da serie');

        if (!serie.temporada)
            return badRequest(res, 'Informe a quantidade de temporadas da série');

        if (!serie.episodios)
            return badRequest(res, 'Informe a quantidade de episódios da série');

    
    }

    const serie = req.body as Serie;
    return serieModel.insertSerie(serie)
        .then(serie => {
            res.json(serie);
        })
        .catch(err => internalServerError(res, err));
}


const updateSerie = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const serie = req.body;
        if (!serie)
            return badRequest(res, "Serie inválida");

        if (!serie.nome)
            return badRequest(res, 'Informe o nome da serie');

        if (!serie.descricao)
            return badRequest(res, 'Informe a descrição da serie');

        if (!serie.temporada)
            return badRequest(res, 'Informe a quantidade de temporadas da série');

        if (!serie.episodios)
            return badRequest(res, 'Informe a quantidade de episódios da série');

        const serieSaved = await serieModel.getSerie(id);
        if(!serieSaved)
            return notFound(res);

    }

    const serie = req.body as Serie;
    return serieModel.updateSerie({...serie, id})
        .then(serie => {
            res.json(serie)
        })
        .catch(err => internalServerError(res, err));
}


const listSeries = ({}: Request, res: Response) => {
    serieModel.listSeries()
        .then(serie => {
            res.json(serie)
        })
        .catch(err => internalServerError(res, err));
}

const getSerie = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    return serieModel.getSerie(id)
        .then((serie) => {
            if(serie)
                return res.json(serie);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const deleteSerie = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const serieSaved = await serieModel.getSerie(id);
        if(!serieSaved)
            return notFound(res);
    }

    return serieModel.deleteSerie(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
}

export const serieController = {
    insertSerie,
    listSeries,
    getSerie,
    deleteSerie,
    updateSerie
}