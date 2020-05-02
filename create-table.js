const mysql = require('mysql2');
const faker = require('faker');
faker.locale = 'pt_BR'

const connection = mysql.createConnection({
    host: '192.168.99.100',
    port: 3336,
    user: 'root',
    password: 'faesa123',
    database: 'app_development'
})

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('Banco de Dados Conectado!')
    createTableCovid(connection);
    populateCovid(connection);
})
function createTableCovid(conn){

    conn.query('DROP TABLE Covid;', function(error, reults, fields){
        if(error) return console.log(error);
        console.log('Tabela excluida com sucesso!');
    })

    const sql = `CREATE TABLE IF NOT EXISTS Covid
                    (id INT NOT NULL AUTO_INCREMENT,
                    nome VARCHAR(200) NOT NULL,
                    est VARCHAR(200) NOT NULL,
                    cid VARCHAR(200) NOT NULL,
                    end VARCHAR(200) NOT NULL,
                    tel VARCHAR(100) NOT NULL,
                    alt VARCHAR(100) NOT NULL,
                    peso VARCHAR(100) NOT NULL,
                    prob_saude VARCHAR(200) NULL,

                    PRIMARY KEY (id)
                    );`

    conn.query(sql, function(error, reults, fields){
        if(error) return console.log(error);
        console.log('Tabela criada com sucesso!');
    })

}

function populateCovid(conn){
    const sql = `INSERT INTO Covid(nome, est, cid, end, tel, alt, peso, prob_saude) VALUES ?`;

    let values = [];

    for(let i = 0; i <10; i++){
            let tel = Math.floor(100000000 + Math.random() * 900000000);
            let alt = (Math.random().toFixed(2)* 0.5 +1.50)+"m";  
            let peso = Math.floor(Math.random() *10 + 60)+"kg";  
            let arrayprob_saude = ["Lindo e Saudavel","Dengoso","Viro Influencer (influenza VAIRUS)","Gripe","CORONA VAIRUS"]
            let prob_saude = arrayprob_saude[Math.floor(Math.random() * arrayprob_saude.length)];  

        values.push([faker.name.findName(), faker.address.stateAbbr(), faker.address.city(),
            faker.address.streetName(), tel, alt, peso, prob_saude]);

    }

    conn.query(sql, [values], function(error, results, fields){
        if(error) return console.log(error);
        console.log('Registros inseridos com sucesso!');
        conn.end();
    });
}