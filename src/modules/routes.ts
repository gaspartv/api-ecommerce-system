import { Router } from "express";
import { ValidationSchemaZodMiddleware } from "../common/middlewares/ValidationSchemaZodMiddleware";
import { VerifyTokenMiddleware } from "../common/middlewares/VerifyTokenMiddleware";
import { AuthControllerFactory } from "../factory/AuthControllerFactory";
import { BusinessesControllerFactory } from "../factory/BusinessesControllerFactory";
import { UsersSystemControllerFactory } from "../factory/UsersSystemControllerFactory";
import { SchemaZod } from "../schemas/SchemaZod";
import { AuthController } from "./auth/AuthController";
import { BusinessController } from "./business/BusinessController";
import { UsersSystemController } from "./users/UsersSystemController";

export class Routes {
  protected authController: AuthController;
  protected businessController: BusinessController;
  protected usersController: UsersSystemController;

  constructor() {
    this.authController = AuthControllerFactory.execute();
    this.businessController = BusinessesControllerFactory.execute();
    this.usersController = UsersSystemControllerFactory.execute();
  }

  execute() {
    const router = Router();
    this.authRoutes(router);
    this.businessesRoutes(router);
    this.usersRoutes(router);
    return router;
  }

  private authRoutes(router: Router) {
    router.post(
      "/signin",
      ValidationSchemaZodMiddleware.execute({
        schemaBody: SchemaZod.signin(),
      }),
      this.authController.signin
    );
  }

  private businessesRoutes(router: Router) {
    router.post(
      "/business",
      VerifyTokenMiddleware.execute,
      ValidationSchemaZodMiddleware.execute({
        schemaBody: SchemaZod.businessCreate(),
      }),
      this.businessController.create
    );

    router.put(
      "/business",
      VerifyTokenMiddleware.execute,
      ValidationSchemaZodMiddleware.execute({
        schemaBody: SchemaZod.businessUpdate(),
      }),
      this.businessController.update
    );

    router.get(
      "/business",
      VerifyTokenMiddleware.execute,
      ValidationSchemaZodMiddleware.execute({
        schemaQuery: SchemaZod.businessGet(),
      }),
      this.businessController.get
    );
  }

  private usersRoutes(router: Router) {
    router.get(
      "/users/profile",
      VerifyTokenMiddleware.execute,
      this.usersController.getProfile
    );
  }
}
