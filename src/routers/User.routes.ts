import {Router} from 'express';
import {Users} from '../controller/UserController'
import { AuthMiddleWare } from '../middlewares/AuthMiddlewares';
const router=Router();

const user=new Users;
const auth=new AuthMiddleWare;

router.get('/get',user.getUsers);
router.post('/register',user.createUsers)
router.get('/getİd/:id',user.getUser);
router.put('/update/:id',user.updateUser);
router.delete('/delete/:id',auth.auth,user.deleteUser);
router.post('/login',user.loginUser);

export default router