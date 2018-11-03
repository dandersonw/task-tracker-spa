defmodule TaskTracker.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :email, :string
    field :password_hash, :string

    has_many :tasks, TaskTracker.Tasks.Task

    field :pw_tries, :integer
    field :pw_last_try, :utc_datetime

    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true

    timestamps()
  end

  # From Husky Shop
  @doc false
  def changeset(user, attrs) do
    IO.inspect(user)
    IO.inspect(attrs)

    user = user
    |> cast(attrs, [:email, :password, :password_confirmation])

    IO.inspect(user)

    user = user
    |> validate_confirmation(:password)
    |> validate_password(:password)

    IO.inspect(user)

    user = user
    |> put_pass_hash()

    IO.inspect(user)

    user
    |> validate_required([:email, :password_hash])
  end

  # Password validation
  # From Comeonin docs
  def validate_password(changeset, field, options \\ []) do
    validate_change(changeset, field, fn _, password ->
      case valid_password?(password) do
        {:ok, _} -> []
        {:error, msg} -> [{field, options[:message] || msg}]
      end
    end)
  end

  def put_pass_hash(%Ecto.Changeset{
        valid?: true, changes: %{password: password}} = changeset) do
    IO.inspect password
    IO.inspect Comeonin.Argon2.hashpwsalt("hogehoge")
    change(changeset, Comeonin.Argon2.add_hash("hogehoge"))
    IO.puts password
  end
  def put_pass_hash(changeset), do: changeset

  def valid_password?(password) when byte_size(password) > 7 do
    {:ok, password}
  end
  def valid_password?(_), do: {:error, "The password is too short"}

end
