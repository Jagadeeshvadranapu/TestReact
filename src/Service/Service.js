const ApiURL = "https://jagadeeshwebapplication1api.azure-api.net/api";
export const ApiRequest = {
    GetInvestmentOptions : async() =>{
        const response = await fetch(ApiURL+"/Investment/GetInvestmentOptions");
        return response.json();
    },
    CalucateProjectedROI:  async(params) =>{
        const options = {
            method: 'Post',
            headers: {
               'Content-Type': 'application/json'            
            },
            body:  JSON.stringify(params)
           }
           const response = await fetch(ApiURL+"/Investment/CalucateProjectedROI",options);
           return response.json();
       }
}