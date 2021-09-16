import { Entity, PrimaryGeneratedColumn, Column, Double } from "typeorm";


@Entity()
export class WalletEntity {

    @PrimaryGeneratedColumn()
    id: number;

    

    @Column()
    currency: string;


}