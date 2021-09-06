import { Request,Response} from 'express';
import {getRepository} from 'typeorm';
import {User} from '../../entity/User';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';

const user=new User;

export  class Users {
    
    //   //tüm kullanıcılar listelenir
    async  getUsers(req:Request ,res:Response): Promise<Response>{
      const users= await getRepository(User).find();
          return res.json(users);
      };
     
      //id si verilen kullanıcı listelenir
      async  getUser(req:Request ,res:Response): Promise<Response>{
         const result= await getRepository(User).findOne(req.params.id);
      return res.json(result);
     };

    //  //kullanıcı oluşturulur
     async createUsers(req:Request ,res:Response):Promise<Response>{
           
            const newUser = getRepository(User).create(req.body);
            const results=await getRepository(User).save(newUser);
        
        return res.json(results);
        }



    //   //kullanıcı güncellenir
    async updateUser(req:Request,res:Response):Promise<Response>{
        const user=await getRepository(User).findOne(req.params.id);
         if(user){
           getRepository(User).merge(user,req.body);
            const results=await getRepository(User).save(user);
           return res.json(results);
        }

        return res.status(404).json({msg:'Böyle bir kullanıcı bulunamadı'})
     }  

    // //kullanıcı silinir
    async deleteUser(req:Request,res:Response):Promise<Response>{
         const result= await getRepository(User).delete(req.params.id);
       
         return res.json(result);
    }

     //kullanıcı login
     async loginUser(req:Request,res:Response):Promise<Response>{
       
         let eposta=await getRepository(User).findOne(req.body.eposta);
         let password=await getRepository(User).findOne(req.body.password);
        let result="";

           if(eposta&&password){
               result="kullanıcı girişi yapıldı";
           }else{
                result="hata";
            }

       
   return res.json(result);
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