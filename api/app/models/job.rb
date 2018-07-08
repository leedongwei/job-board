class Job < ApplicationRecord
  belongs_to :company
  has_many :applicants, dependent: :destroy

  validates_presence_of :title, :description
end
