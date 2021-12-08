import {Request,Response} from 'express';
import {Entity, getRepository} from 'typeorm';
import {WalletEntity} from '../../entity/WalletEntity';


const axios=require("axios").default;



interface MyObj {
    name: string;
    currency:string;
    price:string;
}

const walletEntity:WalletEntity=new WalletEntity;
export class Wallet{


    async createWallet(req:Request,res:Response):Promise<Response>{

        let name:any;
        let currency:any=req.body.currency;
        let price:any;
        await axios.get("https://api.nomics.com/v1/currencies/ticker?key=a8a3452e71305947867f9f04df8fd319&ids="+currency)
        .then(function(response:any){
              name=response.data[0].name;
              price=response.data[0].price;
           })
        .catch(function(err:any){console.log(err)});
         let obj:MyObj=JSON.parse('{"name" :"'+name+'", "currency" : " '+currency+'","price" :"'+price+'"}');
         const newWallet = getRepository(WalletEntity).create(obj);
         const results=await getRepository(WalletEntity).save(newWallet); 
         return res.json(results);
    }

    async getWallet(req:Request,res:Response):Promise<Response>{
        const result=await getRepository(WalletEntity).find();
        return res.json({"wallet":result})
    }
    
    async algoritmaWallet(){
        
    }

}


/*

async createWallet(req:Request,res:Response):Promise<Response>{

    
    axios.get("https://api.nomics.com/v1/currencies/ticker?key=a8a3452e71305947867f9f04df8fd319&ids="+req.body.currency)
   .then(function(response:any){
       console.log(response.data[0])
     
      })
   .catch(function(err:any){console.log(err)});

   let obj:MyObj=JSON.parse('{"name" :"bitcoin", "currency" : '+ '"' +req.body.currency+'"}');
  
    const newWallet = getRepository(WalletEntity).create(obj);
    const results=await getRepository(WalletEntity).save(newWallet); 
   
 

return res.json(results);
}   

*/

/*
axios.get("https://api.nomics.com/v1/currencies/ticker?key=a8a3452e71305947867f9f04df8fd319&ids="+req.body.currency)
.then(function(response:any){
    console.log(response.data[0])
  
   })
.catch(function(err:any){console.log(err)});

*/