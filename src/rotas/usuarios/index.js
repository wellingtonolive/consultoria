const roteador = require('express').Router( { mergeParams: true})
const NaoEncontrado = require('../../erros/NaoEncontrado')
const TabelaUsuarios = require('./TabelaUsuarios')
const Usuario = require('./Usuarios')
const SerializadorUsuario = require('../../serializador/Serializador').SerializadorUsuario

roteador.options('/',(req,res) =>{
    res.set('Access-Control-Allow-Methods','GET,POST')
    res.set('Access-Control-Allow-Headers','Content-Type')
    res.status(204)
    res.end()
})

roteador.get('/', async (req, res) => {
    const resultados = await TabelaUsuarios.listar()
    const serializador = new SerializadorUsuario(res.getHeader('Content-Type'))
    res.send(
        serializador.serializar(resultados)
    ) 
})

roteador.post('/', async (req, res, tratamentoErro) => {

    try {
        const dadosRecebidos = req.body
        const usuario = new Usuario(dadosRecebidos)
        await usuario.criar()
        const serializador = new SerializadorUsuario(res.getHeader('Content-Type'))
        res.status(201).send(
            serializador.serializar(usuario)
        )
    } catch (erro) {
        tratamentoErro(erro)
    }


})


roteador.options('/:idUsuario',(req,res) =>{
    res.set('Access-Control-Allow-Methods','GET,PUT,DELETE')
    res.set('Access-Control-Allow-Headers','Content-Type')
    res.status(204)
    res.end()
})

roteador.get('/:idUsuario', async (req, res, tratamentoErro) => {

    try {
        const id = req.params.idUsuario
        const usuario = new Usuario({ id: id })
        await usuario.detalharUsuario()
        const serializador = new SerializadorUsuario(res.getHeader('Content-Type'),['nm_login','nm_email','nm_senha','dataAtualizacao','createdAt'])
        res.send(
            serializador.serializar(usuario)
        )
    }
    catch (erro) {
        tratamentoErro(erro)
    }


})

roteador.put('/:idUsuario', async (req, res, tratamentoErro) => {

    try {
        const id = req.params.idUsuario
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const usuario = new Usuario(dados)

        await usuario.atualizar()

        res.status(204).end()
    } catch (erro) {
        tratamentoErro(erro)
    }


})

roteador.delete('/:idUsuario', async (req, res) => {

    try {
        const id = req.params.idUsuario
        const usuario = new Usuario({ id: id })
        await usuario.detalharUsuario()
        await usuario.remover()
        res.status(204).end()
    } catch (erro) {
        tratamentoErro(erro)
    }


})

module.exports = roteador