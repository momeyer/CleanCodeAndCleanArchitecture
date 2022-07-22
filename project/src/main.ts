import { OrderIdGenerator } from "./domain/entity/OrderIdGenerator";
import ShoppingCart from "./domain/entity/ShoppingCart";
import { ShoppingCartIdGenerator } from "./domain/entity/ShoppingCartIdGenerator";
import OrderController from "./infra/controller/OrderController";
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
const orderRepository = repositoryFactoryDB.createOrdersRepository();
const discountCodeRepository = repositoryFactory.createDiscountCodeRepository();
const shoppingCartRepository = repositoryFactory.createShoppingCartRepository();
const shoppingCartIdGenerator = new ShoppingCartIdGenerator(0);
const orderIdGenerator = new OrderIdGenerator(0);

new ProductController(http, repositoryFactoryDB);
new ShoppingCartController(
  http,
  productRepository,
  discountCodeRepository,
  shoppingCartRepository,
  shoppingCartIdGenerator
);

new OrderController(http, orderRepository, productRepository, orderIdGenerator, shoppingCartRepository);

shoppingCartRepository.add(new ShoppingCart(shoppingCartIdGenerator.generate()));

console.log(`\u001b[32m Server is running on port ${PORT}`);
http.listen(PORT);
