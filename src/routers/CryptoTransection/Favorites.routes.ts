import {Router} from 'express';
import {Favorites} from '../../controller/CryptoTransection/Favorites';

const router=Router();

const favorites=new Favorites;


router.post('/favorites',favorites.createFavorite);

export default router