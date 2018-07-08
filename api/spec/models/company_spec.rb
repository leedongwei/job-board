require 'rails_helper'

# Test suite for the Todo model
RSpec.describe Company, type: :model do
  # Association test
  it { should have_many(:jobs).dependent(:destroy) }

  # Validation test
  it { should validate_presence_of(:name) }
end
