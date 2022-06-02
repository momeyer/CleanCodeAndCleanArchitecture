import { camera, guitar, rubberDuck } from "../test/ProductSamples";
import ProductController from "./infra/controller/ProductController";
import PgPromiseConnectionAdapter from "./infra/database/PgPromiseConnectionAdapter";
import NonPersistentRepositoryFactory from "./infra/factory/NonPersistentRepositoryFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";
const PORT = 3000;
const http = new ExpressAdapter();

const repositoryFactory = new NonPersistentRepositoryFactory();
const connection = new PgPromiseConnectionAdapter();
const productRepository = repositoryFactory.createProductRepository();
const orderRepository = repositoryFactory.createOrdersRepository();
productRepository.add(camera, 100);
productRepository.add(guitar, 100);
productRepository.add(rubberDuck, 100);
new ProductController(http, productRepository);


console.log(`\u001b[32m Server is running on port ${PORT}`);
http.listen(PORT);