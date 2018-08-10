class User < ApplicationRecord
  has_secure_password
  has_many :companies, foreign_key: :user_id, dependent: :destroy

  validates_presence_of :name, :title, :email, :password_digest
end
