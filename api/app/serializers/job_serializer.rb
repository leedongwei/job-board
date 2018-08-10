class JobSerializer < ActiveModel::Serializer
  attributes :id, :company_id, :title, :description, :application_link, :tags, :approved, :created_at, :updated_at

  belongs_to :company
end
