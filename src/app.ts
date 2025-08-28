import cors from "cors";
import "dotenv/config";
import express from "express";
import { handleError } from "./app.error";
import { ValidateSubdomainMiddleware } from "./common/middlewares/ValidateSubdomainMiddleware";
import { env } from "./configs/env.config";
import { Routes } from "./modules/routes";

const app = express();

const whitelist = [
  env.FRONT_URL.replace(/\/fs$/, ""),
  env.FRONT_DEV_URL.replace(/\/fs$/, ""),
];

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    // Permite requisições sem 'origin' (ex: apps mobile, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }

    // Verifica se a origem está na nossa lista de permissões estáticas
    if (whitelist.indexOf(origin) !== -1) {
      return callback(null, true);
    }

    // A mágica acontece aqui: verifica se a origem termina com o seu domínio principal
    // const allowedDomain = ".diegogaspar.dev.br";
    // if (new URL(origin).hostname.endsWith(allowedDomain)) {
    //   return callback(null, true);
    // }

    // Se a origem não for permitida, rejeita a requisição
    callback(new Error("Not allowed by CORS"));
  },
  // Adicione esta linha se você precisar enviar cookies ou tokens de autorização
  credentials: true,
};

app.use(ValidateSubdomainMiddleware);
app.use(cors(corsOptions));
app.use(express.json());

const routes = new Routes();
app.use("/as/", routes.execute());
app.use(handleError);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
