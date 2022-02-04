import {Router} from 'express';
import { Wallet } from '../controller/Wallet';
//import {Users} from '../../controller/CryptoTransection/Wallet';
const router=Router();

const wallet=new Wallet;

router.post("/postwallet",wallet.createWallet);
router.get("/get",wallet.getWallet);
router.delete('/deletewallet/:id',wallet.deleteWallet);
router.put('/updatewallet/:id',wallet.updatewalet)
router.put('/updatew',wallet.updatew)
router.put('/sellwallet/:id',wallet.sellWallet);
router.get('/getid/:id',wallet.getidwalet);
export default router