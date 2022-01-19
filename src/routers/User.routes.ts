import {Router} from 'express';
import {Users} from '../controller/UserController'
const router=Router();

const user=new Users;

router.get('/get',user.getUsers);
router.post('/register',user.createUsers)
router.get('/getİd/:id',user.getUser);
router.put('/update/:id',user.updateUser);
router.delete('/delete/:id',user.deleteUser);
router.post('/login',user.loginUser);


export default router