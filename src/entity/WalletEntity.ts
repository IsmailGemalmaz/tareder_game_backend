import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class WalletEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    currency: string;

    @Column()
    price: string;

    @Column()
    name: string;

    @Column()
    userId: number;

    @Column()
    amount: string;
}