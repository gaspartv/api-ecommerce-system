import cuid from "cuid";
import { BusinessesCreateDto } from "../../../modules/business/interfaces/BusinessesCreateDto";
import { BusinessesUpdateDto } from "../../../modules/business/interfaces/BusinessesUpdateDto";
import { CodeGeneratorUtil } from "../../../utils/code-generator.util";
import db from "../../db";

export class BusinessesRepository {
  findByName(name: string) {
    return db.oneOrNone("SELECT * FROM businesses WHERE name = $1", [name]);
  }

  async findById(id: string) {
    const business = await db
      .oneOrNone(
        `
        SELECT
          b.id,
          b.code,
          b.created_at,
          b.updated_at,
          b.deleted_at,
          b.disabled,
          b.name,
          b.responsible,
          b.email,
          b.phone,
          b.cnpj,
          b.notes,
          jsonb_agg(
            jsonb_build_object(
              'id', ba.id,
              'code', ba.code,
              'disabled', ba.disabled,
              'name', ba.name,
              'zip_code', ba.zip_code,
              'address', ba.address,
              'number', ba.number,
              'complement', ba.complement,
              'neighborhood', ba.neighborhood,
              'city', ba.city,
              'state', ba.state,
              'country', ba.country
            )
          ) AS addresses
        FROM businesses b
        LEFT JOIN business_addresses ba ON b.code = ba.business_code
        WHERE b.id = $1
        GROUP BY b.id
        `,
        [id]
      )
      .catch((e) => console.log("Erro ao buscar empresa por ID", e));

    return business;
  }

  create(dto: BusinessesCreateDto) {
    return db.one(
      `INSERT INTO businesses (id, code, created_at, updated_at, deleted_at, disabled, name)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
      [
        cuid(),
        CodeGeneratorUtil.execute(),
        new Date(),
        new Date(),
        null,
        false,
        dto.name,
      ]
    );
  }

  update(dto: BusinessesUpdateDto) {
    const deletedAt = dto.deleted ? new Date() : null;
    return db.one(
      `UPDATE businesses SET name = $1, deleted_at = $2, disabled = $3 WHERE id = $4 RETURNING *`,
      [dto.name, deletedAt, dto.disabled, dto.id]
    );
  }

  async get(handledQueryOptions: string, handleQueryWhere: string) {
    const total = await db.oneOrNone(
      `SELECT COUNT(*) FROM businesses WHERE deleted_at IS NULL ${handleQueryWhere}`
    );
    const businesses = await db.manyOrNone(
      `SELECT * FROM businesses WHERE deleted_at IS NULL ${handleQueryWhere} ${handledQueryOptions}`
    );
    return {
      total: total.count ? parseInt(total.count, 10) : 0,
      businesses: businesses || [],
    };
  }
}
