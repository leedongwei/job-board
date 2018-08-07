class CreateCompanies < ActiveRecord::Migration[5.2]
  def change
    create_table :companies do |t|
      t.references :user, foreign_key: true

      t.string :name

      t.string :address_line_1
      t.string :address_line_2
      t.string :city
      t.string :state
      t.string :zip

      t.timestamps
    end
  end
end
