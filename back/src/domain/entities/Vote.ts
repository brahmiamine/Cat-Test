import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Unique } from "typeorm";
import { Cat } from "./Cat";

@Entity()
@Unique(["voterId"])
export class Vote {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    catId!: string;

    @ManyToOne(() => Cat, (cat) => cat.votes, { onDelete: "CASCADE" })
    @JoinColumn({ name: "catId", referencedColumnName: "catId" })
    cat!: Cat;

    @Column()
    voterId!: string;

    @CreateDateColumn()
    votedAt!: Date;
}
