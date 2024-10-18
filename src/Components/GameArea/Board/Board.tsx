import Cell from "../Cell/Cell";
import "./Board.css";
import Ximage from "../../../Assets/Images/X.png"
import Oimage from "../../../Assets/Images/O.png"
import { useEffect, useState } from "react";
import gameStore from "../../../Redux/Store";
import gameService from "../../../Services/GameService";
import { setCellStateArrayAction, setPlayerTurnAction } from "../../../Redux/GameState";
import { TRANSLATION_KEYS } from "../../../Constants/translations/translations-keys";
import { Shapes } from "../../../enums/shapes.enum";
import { Entites } from "../../../enums/entities.enum";
import ModalBase from "../Modal/ModalBase/ModalBase";
import { useTranslation } from "react-i18next";


function Board(): JSX.Element {
  const { t } = useTranslation();

  const [cells, setCells] = useState<string[]>(gameStore.getState().cellsStateArray);
  const [turn, setTurn] = useState<boolean>(gameStore.getState().playerTurn);
  const [winner, setWinner] = useState<Entites>(null);
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [computerCount, setComputerCount] = useState<number>(0);

  useEffect(() => {
    const unSubMe = gameStore.subscribe(() => {
      setCells(gameStore.getState().cellsStateArray);
      setTurn(gameStore.getState().playerTurn);
    });

    const playerWon = gameService.winningLanes(cells, Shapes.x, Shapes.x, Shapes.x).length > 0;
    if (playerWon) {
      setWinner(Entites.PLAYER)
      setPlayerCount(playerCount + 1);
      return;
    }
    const computerWon = gameService.winningLanes(cells, Shapes.o, Shapes.o, Shapes.o).length > 0;
    if (computerWon) {
      setWinner(Entites.COMPUTER);
      setComputerCount(computerCount + 1);
      return;
    }

    if (turn === false) {
      gameService.makeComputerMove(cells)
    }

    return () => { unSubMe(); }

  }, [turn])

  const restart = () => {
    setWinner(null)
    gameStore.dispatch(setPlayerTurnAction(true))
    gameStore.dispatch(setCellStateArrayAction(new Array(9).fill("null")))
  }

  return (
    <>
      <div className="Board">
        {cells.map((e, index) => <Cell index={index} imageSrc={e === Shapes.x ? Ximage : (e === Shapes.o ? Oimage : "")} key={index} />)}
      </div>
      <div className="Btn-group">
        <button onClick={restart}>{t(TRANSLATION_KEYS.GAME.OPTIONS.RESTART)}</button>
        <h3>{t(TRANSLATION_KEYS.GAME.WINNING_COUNT.PLAYER, {count: playerCount})}</h3>
        <h3>{t(TRANSLATION_KEYS.GAME.WINNING_COUNT.COMPUTER, {count: computerCount})}</h3>
      </div>
      {winner && <ModalBase onClose={restart} title={TRANSLATION_KEYS.GAME.GAME_STATES.GAME_OVER} message={t(TRANSLATION_KEYS.GAME.GAME_STATES.WON, {winner})} />}
    </>
  );
}

export default Board;
