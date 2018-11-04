defmodule TaskTrackerWeb.PageController do
  use TaskTrackerWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html",
      session: TaskTracker.Users.session_from_user(conn.assigns.current_user),
      tasks: Enum.map(TaskTracker.Tasks.list_tasks(), &(TaskTracker.Tasks.task_view(&1)))
    )
  end
end
