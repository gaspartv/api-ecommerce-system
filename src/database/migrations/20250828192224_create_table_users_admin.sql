-- Migration: create_table_users_admin
-- Created: 2025-08-28T19:22:24.757Z
-- Timestamp: 20250828192224
-- Type: CREATE TABLE

-- Criar tabela users_admin
CREATE TABLE users_admin (
  id CHAR(25) PRIMARY KEY,
  code VARCHAR(6) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  deleted_at TIMESTAMP,
  disabled BOOLEAN DEFAULT false,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  business_code CHAR(6) REFERENCES businesses(code) ON DELETE CASCADE
);

-- Criar índices
CREATE INDEX idx_users_admin_code ON users_admin(code);
CREATE INDEX idx_users_admin_email ON users_admin(email);

-- Comentários na tabela
COMMENT ON TABLE users_admin IS 'Tabela para armazenar informações de users_admin';

COMMENT ON COLUMN users_admin.id IS 'ID único da users_admin';
COMMENT ON COLUMN users_admin.code IS 'Código único da users_admin';
COMMENT ON COLUMN users_admin.created_at IS 'Data de criação do registro';
COMMENT ON COLUMN users_admin.updated_at IS 'Data da última atualização do registro';
COMMENT ON COLUMN users_admin.deleted_at IS 'Data de exclusão lógica do registro';
COMMENT ON COLUMN users_admin.disabled IS 'Indica se a users_admin está desativada';
COMMENT ON COLUMN users_admin.name IS 'Nome da users_admin';
COMMENT ON COLUMN users_admin.email IS 'Email da users_admin';
COMMENT ON COLUMN users_admin.password IS 'Senha da users_admin';
COMMENT ON COLUMN users_admin.business_code IS 'Código da empresa associada à business_addresses';
