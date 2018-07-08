require 'rails_helper'

# Test suite for the Todo model
RSpec.describe Job, type: :model do
  # Association test
  it { should belong_to(:company) }
  it { should have_many(:applicants).dependent(:destroy) }

  # Validation test
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:description) }
end
