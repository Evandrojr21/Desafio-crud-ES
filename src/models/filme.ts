
import { dbQuery, dbQueryFirst} from "../services/db"

export type Filme = {
    id: number;
    nome:string; 
    descricao: string;
}


const insertFilme = async (filme: Filme) => {
    await dbQuery(`INSERT INTO filme (nome,descricao) VALUES(?, ?)`, [filme.nome,filme.descricao])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  name = 'filme'`);
    return getFilme(retorno[0].id);
}

const updateFilme = async (filme: Filme) => {
    console.log(filme)
    await dbQuery(`UPDATE filme SET nome = ?, descricao = ? WHERE id = ?`, [filme.nome,filme.descricao,filme.id])
    return getFilme(filme.id);
}

const listFilmes = async () => {
    const retorno = await dbQuery(`SELECT * FROM filme`);
    return retorno as Filme[];
}

const getFilme = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM filme WHERE id = ?`, [id]);
    return retorno as Filme;
}

const deleteFilme = async (id: number) => {
    await dbQueryFirst(`DELETE FROM filme WHERE id = ?`, [id]);
}



export const filmeModel ={
    insertFilme,
    listFilmes,
    getFilme,
    deleteFilme,
    updateFilme
}