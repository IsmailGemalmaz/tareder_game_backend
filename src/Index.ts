import 'reflect-metadata';
import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {createConnection} from 'typeorm';
import authRoutes from './routers/User Transection/User.routes'
import walletRoutes from './routers/CryptoTransection/Wallet.routes';
import transectionHistory from './routers/CryptoTransection/TransectionHistory.routes';
import favorites from './routers/CryptoTransection/Favorites.routes';

dotenv.config();
const app =express();
createConnection();

//middleWares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//routers
app.use('/api/v1/user',authRoutes);
app.use('/api/v1/crypto',walletRoutes,transectionHistory,favorites);

app.listen(process.env.PORT,()=>{
    console.log(`Server ${process.env.PORT} portundan ayaklandırıldı`);
});


