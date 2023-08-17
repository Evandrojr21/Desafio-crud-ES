const request = require('supertest') 
const app = require('../app') 
const { filmeModel } = require('../models/filme')

const filmeModel = require('./filme') 

describe('inserirFilme', () => {

  it('deve inserir um novo filme', async () => {
    const novoFilme = {
      nome: 'Novo Filme',
      descricao: 'filme bom'
    }

    await filmeModel.insertFilme(novoFilme)

    const filmes = await filmeModel.listFilmes()

    expect(filmes).toContainEqual(novoFilme)
  })

})

describe('listFilmes', () => {

  it('deve retornar uma lista de filmes', async () => {
    const filmes = await filmeModel.listFilmes()

    expect(filmes).toBeInstanceOf(Array)
    expect(filmes).toHaveLength(2) // supondo já ter 2 filmes
  })

})


describe('getFilme', () => {

  it('deve retornar um filme por id', async () => {
    const filme = await filmeModel.getFilme(1)

    expect(filme).toMatchObject({
      id: 1,
      nome: 'Filme 1' 
    })
  })

})

describe('updateFilme', () => {

  it('deve atualizar os dados de um filme', async () => {
    const filme = await filmeModel.getFilme(1)
    filme.nome = 'Novo Nome'

    await filmeModel.updateFilme(filme)

    const updated = await filmeModel.getFilme(1)
    expect(updated.nome).toBe('Novo Nome')
  })

})

describe('deleteFilme', () => {

  it('deve deletar um filme por id', async () => {
    const totalFilmesBefore = (await filmeModel.listFilmes()).length

    await filmeModel.deleteFilme(1)

    const totalFilmesAfter = (await filmeModel.listFilmes()).length

    expect(totalFilmesAfter).toBe(totalFilmesBefore - 1) 
  })

})

