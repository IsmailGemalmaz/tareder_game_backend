import { Console } from 'console';
import {NextFunction, request, Request,Response} from 'express';
import { get } from 'http';
import {Entity, getRepository} from 'typeorm';
import {Favorite} from '../../entity/Favorite';

const axios=require("axios").default;

 const data= axios.get("https://api.nomics.com/v1/currencies/ticker?key=a8a3452e71305947867f9f04df8fd319&ids=BTC")
.then(function(response:any){console.log(response.data[0])})
.catch(function(err:any){console.log(err)});


const favorite=new Favorite;

export class Favorites {

async createFavorite(req:Request ,res:Response):Promise<Response>{
    
        const newFavorite = getRepository(Favorite).create(req.body);
       const results=await getRepository(Favorite).save(newFavorite); 

    return res.json(results);
}


async getFavorite(req:Request,res:Response):Promise<Response>{

    const favorites=await getRepository(Favorite).find();

    return res.json(favorites)
}



}


