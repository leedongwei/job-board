Rails.application.routes.draw do
  post '/auth/create', to: 'authentication#authenticate'
  post '/user/create', to: 'users#create'

  resources :users

  resources :companies do
    resources :jobs
  end


  # Namespace the controllers without affecting the URI
  # scope module: :v2, constraints: ApiVersion.new('v2') do
  #   resources :companies, only: :index
  # end
end
