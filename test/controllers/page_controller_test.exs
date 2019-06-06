defmodule FanimaidButler.PageControllerTest do
  use FanimaidButler.ConnCase

  test "GET /", %{conn: conn} do
    conn = conn
      |> authorize
      |> get("/")

    assert html_response(conn, 200) =~ "Fanimaid Butler BETA"
  end
end
