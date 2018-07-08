class CreateApplicants < ActiveRecord::Migration[5.2]
  def change
    create_table :applicants do |t|
      t.references :job, foreign_key: true

      t.string :name
      t.string :email
      t.string :phone

      t.timestamps
    end
  end
end
