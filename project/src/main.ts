import { camera, guitar, rubberDuck } from "../test/ProductSamples";
import ProductController from "./infra/controller/ProductController";
import PgPromiseConnectionAdapter from "./infra/database/PgPromiseConnectionAdapter";
import NonPersistentRepositoryFactory from "./infra/factory/NonPersistentRepositoryFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import { NonPersistentOrdersRepository } from "./NonPersistentOrdersRepository";
import { NonPersistentProductRepository } from "./NonPersistentProductRepository";
const PORT = 3000;
const http = new ExpressAdapter();

const connection = new PgPromiseConnectionAdapter();
const productRepository = new NonPersistentProductRepository();
productRepository.add(camera, 100);
productRepository.add(guitar, 100);
productRepository.add(rubberDuck, 100);
const orderRepository = new NonPersistentOrdersRepository();
const repositoryFactory = new NonPersistentRepositoryFactory();
new ProductController(http, productRepository);

console.log(`\u001b[32m Server is running on port ${PORT}`);
http.listen(PORT);