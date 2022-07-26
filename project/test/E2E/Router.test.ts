import axios from "axios";
import { Application } from "../../src/Application";
import ExpressAdapter from "../../src/infra/http/ExpressAdapter";

describe.skip("API tests", () => {
  beforeEach(async () => {
    await axios({
      url: "http://localhost:3000/shoppingCart/SC1/clear",
      method: "post",
    });
  });
  describe("GET /products", () => {
    test("Should list products", async function (): Promise<void> {
      const response = await axios({
        url: "http://localhost:3000/products",
        method: "get",
      });
      expect(response).toHaveLength(4);
    });
  });

  describe("GET /ShoppingCart/:ShoppingCartID", () => {
    test("Should get shopping cart by ID", async function (): Promise<void> {
      let response = await axios({
        url: "http://localhost:3000/ShoppingCart/SC1",
        method: "get",
      });
      expect(response.data).toStrictEqual({
        items: [],
        subtotal: 0,
        total: 0,
        shippingCost: 0,
      });
    });
  });

  describe("POST /ShoppingCart/:ShoppingCartID - add product", () => {
    test("Should fail to add invalid product to shopping cart", async function (): Promise<void> {
      let response = await axios({
        url: "http://localhost:3000/ShoppingCart/SC1",
        method: "post",
        data: {
          productId: 100,
          quantity: 2,
        },
      });
      expect(response.data).toStrictEqual({
        items: [],
        subtotal: 0,
        total: 0,
        shippingCost: 0,
      });
    });

    test("Should add product to shopping cart", async function (): Promise<void> {
      let response = await axios({
        url: "http://localhost:3000/ShoppingCart/SC1",
        method: "post",
        data: {
          productId: 1,
          quantity: 2,
        },
      });
      expect(response.data).toStrictEqual({
        items: [{ id: 1, price: 10, quantity: 2 }],
        subtotal: 21,
        total: 41,
        shippingCost: 20,
      });
      response = await axios({
        url: "http://localhost:3000/ShoppingCart/SC1",
        method: "post",
        data: {
          productId: 2,
          quantity: 4,
        },
      });
      expect(response.data).toStrictEqual({
        items: [
          {
            id: 1,
            price: 10,
            quantity: 2,
          },
          {
            id: 2,
            price: 20,
            quantity: 4,
          },
        ],
        subtotal: 105,
        total: 245,
        shippingCost: 140,
      });
    });
  });

  describe("POST /ShoppingCart/:ShoppingCartID - clear", () => {
    test("Should clear products from shopping cart", async function (): Promise<void> {
      let response = await axios({
        url: "http://localhost:3000/ShoppingCart/SC1",
        method: "post",
        data: {
          productId: 1,
          quantity: 2,
        },
      });
      expect(response.data).toStrictEqual({
        items: [{ id: 1, price: 10, quantity: 2 }],
        subtotal: 21,
        total: 41,
        shippingCost: 20,
      });

      response = await axios({
        url: "http://localhost:3000/shoppingCart/SC1/clear",
        method: "post",
      });
      expect(response.data).toStrictEqual({
        items: [],
        subtotal: 0,
        total: 0,
        shippingCost: 0,
      });
    });
  });

  describe("POST /ShoppingCart/:ShoppingCartID - discount code", () => {
    test("Should fail to apply invalid discount code to shopping cart", async function (): Promise<void> {
      let response = await axios({
        url: "http://localhost:3000/shoppingCart/SC1/discount",
        method: "post",
        data: {
          discountCode: "get20",
        },
      });

      expect(response.data).toStrictEqual({ ErrorType: "Failed to apply discount code get20" });
    });

    test("Should fail to apply expired discount code to shopping cart", async function (): Promise<void> {
      let response = await axios({
        url: "http://localhost:3000/shoppingCart/SC1/discount",
        method: "post",
        data: {
          discountCode: "getExpired",
        },
      });

      expect(response.data).toStrictEqual({ ErrorType: "Failed to apply discount code getExpired" });
    });

    test("Should apply discount code to shopping cart", async function (): Promise<void> {
      let response = await axios({
        url: "http://localhost:3000/ShoppingCart/SC1",
        method: "post",
        data: {
          productId: 1,
          quantity: 2,
        },
      });

      expect(response.data).toStrictEqual({
        items: [{ id: 1, price: 10, quantity: 2 }],
        subtotal: 21,
        total: 41,
        shippingCost: 20,
      });

      response = await axios({
        url: "http://localhost:3000/shoppingCart/SC1/discount",
        method: "post",
        data: {
          discountCode: "get30",
        },
      });

      expect(response.data).toStrictEqual({
        discount: 0.3,
        items: [
          {
            id: 1,
            price: 10,
            quantity: 2,
          },
        ],
        shippingCost: 20,
        subtotal: 14.7,
        total: 34.7,
      });
    });

    describe("POST /order/place", () => {
      test("Should fail to place order with invalid shopping cart Id", async function (): Promise<void> {
        let response = await axios({
          url: "http://localhost:3000/order/place",
          method: "post",
          data: {
            cpf: "111.444.777-35",
            shoppingCartId: "SC5",
            date: new Date("2021-01-10"),
          },
        });

        expect(response.data).toStrictEqual({
          date: "2021-01-10T00:00:00.000Z",
          message: "Empty order",
          status: "INVALID",
        });
      });

      test("Should place order", async function (): Promise<void> {
        let response = await axios({
          url: "http://localhost:3000/ShoppingCart/SC1",
          method: "post",
          data: {
            productId: 1,
            quantity: 2,
          },
        });

        response = await axios({
          url: "http://localhost:3000/order/place",
          method: "post",
          data: {
            cpf: "111.444.777-35",
            shoppingCartId: "SC1",
            date: new Date("2022-01-10"),
          },
        });

        expect(response.data).toStrictEqual({
          date: "2022-01-10T00:00:00.000Z",
          id: "202200000001",
          items:
            '[{"productId":1,"productDetails":{"height_cm":20,"width_cm":15,"depth_cm":10,"weight_kg":1},"quantity":2,"price":10}]',
          status: "PENDING",
        });
      });
    });
    describe("POST /internal/order/:orderId", () => {
      test("Should fail to place order", async function (): Promise<void> {
        let response = await axios({
          url: "http://localhost:3000/internal/order/202200000001",
          method: "post",
          data: {
            status: "COMPLETE",
          },
        });

        expect(response.data).toStrictEqual(true);
      });
    });
  });
});

