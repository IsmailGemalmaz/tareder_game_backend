import { Request, Response } from 'express';
import { Any, getRepository } from 'typeorm';
import { User } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import { Console } from 'console';
import passport from 'passport';

const user = new User;

export class Users {

    //   //tüm kullanıcılar listelenir
    async getUsers(req: Request, res: Response): Promise<Response> {
        const users = await getRepository(User).find();

        return res.json(users);
    };

    //id si verilen kullanıcı listelenir
    async getUser(req: Request, res: Response): Promise<Response> {
        const result = await getRepository(User).findOne(req.params.id);

        return res.json(result);
    };

    //  //kullanıcı oluşturulur
    async createUsers(req: Request, res: Response): Promise<Response> {
        let results;
        try {
            const newUser: any = getRepository(User).create(req.body);
             newUser.password=await bcrypt.hash(newUser.password,5);
            results = await getRepository(User).save(newUser);
        } catch (err) {
            console.log(err + "hata");
        }
        return res.json(results);
    }

    //   //kullanıcı güncellenir
    async updateUser(req: Request, res: Response): Promise<Response> {
        const user = await getRepository(User).findOne(req.params.id);
        if (user) {
            getRepository(User).merge(user, req.body);
            const results = await getRepository(User).save(user);

            return res.json(results);
        }

        return res.status(404).json({ msg: 'Böyle bir kullanıcı bulunamadı' })
    }

    // //kullanıcı silinir
    async deleteUser(req: Request, res: Response): Promise<Response> {
        const result = await getRepository(User).delete(req.params.id);

        return res.json(result);
    }

    //kullanıcı login
    async loginUser(req: Request, res: Response): Promise<Response> {

        //const epostaJson:any= {"eposta":req.body.eposta}; 
        //const passwordJson:any= {"password":req.body.password}; 

        //let eposta=await getRepository(User).findOne({req.body.eposta});
        //let password=await getRepository(User).findOne(passwordJson);

        let token: any;
        let err: any;
        let errStatment:any;
        
        let email:string=req.body.email;
        let password:string=req.body.password;
        const find: any = await getRepository(User).findOne({"email":email});
        let id=find.id
        if (find) {
            const cmp = await bcrypt.compare(password, find.password);
            if(cmp){
                token = await jwt.sign({ id: find.id, email: find.email, firstName: find.firstName, lastName: find.lastName }, '1234567!+^&%+/(^&+/safjshfbaösmç.mşlkşlkd', { expiresIn: '7d' });
                err = false;
            }else{
               errStatment="errPassword"
                console.log(errStatment)
                err = true;
            }
        } else{
            err = true;
            errStatment="errEmail"
            console.log(errStatment)
        }
       
        return res.json({token, err ,errStatment,id});
    }
     

}







// try{
//     //jwt işlemleri
//     const jwtInfo={
//         id:user.id,
//         mail:user.eposta
//     }
//     //const jwtToken=jwt.sign(jwtInfo,'35^+AHVT!^+1234^ALMS',{expiresIn:'1d'});
//     //-----------------
//     //MAİL gönderme işlemleri

//         let tranporter=nodemailer.createTransport({
//             service:'gmail',
//             auth:{
//                 user:'isgsoftware9@gmail.com',
//                 pass:"Ismail123!'."
//             }
//         });

//         tranporter.sendMail({
//         //bu mail kimden gitti  
//         from:'Treading Game<isgsoftware9@gmail.com>',
//         //kime gidecek
//         to:user.eposta,
//         //email konusu
//         subject:'Emailni onayla',
//         //email yazısı
//         text:"Treading Game oyunu için Emailni onayla"
//         },(err,info)=>{
//             if(err){
//                 console.log("bir hata var"+err);
//             }

//             tranporter.close();

//         });

//          //----------------------
// }catch(err){
//     console.log("hata"+err);
// }