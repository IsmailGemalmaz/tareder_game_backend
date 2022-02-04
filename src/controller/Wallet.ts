import { Request, response, Response } from 'express';
import { Any, Entity, getRepository } from 'typeorm';
import { User } from '../entity/User';
import { WalletEntity } from '../entity/WalletEntity';


const axios = require("axios").default;

interface MyObj {
    name: string;
    currency: string;
    price: string;
}

const walletEntity: WalletEntity = new WalletEntity;
export class Wallet {


    async createWallet(req: Request, res: Response): Promise<Response> {        
        let name: any;
        let currency: any = req.body.currency;
        let userId:any=req.body.userId
        let price: any;
        let control:any=false;
        let newAmount:any=req.body.amount;
        const wallet = await getRepository(WalletEntity).find();
        let id:any;
        console.log(wallet)
        await axios.get("https://api.nomics.com/v1/currencies/ticker?key=a8a3452e71305947867f9f04df8fd319&ids="+currency)
            .then(function (response: any) {
                name = response.data[0].name;
                price = response.data[0].price;
            })
            .catch(function (err: any) { console.log(err) });
            wallet.forEach(element => {
                if(element.currency==currency&&element.userId==userId){
                        control=true;
                        id=element.id 
                }
            });
           // price=Number(price)
            //price= price.toFixed(4);
            newAmount=Number(newAmount)
            newAmount= newAmount.toFixed(2);
            console.log(control)
           
            if(control==true){  
                const indexWallet:any = await getRepository(WalletEntity).findOne(id);
                  let amount:any=indexWallet?.amount
                 amount=Number(amount)
                 amount= amount.toFixed(2);
                 amount=amount-(-newAmount)   
                let jsonObj:any=JSON.parse(`{"amount" : "${amount}"}`);
                getRepository(WalletEntity).merge(indexWallet,jsonObj);  
                const results = await getRepository(WalletEntity).save(indexWallet);
                var msg="başarılı"
                return res.json({results,msg});
            }else{
                let obj:MyObj=JSON.parse( `{"name" : "${name}" ,"currency" : "${currency}","price" : "${price}","userId" :"${userId}","amount" :${newAmount}}`);
                const newWallet = getRepository(WalletEntity).create(obj);
                const results = await getRepository(WalletEntity).save(newWallet);
                var msg="başarılı"
                return res.json({results,msg});
            }
    }
 
    async getWallet(req: Request, res: Response): Promise<Response> {
        const result = await getRepository(WalletEntity).find(req.query);
        return res.json( result )
    }

    async deleteWallet(req: Request, res: Response): Promise<Response> {
        const result = await getRepository(WalletEntity).delete(req.params.id);

        return res.json(result);
    }

     //id si verilen cüzdanı listelenir
     async getidwalet(req: Request, res: Response): Promise<Response> {
        const result = await getRepository(WalletEntity).findOne(req.params.id)
        return res.json(result);
    };

