require 'rails_helper'

RSpec.describe 'Applicants API' do
  # Initialize the test data
  let(:user) { create(:user) }
  let!(:company) { create(:company, created_by: user.id) }
  let!(:job) { create_list(:job, 5, company_id: company.id) }
  let!(:applicants) { create_list(:applicant, 20, job_id: job.first.id) }
  let(:company_id) { company.id }
  let(:job_id) { job.first.id }
  let(:id) { applicants.first.id }
  let(:headers) { valid_headers }

  # Test suite for GET /companies/:company_id/jobs/:job_id
  describe 'GET /companies/:company_id/jobs/:job_id' do
    before { get "/companies/#{company_id}/jobs/#{job_id}", headers: headers }

    context 'when company and job exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the job' do
        expect(json['id']).to eq(id)
      end
    end

    context 'when job does not exist' do
      let(:job_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Job/)
      end
    end
  end

  # Test suite for GET /companies/:company_id/applicants
  describe 'GET /companies/:company_id/jobs/:job_id/applicants' do
    before { get "/companies/#{company_id}/jobs/#{job_id}/applicants", headers: headers }

    context 'when company and job exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all job applicants' do
        expect(json.size).to eq(20)
      end
    end

    context 'when job does not exist' do
      let(:job_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Job/)
      end
    end
  end

  # Test suite for PUT /companies/:company_id/jobs/:job_id/applicants
  describe 'POST /companies/:company_id/jobs/:job_id/applicants' do
    let(:valid_attributes) { { name: 'James Doe', email: 'james_doe@mail.com', phone: '12344321' }.to_json }

    context 'when request attributes are valid' do
      before { post "/companies/#{company_id}/jobs/#{job_id}/applicants", params: valid_attributes, headers: headers }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      before { post "/companies/#{company_id}/jobs/#{job_id}/applicants", params: {}, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(response.body).to match(/Validation failed: Name can't be blank/)
      end
    end
  end

  # Test suite for PUT /companies/:company_id/jobs/:job_id/applicants/:id
  describe 'PUT /companies/:company_id/jobs/:job_id/applicants/:id' do
    let(:valid_attributes) { { name: 'James Doe', email: 'james_doe@mail.com', phone: '12344321' }.to_json }

    before { put "/companies/#{company_id}/jobs/#{job_id}/applicants/#{id}", params: valid_attributes, headers: headers }

    context 'when applicant exists' do
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end

      it 'updates the applicant' do
        updated_applicant = Applicant.find(id)
        expect(updated_applicant.name).to match(/James Doe/)
      end
    end

    context 'when the applicant does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Applicant/)
      end
    end
  end

  # Test suite for DELETE /companies/:company_id/jobs/:job_id/applicants/:id
  describe 'DELETE /companies/:company_id/jobs/:job_id/applicants/:id' do
    before { delete "/companies/#{company_id}/jobs/#{job_id}/applicants/#{id}", headers: headers }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
