import { testDataSource } from "../src/config/ormconfig.test";
import { Cat } from "../src/domain/entities/Cat";

beforeAll(async () => {
    if (!testDataSource.isInitialized) {
        await testDataSource.initialize();
    }
});

afterAll(async () => {
    if (testDataSource.isInitialized) {
        await testDataSource.destroy();
    }
});

beforeEach(async () => {
    const catRepository = testDataSource.getRepository(Cat);

    await catRepository.clear();

    await catRepository.save([
        { catId: "1", url: "http://24.media.tumblr.com/tumblr_m82woaL5AD1rro1o5o1_1280.jpg" },
        { catId: "2", url: "http://24.media.tumblr.com/tumblr_m29a9d62C81r2rj8po1_500.jpg" },
    ]);

    const insertedCats = await catRepository.find();
    console.log("Inserted Cats:", insertedCats);
});
