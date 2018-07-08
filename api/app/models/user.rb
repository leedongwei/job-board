class User < ApplicationRecord
  belongs_to :company, dependent: :destroy

  validates_presence_of :email, :password_digest
end
