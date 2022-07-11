import ShoppingCart from "./domain/entity/ShoppingCart";
import { ShoppingCartIdGenerator } from "./domain/entity/ShoppingCartIdGenerator";
import ProductController from "./infra/controller/ProductController";
import ShoppingCartController from "./infra/controller/ShoppingCartController";
import MySqlPromiseConnectionAdapter from "./infra/database/MySqlPromiseConnectionAdapter";
import NonPersistentRepositoryFactory from "./infra/factory/NonPersistentRepositoryFactory";
import RepositoryFactory from "./infra/factory/RepositoryFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";

const PORT = 3000;
const http = new ExpressAdapter();

const connection = new MySqlPromiseConnectionAdapter(); // DB
const repositoryFactoryDB = new RepositoryFactory(connection); // DB
const productRepository = repositoryFactoryDB.createProductRepository(); // DB
const repositoryFactory = new NonPersistentRepositoryFactory();
const orderRepository = repositoryFactory.createOrdersRepository();
const discountCodeRepository = repositoryFactory.createDiscountCodeRepository();
const shoppingCartRepository = repositoryFactory.createShoppingCartRepository();
const shoppingCartIdGenerator = new ShoppingCartIdGenerator(1);

new ProductController(http, repositoryFactory);
new ShoppingCartController(
  http,
  productRepository,
  discountCodeRepository,
  shoppingCartRepository,
  shoppingCartIdGenerator
);

shoppingCartRepository.add(new ShoppingCart(shoppingCartIdGenerator.generate()));

console.log(`\u001b[32m Server is running on port ${PORT}`);
http.listen(PORT);
