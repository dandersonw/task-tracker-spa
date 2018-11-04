defmodule TaskTrackerWeb.UserController do
  use TaskTrackerWeb, :controller

  alias TaskTracker.Users
  alias TaskTracker.Users.User

  action_fallback TaskTrackerWeb.FallbackController

  def index(conn, _params) do
    users = Users.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    case Users.create_user(user_params) do
      {:ok, user} ->
        resp = %{"data" => TaskTracker.Users.session_from_user(user)}
        conn
        |> put_session(:user_id, user.id)
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:created, Jason.encode!(resp))

      {:error, %Ecto.Changeset{} = changeset} ->
        IO.inspect changeset
        conn
        |> send_resp(:unprocessable_entity, "Couldn't register")
    end
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Users.get_user!(id)

    with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)

    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
