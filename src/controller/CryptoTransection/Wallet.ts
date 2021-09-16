import {Request,Response} from 'express';
import {Entity, getRepository} from 'typeorm';
import {WalletEntity} from '../../entity/WalletEntity';



export class Wallet{
    async createWallet(req:Request,res:Response):Promise<Response>{


        const newFavorite = getRepository(WalletEntity).create(req.body);
        const results=await getRepository(WalletEntity).save(newFavorite); 
 
     return res.json(results);
    }

}