const usersModel = require('../models/usersModels');


// Função para inserir/criar um novo usuário
const insertNewUser = async (req, res) => {
    const { nome, sobrenome, email, senha } = req.body;

    try {
        // CRIANDO UM NOVO USUÁRIO
        const newUser = await usersModel.create({
            first_name: nome,
            surname: sobrenome,
            email: email,
            password: senha
        });
        // CONSOLE PARA MOSTRAR O RESULTADO DO INSERT
        // console.log(`Usuário ${newUser.first_name}, ID: ${newUser.id} criado com sucesso!`);

        // RESPOSTA DA REQUISIÇÃO
        res.status(201).send({
            message: `Usuário | ${newUser.first_name}, ID: ${newUser.id} | criado com sucesso!`
        });
    } catch (error) {
        res.status(400).send({
            message: `Falha ao criar o usuário. Erro: ${error}`
        });
    }
};

// Função para listar todas as colunas dos usuários cadastrados
const listAllUsers = async (req, res) => {
    try {
        const users = await usersModel.findAll();
        res.send(users)

    } catch (error) {
        res.send({
            message: `Não foi possível listar os usuários. Erro: ${error}`
        })
    }
};

// Função para buscar um usuário pelo ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await usersModel.findByPk(id);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ message: "Usuário não encontrado." });
        }
    } catch (error) {
        res.status(400).send({ message: `Buscar por usuário inválida! Erro: ${error}` });
    }
};

// Função para atualizar um usuário pelo ID
const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome, email, senha } = req.body;
    try {
        const user = await usersModel.findByPk(id);
        if (user) {
            await user.update({ 
                first_name: nome,
                surname: sobrenome,
                email: email,
                password: senha 
            });
            res.status(200).send({ message: `Usuário de ID: ${id} atualizado com sucesso!` });
        } else {
            res.status(404).send({ message: "Usuário não encontrado." });
        }
    } catch (error) {
        res.status(400).send({ message: `Atualização de usuário inválida! Erro: ${error}` });
    }
};

// Função para deletar um usuário pelo ID
const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await usersModel.findByPk(id);
        if (user) {
            await user.destroy();
            res.status(200).send({ message: `Usuário de ID: ${id} deletado com sucesso!` });
        } else {
            res.status(404).send({ message: "Usuário não encontrado." });
        }
    } catch (error) {
        res.status(400).send({ message: `Não foi possível deletar o usuário. Erro: ${error}` });
    }
};



module.exports = {
    insertNewUser,
    listAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}