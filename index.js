const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql2');

//configuracoes de ambiente
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//criando roteador
const router = express.Router();
router.get('/', (req, res) => res.json({message: 'API ok!'}));
app.use('/', router);

function execQuery(query,res){
    const connection = mysql.createConnection({
        host: '192.168.99.100',
        port: 3336,
        user: 'root',
        password: 'faesa123',
        database: 'app_development'
    });

    connection.query(query, function(error, results, fields){
        if(error) res.json(error);
        else res.json(results);

        connection.end();
        console.log('Query executada com sucesso!')
    });
}

//Rotas users
router.get('/users', (req, res) => {
    execQuery('SELECT * FROM Covid;', res);
});

router.get('/users/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE id = ' + parseInt(req.params.id);
    execQuery('SELECT * FROM Covid ' + filter, res);
  });

router.delete('/users/:id', (req, res) => {
    execQuery('DELETE FROM Covid WHERE id=' + parseInt(req.params.id), res);
});
  
  router.post('/users', (req, res) => {
    const nome = req.body.nome.substring(0,200);
    const est = req.body.est.substring(0,200);
    const cid = req.body.cid.substring(0,200);
    const end = req.body.end.substring(0,200);
    const tel = req.body.tel.substring(0,100);
    const alt = req.body.alt.substring(0,3);
    const peso = req.body.peso.substring(0,3);
    const prob_saude = req.body.prob_saude.substring(0,200);

    execQuery(`INSERT INTO Covid (nome, est, cid, end,  tel, alt, peso, prob_saude)
     VALUES ('${nome}', '${est}', '${cid}', '${end}', '${tel}', '${alt}', '${peso}', '${prob_saude}');`, res);
});
  
  router.patch('/users/:id', (req,res) => {
    const nome = req.body.nome.substring(0,200);
    const est = req.body.est.substring(0,200);
    const cid = req.body.cid.substring(0,200);
    const end = req.body.end.substring(0,200);
    const tel = req.body.tel.substring(0,100);
    const alt = req.body.alt.substring(0,3);
    const peso = req.body.peso.substring(0,3);
    const prob_saude = req.body.prob_saude.substring(0,200);

    execQuery(`UPDATE Covid SET nome='${nome}', est='${est}', cid='${cid}',
    end='${end}', tel='${tel}', alt='${alt}', peso='${peso}', prob_saude='${prob_saude}'
     WHERE id = '${req.params.id}';`, res);
});

//Iniciando o servidor
app.listen(port);
console.log('API rodando....');
