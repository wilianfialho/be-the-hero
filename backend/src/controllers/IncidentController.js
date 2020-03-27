const conection = require('../database/conection');

module.exports = {
    async index(request, response) {


        // 1 é o valor default caso page não seja passado na URL
        const { page = 1 } = request.query;

        const [count] = await conection('incidents').count();

        const incidents = await conection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1 ) * 5)
            .select([ 
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf' 
            ]);

        // Geralmente o total de itens é retornadp n header da aplicação. Geralmete é chamado de X-Total-Count
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    }, 
    async create(request, response) {
        // O ID pode seer enviado no corpo da requisição, mas preferimos usar o ID da ong autenticada
        const { title, description, value } = request.body;

        // request.headers // guarda informação do contexto da requisição: dados da autenticação, localização
        // authorizarion foi o nome definido para ser enviado no header da aplicação
        const ong_id = request.headers.authorization;

        // atribuindo a uma variável para recuperar o ID do registro inserido, como ela retorna um array com um único valor
        // result[0] ou [id] (primeira chave do array será armazenada no variável id)
        const [id] = await conection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });

    },

    async delete(request, response) {
        const { id } = request.params;
        
        // será usado para validar se foi deletado pela ong correta
        const ong_id = request.headers.authorization;

        const incident = await conection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            // Não autorizado. Http Status Code
            return response.status(401).json({ error: 'operation not permited' });
        }

        await conection('incidents').where('id',id).delete();

        // Code 204 (No Content) indicado para ser usado quando a resposta para o frontend não tem conteúdo
        // .send() -> para enviar a resposta sem nada (vazia)
        return response.status(204).send();
    },
};