// describe.only("Test App", () => {
//   const request = require("supertest");
//   // const http = new ExpressAdapter();
//   // const myApp = new Application(http);

//   // http.on("get", "/products", async function (params: any, body: any): Promise<any> {
//   //   console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeello");
//   //   return { test: "hello" };
//   // });

//   test("GET /", (done) => {
//     const app = require("express")();
//     app.get("/products", function (req: any, res: any) {
//       res.status(200).json({
//         message: "https://example.com/",
//         status: "success",
//       });
//     });
//     request(app).get("/products").expect("Content-Type", /json/);
//     // Logic goes here
//   });
// });

// describe("Test App", () => {
//   const request = require("supertest");
//   const http = new ExpressAdapter();
//   const application = new Application(http);
//   const app = http.app;

//   afterEach(async () => {
//   });
//   test("router list products", async () => {
//     const response = await request(app).get("/products");
//     expect(response.status).toBe(200);
//     expect(response.body).toStrictEqual({
//       list: [
//         {
//           description: "Camera",
//           id: 1,
//           price: 10,
//         },
//         {
//           description: "Guitar",
//           id: 2,
//           price: 20,
//         },
//         {
//           description: "Rubber_Duck",
//           id: 3,
//           price: 1,
//         },
//         {
//           description: "tshirt",
//           id: 4,
//           price: 100,
//         },
//       ],
//     });
//   });
// });

