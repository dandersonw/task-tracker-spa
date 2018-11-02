defmodule TaskTracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completed, :boolean, default: false
    field :desc, :string
    field :time_spent, :integer
    field :title, :string
    # field :user_id, :id

    belongs_to :user, TaskTracker.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :desc, :time_spent, :completed, :user_id])
    |> validate_required([:title, :desc])
  end
end
