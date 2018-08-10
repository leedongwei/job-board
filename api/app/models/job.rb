class Job < ApplicationRecord
  belongs_to :company
  # has_many :applicant, dependent: :destroy

  validates_presence_of :title, :description, :application_link, :tags, :approved
end
