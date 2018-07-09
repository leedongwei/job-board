class AddUserToCompany < ActiveRecord::Migration[5.2]
  def change
    add_column :companies, :created_by, :string
  end
end
