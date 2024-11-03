import { Cat } from "../entities/Cat";

export interface CatRepository {
    findAll(): Promise<Cat[]>;
    create(cat: Cat): Promise<Cat>;
    findByCatId(catId: string): Promise<Cat | null>;

}
