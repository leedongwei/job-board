class ApplicantsController < ApplicationController
  skip_before_action :authorize_request, only: :create
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
    json_response(@job, :created)
  end

  # PUT /companies/:company_id/jobs/:job_id/applicants/:id
  def update
    @applicant.update(applicant_params)
    json_response(@applicant)
  end

  # DELETE /companies/:company_id/jobs/:job_id/applicants/:id
  def destroy
    @applicant.destroy
    json_response(@applicant)
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
