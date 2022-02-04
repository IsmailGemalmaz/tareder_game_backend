import { Entity, PrimaryGeneratedColumn, Column, Double } from "typeorm";


@Entity()
export class Favorite {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    currency: string;

    @Column()
    name: string;

    @Column()
    price: string;

    @Column()
    market_cap: string;





}