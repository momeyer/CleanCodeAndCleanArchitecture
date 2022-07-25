import Application from "./Application";
import ExpressAdapter from "./infra/http/ExpressAdapter";

const PORT = 3000;
const http = new ExpressAdapter();

const application = new Application(http);

console.log(`\u001b[32m Server is running on port ${PORT}`);

http.listen(PORT);
