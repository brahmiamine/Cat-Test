import { CatRepository } from "../../domain/repositories/CatRepository";
import { Cat } from "../../domain/entities/Cat";
import { AppDataSource } from "../database/data-source";

export class TypeormCatRepository implements CatRepository {
    private repository = AppDataSource.getRepository(Cat);

    async findAll(): Promise<Cat[]> {
        return this.repository.find({ relations: ["votes"] });
    }
    async create(cat: Cat): Promise<Cat> {
        return this.repository.save(cat);
    }

    async findByCatId(catId: string): Promise<Cat | null> {
        return this.repository.findOne({ where: { catId } });
    }
}
