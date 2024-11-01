import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Vote } from "./Vote";

@Entity()
export class Cat {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    catId!: string;

    @Column()
    imageUrl!: string;

    @OneToMany(() => Vote, (vote) => vote.cat)
    votes!: Vote[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
