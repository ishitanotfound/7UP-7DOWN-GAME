import MainGame from "./Components/MainGame/MainGame";
import {Routes, Route, useNavigate } from "react-router";
import Scores from "./Components/Scores/Scores";
import Confetti from 'react-confetti'
import { useWindowSize } from '@react-hook/window-size';
import { useState } from "react"
import Error from "./Components/Error"

export default function App() {

    const [showConfetti, setShowConfetti] = useState(false);
    const { width, height } = useWindowSize();
    const navigate = useNavigate();
    const [track, setTrack] = useState({wins:0, loses:0})
    const [balance, setBalance] = useState(0) 

  return (
    <div className="main-layout bg-[#242424] min-h-screen w-full fixed">
      <div className="main-card bg-[#1a1a1a] h-[670.8px] w-[80%] lg:w-[50%] rounded-2xl mt-7 mx-auto">
        
        {/* confetti */}
        {showConfetti && <Confetti width={width} height={height} />} 
        
        {/* title bar */}
        <div className="title-bar flex justify-between ml-5 mr-5 pt-4 gap-6 lg:gap-22 sticky">

            {/* menu button */}
          <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
            <img src="menu_icon.png" className="h-[25px] lg:h-[30px]" alt="menu" />
          </button>
            {/* side drawer */}
             <div className="offcanvas offcanvas-start" data-bs-scroll="false" data-bs-backdrop="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            {/* instructions */}
            <div className="offcanvas-header bg-[#303030] text-white">
              <h5 className="offcanvas-title text-center font-light underline" id="offcanvasWithBothOptionsLabel"></h5> 
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body bg-[#303030] text-white ">
              <h3 className="text-center underline">About</h3>
              <p className="font-normal">7Up-7Down is a fun dice betting game where you predict if the total of two dice will be below 7, exactly 7, or above 7! You lose when your balance keeps falling below 0.</p>

              <h3 className="text-center underline">Rules</h3>
              <ul className="font-normal list-disc pl-4">
                <li>Two dice are rolled together.</li>
                <li>You place a bet and choose:</li>
                <ul className="pl-6 list-disc">
                  <li>7 Down (Total 2–6)</li>
                  <li>Lucky 7 (Total 7)</li>
                  <li>7 Up (Total 8–12)</li>
                 </ul>
              </ul>

              <h3 className="text-center underline">Scoring & Balance System</h3>
              <ul className="font-normal list-disc pl-4">
                <li>🪙 Starting Balance: You choose</li>
                <li>💸 Correct Guess:
                  <ul className="pl-6 list-disc">
                    <li>7 Down or 7 Up → 2x payout</li>
                    <li>Lucky 7 → 5x payout</li>
                  </ul>
                </li>
                <li>❌ Wrong Guess: You lose the bet amount</li>
                <li>📈 Score: Tracks total wins, losses, and net balance in ₹</li>
              </ul>
            </div>
          </div>

            {/* game title */}
          <p className=" title-text text-white text-4xl lg:text-6xl font-semibold mt-2">
            7UP-7DOWN 🎲
          </p>

          {/* scores button */}
          <button onClick={() => navigate("/Scores")} >📊 </button>
          
        </div>
        <Routes>
            <Route path='/' element={<MainGame showConfetti={showConfetti} setShowConfetti={setShowConfetti}
            track={track} setTrack={setTrack} balance={balance} setBalance={setBalance}/>}></Route>  
            
            <Route path='/scores' element={<Scores track={track} setTrack={setTrack} balance={balance} setBalance={setBalance}/>}></Route>   
            
            <Route path='*' element={<Error/>}></Route>                
        </Routes>      
        </div>
    </div>
  );
}
