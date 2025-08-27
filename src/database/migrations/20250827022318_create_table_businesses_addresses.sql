-- Migration: create_table_businesses_addresses
-- Created: 2025-08-27T02:23:18.594Z
-- Timestamp: 20250827022318
-- Type: CREATE TABLE

-- Criar tabela business_addresses
CREATE TABLE business_addresses (
  id CHAR(25) PRIMARY KEY,
  code VARCHAR(6) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  deleted_at TIMESTAMP,
  disabled BOOLEAN DEFAULT false,
  name VARCHAR(255) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  address VARCHAR(255) NOT NULL,
  number VARCHAR(10),
  complement VARCHAR(100),
  neighborhood VARCHAR(100),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  business_code CHAR(6) REFERENCES businesses(code) ON DELETE CASCADE
);

-- Criar índices
CREATE INDEX idx_business_addresses_code ON business_addresses(code);
CREATE INDEX idx_business_addresses_name ON business_addresses(name);

-- Comentários na tabela
COMMENT ON TABLE business_addresses IS 'Tabela para armazenar informações de business_addresses';

COMMENT ON COLUMN business_addresses.id IS 'ID único da business_addresses';
COMMENT ON COLUMN business_addresses.code IS 'Código único da business_addresses';
COMMENT ON COLUMN business_addresses.created_at IS 'Data de criação do registro';
COMMENT ON COLUMN business_addresses.updated_at IS 'Data da última atualização do registro';
COMMENT ON COLUMN business_addresses.deleted_at IS 'Data de exclusão lógica do registro';
COMMENT ON COLUMN business_addresses.disabled IS 'Indica se a business_addresses está desativada';
COMMENT ON COLUMN business_addresses.name IS 'Nome da business_addresses';
COMMENT ON COLUMN business_addresses.zip_code IS 'Código postal da business_addresses';
COMMENT ON COLUMN business_addresses.address IS 'Endereço da business_addresses';
COMMENT ON COLUMN business_addresses.number IS 'Número do endereço da business_addresses';
COMMENT ON COLUMN business_addresses.complement IS 'Complemento do endereço da business_addresses';
COMMENT ON COLUMN business_addresses.neighborhood IS 'Bairro da business_addresses';
COMMENT ON COLUMN business_addresses.city IS 'Cidade da business_addresses';
COMMENT ON COLUMN business_addresses.state IS 'Estado da business_addresses';
COMMENT ON COLUMN business_addresses.country IS 'País da business_addresses';
COMMENT ON COLUMN business_addresses.business_code IS 'Código da empresa associada à business_addresses';
