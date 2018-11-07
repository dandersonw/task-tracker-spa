defmodule TaskTrackerWeb.TaskView do
  use TaskTrackerWeb, :view
  alias TaskTrackerWeb.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      desc: task.desc,
      time_spent: task.time_spent,
      completed: task.completed,
      inserted_at: task.inserted_at,
      assignee: (if task.user != nil do task.user.email else nil end)}
  end
end
