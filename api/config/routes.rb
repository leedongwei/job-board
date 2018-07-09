Rails.application.routes.draw do
  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'

  resources :companies do
    resources :jobs do
      resources :applicants
    end
  end
end
