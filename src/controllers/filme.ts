import { Request, Response } from 'express';
import { badRequest, internalServerError, validateNumber, notFound, ok } from '../services/util';
import { Filme, filmeModel } from '../models/filme';

const insertFilme = (req: Request, res: Response) => {

    {
        const filme = req.body;
        if (!filme)
            return badRequest(res, "filme inválido");

        if (!filme.nome)
            return badRequest(res, 'Informe o nome do filme');

        if (!filme.descricao)
            return badRequest(res, 'Informe a descrição do filme');
    
    }

    const filme = req.body as Filme;
    return filmeModel.insertFilme(filme)
        .then(filme => {
            res.json(filme);
        })
        .catch(err => internalServerError(res, err));
}


const updateFilme = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const filme = req.body;
        if (!filme)
            return badRequest(res, "Filme inválido");

        if (!filme.nome)
            return badRequest(res, 'Informe o nome do filme');

        if (!filme.descricao)
            return badRequest(res, 'Informe a descrição do filme');

        const filmeSaved = await filmeModel.getFilme(id);
        if(!filmeSaved)
            return notFound(res);
    }

    const filme = req.body as Filme;
    return filmeModel.updateFilme({...filme, id})
        .then(filme => {
            res.json(filme)
        })
        .catch(err => internalServerError(res, err));
}


const listFilmes = ({}: Request, res: Response) => {
    filmeModel.listFilmes()
        .then(filme => {
            res.json(filme)
        })
        .catch(err => internalServerError(res, err));
}

const getFilme = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    return filmeModel.getFilme(id)
        .then((filme) => {
            if(filme)
                return res.json(filme);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const deleteFilme = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const filmeSaved = await filmeModel.getFilme(id);
        if(!filmeSaved)
            return notFound(res);
    }

    return filmeModel.deleteFilme(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
}

export const filmeController = {
    insertFilme,
    listFilmes,
    getFilme,
    deleteFilme,
    updateFilme
}