class User < ApplicationRecord
  has_secure_password

  has_many :companies, foreign_key: :created_by

  validates_presence_of :email, :password_digest
end
