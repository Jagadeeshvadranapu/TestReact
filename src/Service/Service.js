//const ApiURL = "https://localhost:7249/api";
const ApiURL = "https://jagadeeshwebapplication1api.azure-api.net/api";
export const ApiRequest = {
    GetInvestmentOptions : async() =>{
        const response = await fetch(ApiURL+"/Investment/GetInvestmentOptions");
        return response.json();
    },
    CalucateProjectedROI:  async(params) =>{
        try{
        const investments = {
            investment : params
        };
        const options = {
            method: 'Post',
            headers: {
               'Content-Type': 'application/json'            
            },
            body:  JSON.stringify(investments)
           }
           const response = await fetch(ApiURL+"/Investment/CalucateProjectedROI",options);
           return response.json();
       }
    catch(error){
console.log(error)
    }
}
}