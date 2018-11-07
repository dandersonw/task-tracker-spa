defmodule TaskTrackerWeb.Router do
  use TaskTrackerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug TaskTrackerWeb.Plugs.FetchSession
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug TaskTrackerWeb.Plugs.FetchSession
  end

  scope "/", TaskTrackerWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/register", PageController, :index
    get "/new", PageController, :index
    get "/show/:id", PageController, :index
    get "/complete/:id", PageController, :index
    
  end

  scope "/api/v1", TaskTrackerWeb do
    pipe_through :api

    post "/users", UserController, :create
    resources "/tasks", TaskController, except: [:new, :edit]

    post "/sessions", SessionController, :create
    delete "/sessions", SessionController, :delete
  end

  # Other scopes may use custom stacks.
  # scope "/api", TaskTrackerWeb do
  #   pipe_through :api
  # end
end
