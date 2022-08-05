import { OrderIdGenerator } from "./domain/entity/OrderIdGenerator";
import ShoppingCart from "./domain/entity/ShoppingCart";
import { ShoppingCartIdGenerator } from "./domain/entity/ShoppingCartIdGenerator";
import { DiscountCodeRepository } from "./domain/repository/DiscountCodeRepository";
import { OrdersRepository } from "./domain/repository/OrdersRepository";
import { ProductRepository } from "./domain/repository/ProductRepository";
import { ShoppingCartRepository } from "./domain/repository/ShoppingCartRepository";
import StockEntryRepository from "./domain/repository/StockEntryRepository";
import OrderController from "./infra/controller/OrderController";
import ProductController from "./infra/controller/ProductController";
import ShoppingCartController from "./infra/controller/ShoppingCartController";
import StockController from "./infra/controller/StockController";
import MySqlPromiseConnectionAdapter from "./infra/database/MySqlPromiseConnectionAdapter";
import RepositoryFactory from "./infra/factory/RepositoryFactory";
import Http from "./infra/http/Http";
import NonPersistentQueueAdapter from "./infra/queue/NonPersistentQueueAdapter";
import Queue from "./infra/queue/Queue";
import { AddToStock } from "./useCases/Stock";

export class Application {
  http: Http;
  connection: MySqlPromiseConnectionAdapter; // DB
  repositoryFactoryDB: RepositoryFactory; // DB
  productRepository: ProductRepository; // DB
  stockRepository: StockEntryRepository; // DB
  orderRepository: OrdersRepository;
  discountCodeRepository: DiscountCodeRepository; // DB
  shoppingCartRepository: ShoppingCartRepository;
  shoppingCartIdGenerator: ShoppingCartIdGenerator;
  orderIdGenerator: OrderIdGenerator;
  productController: ProductController;
  shoppingCartController: ShoppingCartController;
  orderController: OrderController;
  stockController: StockController;
  queue: Queue;

  constructor(http: Http) {
    this.http = http;
    this.connection = new MySqlPromiseConnectionAdapter(); // DB
    this.repositoryFactoryDB = new RepositoryFactory(this.connection); // DB
    this.productRepository = this.repositoryFactoryDB.createProductRepository();
    this.stockRepository = this.repositoryFactoryDB.createStockEntryRepository();
    this.orderRepository = this.repositoryFactoryDB.createOrdersRepository();
    this.discountCodeRepository = this.repositoryFactoryDB.createDiscountCodeRepository();
    this.shoppingCartRepository = this.repositoryFactoryDB.createShoppingCartRepository();
    this.shoppingCartIdGenerator = new ShoppingCartIdGenerator(0);
    this.orderIdGenerator = new OrderIdGenerator(0);
    this.queue = new NonPersistentQueueAdapter();
    this.productController = new ProductController(http, this.repositoryFactoryDB);
    this.shoppingCartController = new ShoppingCartController(
      this.http,
      this.productRepository,
      this.stockRepository,
      this.discountCodeRepository,
      this.shoppingCartRepository,
      this.shoppingCartIdGenerator
    );

    this.orderController = new OrderController(
      this.http,
      this.orderRepository,
      this.productRepository,
      this.stockRepository,
      this.orderIdGenerator,
      this.shoppingCartRepository,
      this.queue
    );
    this.stockController = new StockController(this.queue, this.stockRepository);

    this.shoppingCartRepository.add(new ShoppingCart(this.shoppingCartIdGenerator.generate()));
  }

  async start(): Promise<void> {
    await this.connection.connect();
    const addStock = new AddToStock(this.stockRepository);
    await addStock.execute(1, 100);
    await addStock.execute(2, 100);
    await addStock.execute(3, 100);
    await addStock.execute(4, 100);
  }
  async stop(): Promise<void> {
    await this.connection.close();
  }
}
