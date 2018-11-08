defmodule TaskTrackerWeb.TaskController do
  use TaskTrackerWeb, :controller

  alias TaskTracker.Tasks
  alias TaskTracker.Tasks.Task

  action_fallback TaskTrackerWeb.FallbackController

  def index(conn, _params) do
    tasks = Tasks.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params}) do
    with {:ok, %Task{} = task} <- Tasks.create_task(task_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.task_path(conn, :show, task))
      |> render("show.json", task: Tasks.put_user(task))
    end
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    |> Tasks.put_user()

    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Tasks.get_task!(id)
    |> Tasks.put_user()

    if (task.assignee != nil and task.assignee != conn.assigns.session.current_user) do
      conn
      |> send_resp(:unauthorized, "Not authorized")
    else      
      with {:ok, %Task{} = task} <- Tasks.update_task(task, task_params) do
        render(conn, "show.json", task: Tasks.put_user(task))
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)

    with {:ok, %Task{}} <- Tasks.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end
end
