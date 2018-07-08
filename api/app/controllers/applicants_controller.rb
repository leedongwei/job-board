class ApplicantsController < ApplicationController
  before_action :set_company
  before_action :set_company_job
  before_action :set_company_job_applicant, only: [:show, :update, :destroy]

  # GET /companies/:company_id/jobs/:job_id/applicants
  def index
    json_response(@job.applicants)
  end

  # GET /companies/:company_id/jobs/:job_id/applicants/:id
  def show
    json_response(@applicant)
  end

  # POST /companies/:company_id/jobs/:job_id/applicants
  def create
    @job.applicants.create!(applicant_params)
    json_response(@company, :created)
  end

  # PUT /companies/:company_id/jobs/:job_id/applicants/:id
  def update
    @applicant.update(applicant_params)
    head :no_content
  end

  # DELETE /companies/:company_id/jobs/:job_id/applicants/:id
  def destroy
    @applicant.destroy
    head :no_content
  end

  private

  def applicant_params
    params.permit(:name, :email, :phone)
  end

  def set_company
    @company = Company.find(params[:company_id])
  end

  def set_company_job
    @job = @company.jobs.find_by!(id: params[:job_id]) if @company
  end

  def set_company_job_applicant
    @applicant = @job.applicants.find_by!(id: params[:id]) if @job
  end
end
