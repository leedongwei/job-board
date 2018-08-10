class CreateJobs < ActiveRecord::Migration[5.2]
  def change
    create_table :jobs do |t|
      t.references :company, foreign_key: true

      t.string :title
      t.string :description

      t.string :application_link
      t.string :tags
      t.boolean :approved
      t.timestamps
    end
  end
end
