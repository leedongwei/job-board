Rails.application.routes.draw do
  puts ' - '
  puts ' - '
  puts ' - '
  post '/auth/create', to: 'authentication#authenticate'
  post '/user/create', to: 'users#create'
  get '/jobs', to: 'jobs#findLatest'
  puts ' - '
  puts ' - '
  puts ' - '

  resources :users
  resources :companies do
    resources :jobs
  end



  # Namespace the controllers without affecting the URI
  # scope module: :v2, constraints: ApiVersion.new('v2') do
  #   resources :companies, only: :index
  # end
end