    async updatew(req: Request, res: Response): Promise<Response> { 
    
        let updateAmount:any; 
        let id:any;
        const wallet = await getRepository(WalletEntity).find(req.query);
      
        await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=a8a3452e71305947867f9f04df8fd319&per-page=100&page=1`)
        .then(function ( response: any) {
                wallet.find((wallet: { id:number,currency: any,price:any,amount:any})=> response.data.find((data: { currency:any,price: any; })=> {
                    if(wallet.currency==data.currency){
                        let amount=wallet.amount/wallet.price
                         updateAmount= amount*=data.price
                         id=[wallet.id]
                        console.log({ currency:wallet.currency ,price:wallet.price,amount:wallet.amount})
                        console.log ({ currency:data.currency ,price:data.price})
                        console.log(updateAmount)
                        console.log(id)
                    }
                }))
                
                   
        })
        .catch(function (err: any) { console.log(err) });
       
         
            
               return res.status(404).json({ msg: 'Böyle bir cüzdan bulunamadı' })
    };

    async updatewalet(req: Request, res: Response): Promise<Response> { 
       
        let updatePrice:any; 
        const wallet = await getRepository(WalletEntity).findOne(req.params.id);
        let currency:any=wallet?.currency
        let amount:any=wallet?.amount
        let formerPrice:any=wallet?.price
        
        await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=a8a3452e71305947867f9f04df8fd319&ids=${currency}`)
        .then(function (response: any) {
            updatePrice= response.data[0].price;    
        })
        .catch(function (err: any) { console.log(err) });
        if (wallet) {
             if(amount<=0){
                const result = await getRepository(WalletEntity).delete(req.params.id);
                return res.json(result);
             }else{
                amount/=formerPrice
                amount*=updatePrice
                amount=Number(amount)
                amount= amount.toFixed(2);
                updatePrice=Number(updatePrice)
                //updatePrice=updatePrice.toFixed(4);
                let jsonObj:any=JSON.parse(`{"amount" : "${amount}","price":"${updatePrice}"}`);
                getRepository(WalletEntity).merge(wallet,jsonObj);  
                const results = await getRepository(WalletEntity).save(wallet);
                return res.json(results);
             }
        }
        return res.status(404).json({ msg: 'Böyle bir cüzdan bulunamadı' })
    };

    //cüzdan güncellenir
      async sellWallet(req: Request, res: Response): Promise<Response> {
        const wallet = await getRepository(WalletEntity).findOne(req.params.id);
        let sellAmount:any=wallet?.amount
        let updateAmount:any;
        console.log(sellAmount)
        if (wallet) {
             updateAmount=sellAmount-req.body.amount
             if(updateAmount<=0){
                const result = await getRepository(WalletEntity).delete(req.params.id);
                return res.json(result);
             }else{
                let jsonObj:any=JSON.parse( `{"amount" : "${updateAmount}"}`);
                getRepository(WalletEntity).merge(wallet,jsonObj);  
                const results = await getRepository(WalletEntity).save(wallet);
                return res.json(results);
             }
        }

        return res.status(404).json({ msg: 'Böyle bir kullanıcı bulunamadı' })
    }

    async algoritmaWallet() {

    }

}
/*

if(wallet.amount<=0){
    const result = await getRepository(WalletEntity).delete(wallet.id);
    return res.json(result);
 }else{
   let amount=wallet.amount/wallet.price
    let updatePrice= amount*=data.price
    let jsonObj:any=JSON.parse(`{"price":"${updatePrice}"}`);
    getRepository(WalletEntity).merge(wallet.id,jsonObj);  
    const results = await getRepository(WalletEntity).save(wallet);
    return res.json(results);
 }
*/

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







/*
 let updatePrice:any; 
        const wallet = await getRepository(WalletEntity).findOne(req.params.id);
        let currency:any=wallet?.currency
        let amount:any=wallet?.amount
        let formerPrice:any=wallet?.price

        await axios.get("https://api.nomics.com/v1/currencies/ticker?key=a8a3452e71305947867f9f04df8fd319&ids="+currency)
        .then(function (response: any) {
            updatePrice= response.data[0].price;    
        })
        .catch(function (err: any) { console.log(err) });
        if (wallet) {
             if(amount<=0){
                const result = await getRepository(WalletEntity).delete(req.params.id);
                return res.json(result);
             }else{
                amount/=formerPrice
                amount*=updatePrice
                amount=Number(amount)
                amount= amount.toFixed(2);
                updatePrice=Number(updatePrice)
                //updatePrice=updatePrice.toFixed(4);
                let jsonObj:any=JSON.parse(`{"amount" : "${amount}","price":"${updatePrice}"}`);
                getRepository(WalletEntity).merge(wallet,jsonObj);  
                const results = await getRepository(WalletEntity).save(wallet);
                return res.json(results);
             }
        }
        return res.status(404).json({ msg: 'Böyle bir cüzdan bulunamadı' })
*/