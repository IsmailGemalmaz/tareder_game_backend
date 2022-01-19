import {Router} from 'express';
import {Favorites} from '../controller/Favorites';

const router=Router();

const favorites=new Favorites;


router.post('/favorites',favorites.createFavorite);
router.get('/getfavorites',favorites.getFavorite);

export default router

