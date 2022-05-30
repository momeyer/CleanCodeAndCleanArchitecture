import axios from "axios";

test.skip("Deve chamar /", async function (): Promise<void> {
    const response = await axios({
        url: "http://localhost:3000/",
        method: "get",
    });
    expect(response.data).toBe("Hello World!");
    expect(response.status).toBe(200);
});


test.skip("Deve chamar /hello", async function (): Promise<void> {
    const response = await axios({
        url: "http://localhost:3000/hello",
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            Permissions: 'hello:hello',
        },
    });
    expect(response.data).toBe("Hello World!");
    expect(response.status).toBe(200);
});