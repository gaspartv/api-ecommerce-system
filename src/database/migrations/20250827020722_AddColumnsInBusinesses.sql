-- Migration: AddColumnsInBusinesses
-- Created: 2025-08-27T02:07:22.150Z
-- Timestamp: 20250827020722

-- Coloque aqui suas queries SQL
-- Exemplos disponíveis:
-- CREATE TABLE, ALTER TABLE, UPDATE, INSERT, DELETE
-- DROP TABLE, ADD COLUMN, etc.

-- Exemplo genérico:
-- CREATE TABLE exemplo (
--   id SERIAL PRIMARY KEY,
--   nome VARCHAR(255) NOT NULL,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS responsible VARCHAR(50),
  ADD COLUMN IF NOT EXISTS email VARCHAR(120) UNIQUE,
  ADD COLUMN IF NOT EXISTS phone VARCHAR(22),
  ADD COLUMN IF NOT EXISTS cnpj VARCHAR(14) UNIQUE,
  ADD COLUMN IF NOT EXISTS notes VARCHAR(512);

-- Criar índices
CREATE INDEX idx_businesses_email ON businesses(email);
CREATE INDEX idx_businesses_cnpj ON businesses(cnpj);

COMMENT ON COLUMN businesses.responsible IS 'Nome do responsável pela empresa';
COMMENT ON COLUMN businesses.email IS 'Email de contato da empresa';
COMMENT ON COLUMN businesses.phone IS 'Telefone de contato da empresa';
COMMENT ON COLUMN businesses.cnpj IS 'CNPJ da empresa';
COMMENT ON COLUMN businesses.notes IS 'Notas adicionais sobre a empresa';
