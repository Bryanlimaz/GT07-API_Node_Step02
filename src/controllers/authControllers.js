const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/dotenvConfig');
const users = require('../mocks/listaUsuarios');

async function loginAuth(req, res) {
    const { email, senha } = req.body;
    const user = users.find((user) => user.email === email && user.senha === senha);

    try {
        if (user) {
            const token = jwt.sign({ id: user.id, nome: user.nome }, jwtSecret, { expiresIn: '3h' });
            res.send({
                success: true,
                token,
                message: 'Login realizado com sucesso!',
            });
        } else {
            res.send({
                success: false,
                token: '',
                message: 'Usuário ou senha inválidos!',
            });
        }
    } catch (error) {
        res.send(`Algo deu errado! Erro: ${error}`)
    }
}


module.exports = { loginAuth };