import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Cat } from "./Cat";

@Entity()
export class Vote {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Cat, (cat) => cat.votes)
    cat!: Cat;

    @Column()
    voterId!: string;

    @CreateDateColumn()
    createdAt!: Date;
}
