import { Console } from 'console';
import {NextFunction, Request,Response} from 'express';
import { get } from 'http';
import {Entity, getRepository} from 'typeorm';
import {Favorite} from '../../entity/Favorite';

const favorite=new Favorite;

export class Favorites {

async createFavorite(req:Request ,res:Response):Promise<Response>{
    
        const newFavorite = getRepository(Favorite).create(req.body);
       const results=await getRepository(Favorite).save(newFavorite);
    

    return res.json(results);
}

}


