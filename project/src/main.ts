// import { camera, guitar, rubberDuck } from "../test/ProductSamples";
// import ShoppingCart from "./domain/entity/ShoppingCart";
// import { ShoppingCartIdGenerator } from "./domain/entity/ShoppingCartIdGenerator";
// import ProductController from "./infra/controller/ProductController";
// import ShoppingCartController from "./infra/controller/ShoppingCartController";
// import PgPromiseConnectionAdapter from "./infra/database/mySqlPromiseConnectionAdapter";
// import NonPersistentRepositoryFactory from "./infra/factory/NonPersistentRepositoryFactory";
// import ExpressAdapter from "./infra/http/ExpressAdapter";
// const PORT = 3000;
// const http = new ExpressAdapter();
import MySqlPromiseConnectionAdapter from "./infra/database/MySqlPromiseConnectionAdapter";


// const repositoryFactory = new NonPersistentRepositoryFactory();
// const connection = new PgPromiseConnectionAdapter();
// const productRepository = repositoryFactory.createProductRepository();
// const orderRepository = repositoryFactory.createOrdersRepository();
// const discountCodeRepository = repositoryFactory.createDiscountCodeRepository();
// const shoppingCartRepository = repositoryFactory.createShoppingCartRepository();
// const shoppingCartIdGenerator = new ShoppingCartIdGenerator(1);


// productRepository.add(camera, 100);
// productRepository.add(guitar, 100);
// productRepository.add(rubberDuck, 100);
// new ProductController(http, productRepository);
// new ShoppingCartController(http, productRepository, discountCodeRepository, shoppingCartRepository, shoppingCartIdGenerator);

// shoppingCartRepository.add(new ShoppingCart(shoppingCartIdGenerator.generate()))

// console.log(`\u001b[32m Server is running on port ${PORT}`);
// http.listen(PORT);

async function mofadocker() {
    let myconnection = new MySqlPromiseConnectionAdapter();
    await myconnection.connect();
    const products = await myconnection.query('select * from product');
    console.log(products);
    await myconnection.close();
}


mofadocker();



// async function runAwait() {
//     const connection = await mysql.createConnection({
//         user: 'root',
//         password: '101086',
//         database: 'test'
//     });

//     const test = await connection.query<{ id: number, description: string, height: number, width: number, depth: number, weight: number, price: number }[]>('select * from product');

//     test.forEach(test => {
//         console.log(`id: ${test.id}\n\tdescription: ${test.description}\n\theight: ${test.height}\n\twidth: ${test.width}\n\tdepth: ${test.depth}\n\tweight: ${test.weight}\n\tprice: ${test.price}`);
//     });

//     connection.end();
// }

// runAwait();