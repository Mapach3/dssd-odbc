import React,{Component} from 'react'


export class SearchUser extends Component{






}


{/* <Typeahead 
id="countries"
ref={ref}
emptyLabel="Sin coincidencias." 
paginationText="Mostrar más resultados..." 
placeholder="Seleccione País" 
options={this.state.countryList.map(ctry => ctry.name)}//aca va el array de countries
onChange={(name) => this.findCountryCities(name)}
/>  */}


// componentDidMount(){
//     debugger;
//     axios.get(__API_COUNTRIES).then(response => {
//         var countries = response.data
//         this.setState({countryList : countries})

//     }).catch(error => {
//         console.log("Error getting countries: ")
//         console.log(error)
//     })

// }


// findCountryCities(name){
//     debugger;
//     if (name.length != 0){
//         var url = __API_CITIES
//         const countryId = this.state.countryList.find( ctry => ctry.name == name).id
//         url+="/"+countryId
        
//         axios.get(url).then(response => {
//             debugger;
//             var cities = response.data
//             this.setState({cityList : cities})
//         }).catch(error =>{
//             debugger;
//             console.log("Error getting Cities: ",error)
//         })
//     }
//     this.setState({cityList : []})
// }
