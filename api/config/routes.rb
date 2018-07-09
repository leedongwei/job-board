Rails.application.routes.draw do
  post '/auth/create', to: 'authentication#authenticate'
  post '/user/create', to: 'users#create'

  # Namespace the controllers without affecting the URI
  scope module: :v2, constraints: ApiVersion.new('v2') do
    resources :companies, only: :index
  end

  # Namespace the controllers without affecting the URI
  scope module: :v1, constraints: ApiVersion.new('v1', true) do
    resources :companies do
      resources :jobs do
        resources :applicants
      end
    end
  end
end
