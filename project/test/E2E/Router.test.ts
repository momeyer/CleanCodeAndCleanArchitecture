import axios from "axios";

describe("API tests", () => {
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
      let test = { id: 1, description: "Camera", price: 10 };
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
      test("Should fail to place order", async function (): Promise<void> {
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

// test("Should fail to place order", async function (): Promise<void> {
//   let response = await axios({
//     url: "http://localhost:3000/ShoppingCart/SC1",
//     method: "post",
//     data: {
//       productId: 1,
//       quantity: 2,
//     },
//   });

//   expect(response.data).toStrictEqual({
//     items: [{ id: 1, price: 10, quantity: 2 }],
//     subtotal: 21,
//     total: 41,
//     shippingCost: 20,
//   });

//   response = await axios({
//     url: "http://localhost:3000/shoppingCart/SC1/discount",
//     method: "post",
//     data: {
//       discountCode: "get30",
//     },
//   });

//   expect(response.data).toStrictEqual({
//     discount: 0.3,
//     items: [
//       {
//         id: 1,
//         price: 10,
//         quantity: 2,
//       },
//     ],
//     shippingCost: 20,
//     subtotal: 14.7,
//     total: 34.7,
//   });
// });

// describe("Test App", () => {
//   const request = require("supertest");
//   let application: Application;

//   test("GET /", (done) => {
//     const express = new ExpressAdapter();
//     const myApp = new Application(express);
//     request(express.app).get("/products").expect("Content-Type", /json/);
//     // Logic goes here
//   });
// });
