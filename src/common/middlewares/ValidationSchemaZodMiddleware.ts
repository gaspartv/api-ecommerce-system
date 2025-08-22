import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { AppError } from "../../app.error";

interface IValidationSchema {
  schemaBody?: ZodSchema;
  schemaQuery?: ZodSchema;
}

export class ValidationSchemaZodMiddleware {
  static execute({ schemaBody, schemaQuery }: IValidationSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (schemaBody) {
          const validatedBody = await schemaBody.parseAsync(req.body);
          req.body = validatedBody;
        }

        if (schemaQuery) {
          const validatedQuery = await schemaQuery.parseAsync(req.query);
          Object.assign(req.query, validatedQuery);
        }

        return next();
      } catch (error: ZodError | any) {
        console.error(error.issues);
        const errors =
          error?.issues?.map((err: any) => ({
            field: err.path[0],
            message: err.message,
          })) || [];

        // console.error("Validation errors:", errors);

        throw new AppError("Campos inválidos.", 422, errors);
      }
    };
  }
}
