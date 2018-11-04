defmodule TaskTrackerWeb.SessionController do
  use TaskTrackerWeb, :controller

  action_fallback TaskTrackerWeb.FallbackController

  alias TaskTracker.Users.User

  def create(conn, %{"email" => email, "password" => password}) do
    with %User{} = user <- TaskTracker.Users.get_and_auth_user(email, password) do
      resp = %{
        data: TaskTracker.Users.session_from_user(user)
      }

      conn
      |> put_session(:user_id, user.id)
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:created, Jason.encode!(resp))
    else
      err -> err
    conn
    |> send_resp(:unprocessable_entity, "Incorrect email/password")
    end
  end

  def delete(conn, _params) do
    conn
    |> delete_session(:user_id)
    |> send_resp(:ok, "OK")
  end
end
