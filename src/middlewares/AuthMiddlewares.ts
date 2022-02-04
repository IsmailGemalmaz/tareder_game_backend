import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { WalletEntity } from '../entity/WalletEntity';
import * as jwt from 'jsonwebtoken';
import { nextTick } from 'process';

export class AuthMiddleWare{
    async auth(req: Request, res: Response){
        try{
            const token =req.header('Authorization')?.replace('Bearer ' , '')
           
            const response= jwt.verify(token!!,'secretKey');
            
    
        }catch(err){

        }

      
    };

}