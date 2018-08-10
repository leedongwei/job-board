class Company < ApplicationRecord
  belongs_to :user
  has_many :jobs, foreign_key: :company_id, dependent: :destroy

  validates_presence_of :name, :logo, :address, :city, :state, :zip
end
