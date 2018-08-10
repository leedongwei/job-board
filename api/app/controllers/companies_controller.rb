class CompaniesController < ApplicationController
  before_action :set_company, only: [:show, :update, :destroy]

  # GET /companies
  def index
    @companies = Company.find_by!(user: current_user.id)
    json_response(@companies)
  end

  # POST /companies
  def create
    puts ' '
    puts ' '
    puts ' '
    puts current_user.to_json
    puts company_params.to_json
    puts ' '
    puts ' '
    puts ' '
    @company = current_user.companies.create!(company_params)
    json_response(@company, :created)
  end

  # GET /companies/:id
  def show
    json_response(@company)
  end

  # PUT /companies/:id
  def update
    @company.update(company_params)
    head :no_content
  end

  # DELETE /companies/:id
  def destroy
    @company.destroy
    head :no_content
  end

  private

  def company_params
    # whitelist params
    params.permit(:name, :logo, :address, :city, :state, :zip)
  end

  def set_company
    @company = Company.find(params[:id])
  end
end
