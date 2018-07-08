require 'rails_helper'

RSpec.describe User, type: :model do
  # Association test
  it { should belong_to(:company) }

  # Validation tests
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password_digest) }
end
