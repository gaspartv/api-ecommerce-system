import cuid from "cuid";
import { BusinessAddressesCreateDto } from "../../../modules/business-address/interfaces/BusinessAddressesCreateDto";
import {
  BusinessAddressesUpdateDto,
  BusinessAddressesUpdateManyDto,
} from "../../../modules/business-address/interfaces/BusinessAddressesUpdateDto";
import { CodeGeneratorUtil } from "../../../utils/code-generator.util";
import db from "../../db";

export class BusinessAddressesRepository {
  findById(id: string) {
    return db.oneOrNone(`SELECT * FROM business_addresses WHERE id = $1`, [id]);
  }

  findByAddressesByBusinessCode(business_code: string) {
    return db.any(`SELECT * FROM business_addresses WHERE business_code = $1`, [
      business_code,
    ]);
  }

  create(dto: BusinessAddressesCreateDto) {
    return db.one(
      `INSERT INTO business_addresses (
        id,
        code,
        created_at,
        updated_at,
        deleted_at,
        disabled,
        name,
        zip_code,
        address,
        number,
        complement,
        neighborhood,
        city,
        state,
        country,
        business_code
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *`,
      [
        cuid(),
        CodeGeneratorUtil.execute(),
        new Date(),
        new Date(),
        null,
        false,
        dto.name,
        dto.zip_code,
        dto.address,
        dto.number,
        dto.complement,
        dto.neighborhood,
        dto.city,
        dto.state,
        dto.country,
        dto.business_code,
      ]
    );
  }

  async update(dto: BusinessAddressesUpdateDto) {
    return db.one(
      `UPDATE business_addresses
      SET
        name = $1,
        zip_code = $2,
        address = $3,
        number = $4,
        complement = $5,
        neighborhood = $6,
        city = $7,
        state = $8,
        country = $9,
        updated_at = $10
      WHERE id = $11
      RETURNING *`,
      [
        dto.name,
        dto.zip_code,
        dto.address,
        dto.number,
        dto.complement,
        dto.neighborhood,
        dto.city,
        dto.state,
        dto.country,
        new Date(),
        dto.id,
      ]
    );
  }

  async deleteMany(ids: string[]) {
    if (ids.length === 0) return;
    await db.none(`DELETE FROM business_addresses WHERE id IN ($1:csv)`, [ids]);
    return;
  }

  async createOrUpdate(dto: BusinessAddressesUpdateManyDto) {
    const addresses = await db.manyOrNone<{ id: string }>(
      `SELECT id FROM business_addresses WHERE business_code = $1 AND deleted_at IS NULL`,
      [dto.business_code]
    );

    const addressToCreate = [];
    const addressToUpdate = [];
    const addressIds: string[] = [];

    for (const address of dto.addresses) {
      if (address?.id) {
        addressIds.push(address.id);
        if (addresses?.find((a) => a.id === address.id)) {
          addressToUpdate.push({
            ...address,
            business_code: dto.business_code,
          });
          continue;
        }
        addressToCreate.push({
          ...address,
          business_code: dto.business_code,
        });
      } else {
        addressToCreate.push({
          ...address,
          business_code: dto.business_code,
        });
      }
    }

    const addressToDelete = addresses
      ?.filter((address) => !addressIds.includes(address.id))
      ?.map((address) => address.id);

    await Promise.all([
      ...addressToCreate.map((address) => this.create(address)),
      ...addressToUpdate.map((address) => this.update(address)),
      this.deleteMany(addressToDelete),
    ]);
  }
}
