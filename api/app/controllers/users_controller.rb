class UsersController < ApplicationController
  skip_before_action :authorize_request, only: :create

  # GET /users
  def index
    json_response(user: current_user)
  end

  # POST /user/create
  # return authenticated token upon signup
  def create
    user = User.create!(user_params)
    auth_token = AuthenticateUser.new(user.email, user.password).call
    response = {
      message: Message.account_created,
      auth_token: auth_token,
      user: current_user,
    }
    json_response(response, :created)
  end

  private

  def user_params
    params.permit(
      :name,
      :title,
      :email,
      :password,
      :password_confirmation
    )
  end
end
