const express = require("express")
const cors = require('cors')
const odbc = require("odbc")
var bodyParser = require('body-parser');

const port = 4000

var app = express()

//Parsear el body usando body parser
app.use(bodyParser.json()); // body en formato json

/*GET Stores*/
app.get('/getStores',cors(), (request, response) =>  {
    const connection = odbc.connect("DSN=sakilaDB", (error,connection) => {
        connection.query("select store.store_id as store_id, address, city "+ 
                         "from store "+
                         "inner join address on store.address_id=address.address_id "+ 
                         "inner join city on address.city_id=city.city_id; ",
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

/*GET CitiesByCountry*/ 
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

/*GET AllCities*/ 
app.get('/getAllCities',cors(), (request, response) =>  {
    const connection = odbc.connect("DSN=sakilaDB", (error,connection) => {
        connection.query("SELECT city_id as id, city as name FROM sakila.city order by name asc; ",
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

/*GET getUser*/ 
app.options('/getUser', (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader("Access-Control-Allow-Headers", "*");
    response.end();
})
app.get('/getUser',cors(), (request, response) =>  {
    var email = request.query.userEmail

    const connection = odbc.connect("DSN=sakilaDB", (error,connection) => {
         
        connection.query("SELECT customer_id, customer.address_id as address_id, first_name, store_id,last_name,email,address,district,city.city_id as city_id, postal_code,phone,country_id from customer"+
                         " inner join address on customer.address_id=address.address_id"+
                         " inner join city on address.city_id=city.city_id"+
                         " where customer.email = '"+email+"';", (error, result) =>
            {
            if (error) {
                console.log("Error en GET GetCustomer: ")
                console.log(error)
                response.send(JSON.stringify(error))
            }
            else{
                console.log(result)
                response.send(JSON.stringify(result))
            }
            }
        )
    })
}
)


/*PUT updateUser*/ 
app.options('/updateUser', (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader("Access-Control-Allow-Headers", "*");
    response.end();
})
app.put('/updateUser',cors(), (request, response) =>  {
    var data = request.body

    const connection = odbc.connect("DSN=sakilaDB", (error,connection) => {
         
        connection.query("CALL update_customer('"+data.name+"','"+data.surname+"','"+data.email+"','"+data.store+"','"+data.address+"','"+data.district+
        "','"+data.city+"','"+data.postCode+"','"+data.phone+"','"+data.addressId+"', '"+data.userId+"');",
            (error, result) => {
                if (error) {
                    console.log("Error en PUT UpdateCustomer: ")
                    console.log(error)
                    response.send(JSON.stringify(error))
                }
                else{
                    console.log("Success in UpdateCustomer! ")
                    console.log(result)
                    response.send(JSON.stringify(result))
                }
            }
        )
    })
}
)

/*GET findUsers*/ 
app.options('/findUsers', (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader("Access-Control-Allow-Headers", "*");
    response.end();
})
app.get('/findUsers',cors(), (request, response) =>  {
    
    var params = request.query
    var name = params.name.length != 0  ? "'"+params.name+"'" : null
    var surname = params.surname.length != 0 ? "'"+params.surname+"'" : null
    var city = params.city.length != 0 ? "'"+params.city+"'" : null


    const connection = odbc.connect("DSN=sakilaDB", (error,connection) => {
         
        connection.query("CALL search_customers("+name+","+surname+","+city+");", (error, result) =>
            {
            if (error) {
                console.log("Error en GET SearchUser: ")
                console.log(params,name,surname,city)
                console.log(error)
                response.send(JSON.stringify(error))
            }
            else{
                console.log(params,name,surname,city)
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




