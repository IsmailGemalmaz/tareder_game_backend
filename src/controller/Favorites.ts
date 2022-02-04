import { Console } from 'console';
import { NextFunction, request, Request, Response } from 'express';
import { get } from 'http';
import { Entity, getRepository } from 'typeorm';
import { Favorite } from '../entity/Favorite';

const axios = require("axios").default;
const favorite = new Favorite;

interface MyObj {
    name: string;
    currency: string;
    price: string;
    marketCap: string;
}

export class Favorites {

    async createFavorite(req: Request, res: Response): Promise<Response> {

        let name: any;
        let currency: any = req.body.currency;
        let price: any;
        let market_cap: any;
        await axios.get("https://api.nomics.com/v1/currencies/ticker?key=a8a3452e71305947867f9f04df8fd319&ids=" + currency)
            .then(function (response: any) {
                name = response.data[0].name;
                price = response.data[0].price;
                market_cap = response.data[0].market_cap;
            })
            .catch(function (err: any) { console.log(err) });
        let obj: MyObj = JSON.parse('{"name" :"' + name + '", "currency" : " ' + currency + '","price" :"' + price + '","market_cap":"' + market_cap + '"}');
        const newFavorite = getRepository(Favorite).create(obj);
        const results = await getRepository(Favorite).save(newFavorite);

        return res.json(results);
    }

    async getFavorite(req: Request, res: Response): Promise<Response> {
        const favorites = await getRepository(Favorite).find();
        
        return res.json(favorites)
    }



}


