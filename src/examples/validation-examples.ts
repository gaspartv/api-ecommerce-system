import * as yup from "yup";

// Exemplo 1: Validação apenas do body (compatível com versão anterior)
const bodyOnlySchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  age: yup
    .number()
    .positive("Idade deve ser positiva")
    .required("Idade é obrigatória"),
});

// Uso: ValidationSchemaMiddleware.execute(bodyOnlySchema)

// Exemplo 2: Validação separada de body e query params
const bodySchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
});

const querySchema = yup.object({
  page: yup.number().positive("Página deve ser positiva").default(1),
  limit: yup
    .number()
    .positive("Limite deve ser positivo")
    .max(100, "Limite máximo é 100")
    .default(10),
  sort: yup
    .string()
    .oneOf(["name", "email", "created_at"], "Campo de ordenação inválido")
    .optional(),
  order: yup
    .string()
    .oneOf(["asc", "desc"], "Ordem deve ser 'asc' ou 'desc'")
    .default("asc"),
});

// Uso: ValidationSchemaMiddleware.execute({ body: bodySchema, query: querySchema })

// Exemplo 3: Validação apenas de query params
const queryOnlySchema = yup.object({
  search: yup
    .string()
    .min(3, "Busca deve ter pelo menos 3 caracteres")
    .optional(),
  category: yup.string().required("Categoria é obrigatória"),
});

// Uso: ValidationSchemaMiddleware.execute({ query: queryOnlySchema })

export { bodyOnlySchema, bodySchema, queryOnlySchema, querySchema };
