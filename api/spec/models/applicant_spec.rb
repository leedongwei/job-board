require 'rails_helper'

# Test suite for the Todo model
RSpec.describe Applicant, type: :model do
  # Association test
  it { should belong_to(:job) }

  # Validation test
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:phone) }
end
