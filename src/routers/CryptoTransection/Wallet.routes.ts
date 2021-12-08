import {Router} from 'express';
import { Wallet } from '../../controller/CryptoTransection/Wallet';
//import {Users} from '../../controller/CryptoTransection/Wallet';
const router=Router();

const wallet=new Wallet;

router.post("/postwallet",wallet.createWallet);
router.get("/get",wallet.getWallet);

export default router