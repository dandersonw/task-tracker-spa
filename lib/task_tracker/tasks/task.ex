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

    field :assignee, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :desc, :time_spent, :completed, :user_id, :assignee])
    |> validate_assignee()
    |> put_user_id()
    |> validate_required([:title, :desc])
  end

   def validate_assignee(changeset) do
    validate_change(changeset, :assignee, fn _, assignee ->
      case TaskTracker.Users.get_user_by_email(assignee) do
        nil -> [{:assignee, "Unknown user email for assignee"}]
        _ -> []
      end
    end)
  end


   def put_user_id(%Ecto.Changeset{valid?: true, changes: %{assignee: email}} = changeset) do
    case email do
      nil -> changeset
      _ -> change(changeset, %{user_id: TaskTracker.Users.get_user_by_email(email).id})
    end
   end
end
