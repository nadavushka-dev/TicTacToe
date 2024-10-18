import { useEffect, useState } from "react";
import gameStore from "../../../Redux/Store";
import gameService from "../../../Services/GameService";
import "./Cell.css";

interface CellProps{
   imageSrc: string;
   index: number;
   className?: string;
}

function Cell({index, imageSrc, className=''}: CellProps): JSX.Element {

    const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(gameStore.getState().playerTurn);
    const [cellStateArray, setCellStateArray] = useState<string[]>(gameStore.getState().cellsStateArray);

    useEffect(()=>{
        const unSubMe = gameStore.subscribe(()=>{
            setIsPlayerTurn(gameStore.getState().playerTurn);
            setCellStateArray(gameStore.getState().cellsStateArray);
        })

        return ()=>{unSubMe()}
    }, [isPlayerTurn]);
    
    const handleClick = () => {
        console.log(index);
        gameService.makePlayerMove(isPlayerTurn, cellStateArray, index);
    }

    return (
        <div className={`Cell ${className}`} onClick={handleClick}>
            {imageSrc && <img src={imageSrc} alt="" />}
        </div>
    );
}

export default Cell;
