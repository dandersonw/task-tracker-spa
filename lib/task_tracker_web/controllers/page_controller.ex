defmodule TaskTrackerWeb.PageController do
  use TaskTrackerWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html", session: TaskTracker.Users.session_from_user(conn.assigns.current_user))
  end
end
