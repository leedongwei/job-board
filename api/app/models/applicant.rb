class Applicant < ApplicationRecord
  belongs_to :job

  validates_presence_of :name, :email, :phone
end
