defmodule MemoryWeb.GamesChannel do
  use MemoryWeb, :channel
  alias Memory.Game


  def join("games:" <> name, payload, socket) do
    game = Memory.GameBackup.load(name) || Game.new
    socket = socket
    |> assign(:game, game)
    |> assign(:name, name)

    if authorized?(payload) do
      {:ok, %{"view" => Game.user_view(game)} ,socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("handlechoice", %{ "index" => index }, socket) do
    game0 = socket.assigns[:game]
    game1 = Game.handlechoice(game0, index)
    Memory.GameBackup.save(socket.assigns[:name], game1)
    socket = assign(socket, :game, game1)
    {:reply, {:ok, %{ "view" => Game.user_view(game1)}}, socket}
  end

  def handle_in("restart", %{}, socket) do
    game0 = socket.assigns[:game]
    game1 = Game.restart(game0)
    Memory.GameBackup.save(socket.assigns[:name], game1)
    socket = assign(socket, :game, game1)
    {:reply, {:ok, %{ "view" => Game.user_view(game1)}}, socket}
  end

  def handle_in("checkWinner", %{}, socket) do
    game0 = socket.assigns[:game]
    unit = Game.checkWinner(game0)
    {:reply, {:ok, %{ "unit" => unit}}, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (games:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
