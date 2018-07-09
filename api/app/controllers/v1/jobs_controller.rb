module V1
  class JobsController < ApplicationController
    before_action :set_company
    before_action :set_company_job, only: [:show, :update, :destroy]

    # GET /companies/:company_id/jobs
    def index
      json_response(@company.jobs)
    end

    # GET /companies/:company_id/jobs/:id
    def show
      json_response(@job)
    end

    # POST /companies/:company_id/jobs
    def create
      @company.jobs.create!(job_params)
      json_response(@company, :created)
    end

    # PUT /companies/:company_id/jobs/:id
    def update
      @job.update(job_params)
      head :no_content
    end

    # DELETE /companies/:company_id/jobs/:id
    def destroy
      @job.destroy
      head :no_content
    end

    private

    def job_params
      params.permit(:title, :description)
    end

    def set_company
      @company = Company.find(params[:company_id])
    end

    def set_company_job
      @job = @company.jobs.find_by!(id: params[:id]) if @company
    end
  end
end
