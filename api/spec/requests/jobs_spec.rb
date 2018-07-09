require 'rails_helper'

RSpec.describe 'Jobs API' do
  # Initialize the test data
  let(:user) { create(:user) }
  let!(:company) { create(:company, created_by: user.id) }
  let!(:jobs) { create_list(:job, 20, company_id: company.id) }
  let(:company_id) { company.id }
  let(:id) { jobs.first.id }
  let(:headers) { valid_headers }

  # Test suite for GET /companies/:company_id/jobs
  describe 'GET /companies/:company_id/jobs' do
    before { get "/companies/#{company_id}/jobs", headers: headers }

    context 'when company exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all company jobs' do
        expect(json.size).to eq(20)
      end
    end

    context 'when company does not exist' do
      let(:company_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Company/)
      end
    end
  end

  # Test suite for GET /companies/:company_id/jobs/:id
  describe 'GET /companies/:company_id/jobs/:id' do
    before { get "/companies/#{company_id}/jobs/#{id}", headers: headers, headers: headers }

    context 'when company job exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the job' do
        expect(json['id']).to eq(id)
      end
    end

    context 'when company job does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Job/)
      end
    end
  end

  # Test suite for POST /companies/:company_id/jobs
  describe 'POST /companies/:company_id/jobs' do
    let(:valid_attributes) { { title: 'Generic Job A', description: 'This is generic' }.to_json }

    context 'when request attributes are valid' do
      before { post "/companies/#{company_id}/jobs", params: valid_attributes, headers: headers }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      before { post "/companies/#{company_id}/jobs", params: {}, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(response.body).to match(/Validation failed: Title can't be blank/)
      end
    end
  end

  # Test suite for PUT /companies/:company_id/jobs/:id
  describe 'PUT /companies/:company_id/jobs/:id' do
    let(:valid_attributes) { { title: 'Generic Job A' }.to_json }

    before { put "/companies/#{company_id}/jobs/#{id}", params: valid_attributes, headers: headers }

    context 'when job exists' do
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end

      it 'updates the job' do
        updated_job = Job.find(id)
        expect(updated_job.title).to match(/Generic Job A/)
      end
    end

    context 'when the job does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Job/)
      end
    end
  end

  # Test suite for DELETE /companies/:company_id/jobs/:id
  describe 'DELETE /companies/:company_id/jobs/:id' do
    before { delete "/companies/#{company_id}/jobs/#{id}", headers: headers }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
