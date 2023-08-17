
import { dbQuery, dbQueryFirst} from "../services/db"

export type Serie = {
    id: number;
    nome:string; 
    descricao: string;
    temporada: number;
    episodios: number;
}


const insertSerie = async (serie: Serie) => {
    await dbQuery(`INSERT INTO serie (nome,descricao,temporada,episodios) VALUES(?, ?, ?, ?)`, [serie.nome,serie.descricao,serie.temporada,serie.episodios])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  name = 'serie'`);
    return getSerie(retorno[0].id);
}

const updateSerie = async (serie: Serie) => {
    console.log(serie)
    await dbQuery(`UPDATE serie SET nome = ?, descricao = ? ,temporada = ? , episodios = ?WHERE id = ?`, [serie.nome,serie.descricao,serie.temporada,serie.episodios,serie.id])
    return getSerie(serie.id);
}

const listSeries = async () => {
    const retorno = await dbQuery(`SELECT * FROM serie`);
    return retorno as Serie[];
}

const getSerie = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM serie WHERE id = ?`, [id]);
    return retorno as Serie;
}

const deleteSerie = async (id: number) => {
    await dbQueryFirst(`DELETE FROM serie WHERE id = ?`, [id]);
}



export const serieModel ={
    insertSerie,
    listSeries,
    getSerie,
    deleteSerie,
    updateSerie
}