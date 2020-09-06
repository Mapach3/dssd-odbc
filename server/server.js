const express = require("express")
const cors = require('cors')
const odbc = require("odbc")
var bodyParser = require('body-parser');

const port = 4000

var app = express()

//Parsear el body usando body parser
app.use(bodyParser.json()); // body en formato json


/*GET Countries*/ 
app.get('/getCountries',cors(), (request, response) =>  {
    const connection = odbc.connect("DSN=sakilaDB", (error,connection) => {
        connection.query("SELECT country_ID as id, country as name from COUNTRY",
            (error, result) => {
                if (error) {
                    response.send(JSON.stringify(error))
                }
                else{
                    response.send(JSON.stringify(result))
                }
            }
        )
    })
}
)

/*GET Cities*/ 
app.get('/getCitiesByCountry/:cId',cors(), (request, response) =>  {
    const connection = odbc.connect("DSN=sakilaDB", (error,connection) => {
        connection.query("SELECT city_id as id, city as name from CITY where country_id="+request.params.cId,
            (error, result) => {
                if (error) {
                    response.send(JSON.stringify(error))
                }
                else{
                    response.send(JSON.stringify(result))
                }
            }
        )
    })
}
)

/*POST InsertUser*/ 
app.options('/insertUser', (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader("Access-Control-Allow-Headers", "*");
    response.end();
})
app.post('/insertUser',cors(), (request, response) =>  {
    var data = request.body

    const connection = odbc.connect("DSN=sakilaDB", (error,connection) => {
         
        connection.query("CALL insert_customer('"+data.name+"','"+data.surname+"','"+data.email+"','"+data.store+"','"+data.address+"','"+data.district+
                                                "','"+data.city+"','"+data.postCode+"','"+data.phone+"',@newAddress,@newCustomer)",
            (error, result) => {
                if (error) {
                    console.log("Error en POST Insert: ")
                    console.log(error)
                    response.send(JSON.stringify(error))
                }
                else{
                    console.log("Success! insert customer ")
                    console.log(result)
                    response.send(JSON.stringify(result))
                }
            }
        )
    })
}
)

/*POST deleteUser*/ 
app.options('/deleteUser', (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader("Access-Control-Allow-Headers", "*");
    response.end();
})
app.post('/deleteUser',cors(), (request, response) =>  {
    var data = request.body

    const connection = odbc.connect("DSN=sakilaDB", (error,connection) => {
         
        connection.query("CALL drop_customer('"+data.email+"');",
            (error, result) => {
                if (error) {
                    console.log("Error en POST DropCustomer: ")
                    console.log(error)
                    response.send(JSON.stringify(error))
                }
                else{
                    console.log("Success in DropCustomer! ")
                    console.log(result)
                    response.send(JSON.stringify(result))
                }
            }
        )
    })
}
)



app.listen(port, () => {
    console.log("Running server on Port : "+port+" with cors.")
});




