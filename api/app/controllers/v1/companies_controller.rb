module V1
  class CompaniesController < ApplicationController
    before_action :set_company, only: [:show, :update, :destroy]

    # GET /companies
    def index
      @companies = current_user.companies
      json_response(@companies)
    end

    # POST /companies
    def create
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
      params.permit(:name)
    end

    def set_company
      @company = Company.find(params[:id])
    end
  end
end
