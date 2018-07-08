class Company < ApplicationRecord
  has_many :jobs, dependent: :destroy

  validates_presence_of :name
end
