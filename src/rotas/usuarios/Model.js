const { TimeoutError } = require('sequelize')
const Sequelize = require('sequelize')
const instancia = require('../../infra/database/index')

const colunas = {
    nm_login:{
        type: Sequelize.STRING,
        allowNull: false
    },
    nm_email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    nm_senha:{
        type: Sequelize.STRING,
        allowNull: false
    }
}

const opcoes ={
    freezeTableName:true,
    tableName:'usuario',
    timestamps:true,
    createAt:'dataCriacao',
    updatedAt:'dataAtualizacao',
    version:'versao'
}

module.exports = instancia.define('usuario',colunas,opcoes)