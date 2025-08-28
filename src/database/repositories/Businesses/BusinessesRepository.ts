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
      `INSERT INTO businesses (id, code, created_at, updated_at, deleted_at, disabled, name, responsible, email, phone, cnpj, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *`,
      [
        cuid(),
        CodeGeneratorUtil.execute(),
        new Date(),
        new Date(),
        null,
        false,
        dto.name,
        dto.responsible,
        dto.email,
        dto.phone,
        dto.cnpj,
        dto.notes,
      ]
    );
  }

  async update(dto: BusinessesUpdateDto) {
    const business = await this.findById(dto.id);

    const deletedAt = dto.deleted ? new Date() : null;

    return await db.one(
      `UPDATE businesses SET name = $1, responsible = $2, email = $3, phone = $4, cnpj = $5, notes = $6, deleted_at = $7, disabled = $8 WHERE id = $9 RETURNING *`,
      [
        dto.name || business.name,
        dto.responsible || business.responsible,
        dto.email || business.email,
        dto.phone || business.phone,
        dto.cnpj || business.cnpj,
        dto.notes || business.notes,
        deletedAt,
        dto.disabled || business.disabled,
        dto.id,
      ]
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
