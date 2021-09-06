import { Entity, PrimaryGeneratedColumn, Column, Double } from "typeorm";


@Entity()
export  class  Favorite {

    @PrimaryGeneratedColumn()
    id: number;

    

    @Column()
    currency: string;


}