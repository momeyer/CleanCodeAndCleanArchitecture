import { Application } from "./Application";
import ShoppingCart from "./domain/entity/ShoppingCart";
import ExpressAdapter from "./infra/http/ExpressAdapter";

export default class Server {
  async run(port: number): Promise<void> {
    const http = new ExpressAdapter();
    const application = new Application(http);
    await application.start();
    application.shoppingCartRepository.add(new ShoppingCart(application.shoppingCartIdGenerator.generate()));

    http.listen(port);
    console.log(`\u001b[32m \t\t\t\t\t\t\t\t\t\t Server is running on port ${port}`);

    process.on("SIGINT", async (): Promise<void> => {
      console.log("\u001b[31m\t\t\t\t\t\t\t\t\t\t Stopping application.\n\t\t\t\t\t\t\t\t\t\t\t BYE BYE!");
      await application.stop();
      process.exit(0);
    });
  }
}
