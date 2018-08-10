class CompanySerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :logo, :address, :city, :state, :zip, :created_at, :updated_at

  has_many :jobs
end
