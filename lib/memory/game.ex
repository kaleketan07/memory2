defmodule Memory.Game do
  def new do
    newlist = List.duplicate("",16)
    %{
      disp_values: newlist,
      asso_values: ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"],
      act_values: ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"],
      clicks: 0,
      firstguess: -1,
      secondguess: -1
    }
  end


  def user_view(game) do
    %{
      disp_values: game.disp_values,
      asso_values: game.asso_values,
      act_values: game.act_values,
      clicks: game.clicks,
      firstguess: game.firstguess,
      secondguess: game.secondguess
    }
  end

  def handlechoice(game, index) do
  ## handle the game according to the index passed
    dvalues = game.disp_values
    avalues = game.asso_values
    fg = game.firstguess
    sg = game.secondguess
    { _ , val } = Enum.fetch(avalues, index)
    if fg == -1 and val != "DONE" do
      fg = index
      dispvalues = List.replace_at(dvalues, index, val)
      %{
        disp_values: dispvalues,
        asso_values: avalues,
        act_values: game.act_values,
        clicks: game.clicks + 1,
        firstguess: fg,
        secondguess: -1
      }
    else
      if sg == -1 and index != fg and val != "DONE" do
        sg = index
        dispvalues = List.replace_at(dvalues, index, val)

        # irrespective of the following code the state should be sent to the client
        %{
          disp_values: dispvalues,
          asso_values: avalues,
          act_values: game.act_values,
          clicks: game.clicks + 1,
          firstguess: fg,
          secondguess: sg
        }
      else
        %{
          disp_values: dvalues,
          asso_values: avalues ,
          act_values: game.act_values,
          clicks: game.clicks,
          firstguess: fg,
          secondguess: sg
        }
      end

    end

  # set the values of the field and return a map that's like the game
  end

  def checkmatch(game) do
    dvalues = game.disp_values
    avalues = game.asso_values
    fg = game.firstguess
    sg = game.secondguess
    {_, fgaval} = Enum.fetch(avalues, fg)
    {_, sgaval} = Enum.fetch(avalues, sg)
    if sg != -1 do
      if fgaval == sgaval do
        dispvalues = List.replace_at(dvalues, fg, "DONE")
        dispvalues = List.replace_at(dispvalues, sg, "DONE")
        avalues = List.replace_at(avalues, fg, "DONE")
        avalues = List.replace_at(avalues, sg, "DONE")
        fg = -1
        sg = -1
        %{
          disp_values: dispvalues,
          asso_values: avalues ,
          act_values: game.act_values,
          clicks: game.clicks + 1,
          firstguess: fg,
          secondguess: sg
        }
      else

        :timer.sleep(1000)
        dispvalues = List.replace_at(dvalues, fg, "")
        dispvalues = List.replace_at(dispvalues, sg, "")
        fg = -1
        sg = -1
        %{
          disp_values: dispvalues,
          asso_values: avalues,
          act_values: game.act_values,
          clicks: game.clicks,
          firstguess: fg,
          secondguess: sg
        }


      end
    else
      %{
        disp_values: game.disp_values,
        asso_values: game.asso_values,
        act_values: game.act_values,
        clicks: game.clicks,
        firstguess: game.firstguess,
        secondguess: game.secondguess
      }

    end
  end


  ## handle click ends here
  def restart(game) do
    dispvalues = List.duplicate("",16)
    avalues = Enum.shuffle(game.act_values)
    %{
      disp_values: dispvalues,
      asso_values: avalues,
      act_values: game.act_values,
      clicks: 0,
      firstguess: -1,
      secondguess: -1
    }
  end
## add the isWinner logic here...
  def checkWinner(game) do
    Enum.all?(game.disp_values, fn(x) -> (x == "DONE") end)
  end

end