describe("API tests", () => {
  const request = require("supertest");
  const http = new ExpressAdapter();
  const application = new Application(http);
  const app = http.app;

  describe("GET /products", () => {
    beforeAll(async () => {
      await application.connection.connect();
    });
    afterAll(async () => {
      await application.connection.close();
    });

    test("Should list products", async function (): Promise<void> {
      const response = await request(app).get("/products");
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        list: [
          {
            description: "Camera",
            id: 1,
            price: 10,
          },
          {
            description: "Guitar",
            id: 2,
            price: 20,
          },
          {
            description: "Rubber_Duck",
            id: 3,
            price: 1,
          },
          {
            description: "tshirt",
            id: 4,
            price: 100,
          },
        ],
      });
    });
  });

  describe("GET /ShoppingCart/:ShoppingCartID", () => {
    beforeAll(async () => {
      await application.connection.connect();
    });
    afterAll(async () => {
      await application.connection.close();
    });
    test("Should get shopping cart by ID", async function (): Promise<void> {
      const response = await request(app).get("/ShoppingCart/SC1");
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ items: [], subtotal: 0, total: 0, shippingCost: 0 });
    });
  });

  describe("POST /ShoppingCart/:ShoppingCartID - add product", () => {
    beforeAll(async () => {
      await application.connection.connect();
    });
    afterAll(async () => {
      await application.connection.close();
    });
    test("Should fail to add invalid product to shopping cart", async function (): Promise<void> {
      const response = await request(app).post("/ShoppingCart/SC1").send({
        productId: 100,
        quantity: 2,
      });
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ items: [], subtotal: 0, total: 0, shippingCost: 0 });
    });

    test("Should add product to shopping cart", async function (): Promise<void> {
      let response = await request(app).post("/ShoppingCart/SC1").send({
        productId: 1,
        quantity: 2,
      });
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        items: [{ id: 1, price: 10, quantity: 2 }],
        subtotal: 21,
        total: 41,
        shippingCost: 20,
      });
      response = await request(app).post("/ShoppingCart/SC1").send({
        productId: 2,
        quantity: 4,
      });
      expect(response.body).toStrictEqual({
        items: [
          {
            id: 1,
            price: 10,
            quantity: 2,
          },
          {
            id: 2,
            price: 20,
            quantity: 4,
          },
        ],
        subtotal: 105,
        total: 245,
        shippingCost: 140,
      });
    });
  });

  describe("POST /ShoppingCart/:ShoppingCartID - clear", () => {
    beforeAll(async () => {
      await application.connection.connect();
    });
    afterAll(async () => {
      await application.connection.close();
    });
    test("Should clear products from shopping cart", async function (): Promise<void> {
      let response = await request(app).get("/ShoppingCart/SC1");
      expect(response.body.items.length).toBeGreaterThan(0);

      response = await request(app).post("/ShoppingCart/SC1/clear");
      expect(response.body).toStrictEqual({
        items: [],
        subtotal: 0,
        total: 0,
        shippingCost: 0,
      });
    });
  });

  describe("POST /ShoppingCart/:ShoppingCartID - discount code", () => {
    beforeAll(async () => {
      await application.connection.connect();
    });
    afterAll(async () => {
      await application.connection.close();
    });
    test("Should fail to apply invalid discount code to shopping cart", async function (): Promise<void> {
      let response = await request(app).post("/ShoppingCart/SC1/discount").send({
        discountCode: "get20",
      });
      expect(response.body).toStrictEqual({ ErrorType: "Failed to apply discount code get20" });
    });

    test("Should fail to apply expired discount code to shopping cart", async function (): Promise<void> {
      let response = await request(app).post("/ShoppingCart/SC1/discount").send({
        discountCode: "getExpired",
      });

      expect(response.body).toStrictEqual({ ErrorType: "Failed to apply discount code getExpired" });
    });

    test("Should apply discount code to shopping cart", async function (): Promise<void> {
      let response = await request(app).post("/ShoppingCart/SC1").send({
        productId: 1,
        quantity: 2,
      });

      expect(response.body).toBeDefined();

      response = await request(app).post("/ShoppingCart/SC1/discount").send({
        discountCode: "get30",
      });

      expect(response.body.discount).toBe(0.3);
      expect(response.body.shippingCost).toBe(20);
      expect(response.body.subtotal).toBe(14.7);
      expect(response.body.total).toBe(34.7);
    });
  });

  describe("POST /order/place", () => {
    beforeEach(async () => {
      await application.orderRepository.clear();
    });
    beforeAll(async () => {
      await application.connection.connect();
    });
    afterAll(async () => {
      await application.connection.close();
    });
    test("Should fail to place order with invalid shopping cart Id", async function (): Promise<void> {
      let response = await request(app)
        .post("/order/place")
        .send({
          cpf: "111.444.777-35",
          shoppingCartId: "SC5",
          date: new Date("2021-01-10"),
        });

      expect(response.body).toStrictEqual({
        date: "2021-01-10T00:00:00.000Z",
        message: "Empty order",
        status: "INVALID",
      });
    });

    test("Should place order", async function (): Promise<void> {
      let response = await request(app).post("/ShoppingCart/SC1").send({
        productId: 1,
        quantity: 2,
      });

      response = await request(app)
        .post("/order/place")
        .send({
          cpf: "111.444.777-35",
          shoppingCartId: "SC1",
          date: new Date("2022-01-10"),
        });

      expect(response.body).toStrictEqual({
        date: "2022-01-10T00:00:00.000Z",
        id: "202200000001",
        items:
          '[{"productId":1,"productDetails":{"height_cm":20,"width_cm":15,"depth_cm":10,"weight_kg":1},"quantity":2,"price":10}]',
        status: "PENDING",
      });
    });
  });
  describe("POST /internal/order/:orderId", () => {
    beforeAll(async () => {
      await application.connection.connect();
      await application.orderRepository.clear();
    });
    afterAll(async () => {
      await application.connection.close();
    });
    test("Should fail to update place order", async function (): Promise<void> {
      await request(app).post("/ShoppingCart/SC1").send({
        productId: 1,
        quantity: 2,
      });

      const order = await request(app)
        .post("/order/place")
        .send({
          cpf: "111.444.777-35",
          shoppingCartId: "SC1",
          date: new Date("2022-01-10"),
        });

      let response = await request(app).post(`/internal/order/${order.body.id}`).send({
        status: "COMPLETE",
      });

      console.log(response);
      expect(response.body).toStrictEqual(true);
    });
  });
});
