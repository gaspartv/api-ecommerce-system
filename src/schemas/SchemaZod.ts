import { z } from "zod";

export class SchemaZod {
  static signin() {
    return z.object({
      email: z.email("Email inválido").min(1, "Email é obrigatório."),
      password: z.string().min(1, "Senha é obrigatória."),
    });
  }

  static businessCreate() {
    return z.object({
      name: z.string().min(1, "Nome da empresa é obrigatório."),
    });
  }

  static businessUpdate() {
    return z.object({
      id: z.string().min(1, "ID da empresa é obrigatório."),
      name: z.string().min(1, "Nome da empresa é obrigatório."),
      deleted: z.boolean({ message: "Campo de exclusão é obrigatório." }),
      disabled: z.boolean({ message: "Campo de desativação é obrigatório." }),
    });
  }

  static businessGet() {
    return z.object({
      id: z.string().optional(),
      code: z.string().optional(),
      search: z.string().optional(),
      disabled: z
        .enum(["true", "false"], { message: "deve ser 'true' ou 'false'." })
        .optional(),

      page: z.coerce.number().positive("Página deve ser positiva").optional(),
      size: z.coerce
        .number()
        .positive("Limite deve ser positivo")
        .max(100, "Limite máximo é 100")
        .optional(),
      sort_by: z
        .enum(
          [
            "code",
            "created_at",
            "updated_at",
            "deleted_at",
            "disabled",
            "name",
          ],
          {
            message: "Campo de ordenação inválido",
          }
        )
        .optional(),
      order: z
        .enum(["asc", "desc"], {
          message: "Ordem deve ser 'asc' ou 'desc'",
        })
        .optional(),
    });
  }
}
