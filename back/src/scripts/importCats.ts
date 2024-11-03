import axios from "axios";
import { AppDataSource } from "../infrastructure/database/data-source";
import { Cat } from "../domain/entities/Cat";

export async function importCats() {
    try {
        const response = await axios.get("https://data.latelier.co/cats.json");
        const cats = response.data.images;

        for (const catData of cats) {
            const existingCat = await AppDataSource.getRepository(Cat).findOne({
                where: { catId: catData.id },
            });

            if (!existingCat) {
                const cat = new Cat();
                cat.catId = catData.id;
                cat.url = catData.url;

                await AppDataSource.getRepository(Cat).save(cat);
                console.log(`Cat ${cat.catId} imported successfully.`);
            } else {
                console.log(`Cat ${catData.id} already exists, skipping.`);
            }
        }

        console.log("All cats have been imported successfully!");
    } catch (error) {
        console.error("Error importing cats:", error);
    }
}
