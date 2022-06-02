import axios from "axios";

test.skip("Should list products", async function (): Promise<void> {
    const response = await axios({
        url: "http://localhost:3000/products",
        method: "get",
    });
    let test = { id: 1, description: 'Camera', price: 10 };

});
