const express = require("express")
const cors = require('cors')
const odbc = require("odbc")
const port = 4000

var app = express()




/*GET Countries*/ 
app.options('/getCountries', (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader("Access-Control-Allow-Headers", "*");
    response.end();
})
app.post('/getCountries', (request, response) =>  {
    const connection = odbc.connect("DSN=sakilaDB", (error,connection) => {
        connection.query("SELECT country_ ID, country NAME from COUNTRY",
            (error, result) => {
                if (error) {
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



app.post('/test', (request, response) =>  {
    var name = request.body.name
    var surname = request.body.surname
    console.log("Name: ",name, "// Surname: ",surname)

}
)

app.listen(port, () => {
    console.log("Running server on Port : "+port+" with cors.")
});




