const crypto = require('crypto');
const conection = require('../database/conection');

module.exports = {
    async index(request, response) {
        const ongs = await conection('ongs').select('*');

        return response.json(ongs);
    },

    async create(request, response) {
        // desestruturar para pegar cada dado separado garantindo que nenhuma informação além da necessária será enviada pelo usuário
        const { name, email, whatsapp, city, uf } = request.body;

        // Optamos por criar o ID não incremental, então usaremos uma biblioteca nativa do node para gerar o valor aleatório
        const id = crypto.randomBytes(4).toString('HEX');

        // conexao com o banco de dados
        // Como o insert pode demorar, o uso do await é necessário para aguardar a finalização do processo. Indicar o async na rota
        await conection('ongs').insert({
            id,
            name, 
            email, 
            whatsapp, 
            city, 
            uf,
        })

    
        // retorn o ID após criado
        return response.json({ id });
    }
};