module V2
  class CompaniesController < ApplicationController
    before_action :set_company, only: [:show, :update, :destroy]

    # GET /companies
    def index
      json_response({ message: 'API v2 is working'})
    end
  end
end
