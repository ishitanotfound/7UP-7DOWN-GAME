import { useState, useEffect } from "react"
import './MainGame.css'
import "./Error"
import Scores from "./Scores";
import { useNavigate } from "react-router";

export default function MainGame({showConfetti, setShowConfetti, track, setTrack, balance, setBalance}) {

  const [isAnimating, setIsAnimating] = useState(false)
  const [dice1, setDice1] = useState(".")
  const [dice2, setDice2] = useState(".")
  const diceEmojis = ["","⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  const [option, setOption] = useState("")
  const [msg, setMsg] = useState("")
  const [amt, setAmt] = useState(0)
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (balance === 0) {
  //     alert("You lost all your money! Redirecting to Scores 🥲");
  //     navigate("/Scores");
  //   }
  // }, [balance, navigate]);

  let rollDice = () => {
    if (!amt || isNaN(amt) || amt <= 0) {
      alert("Please enter a valid betting amount first!");
      return;
    }

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);

    let d1 = Math.floor(Math.random()*6)+1;
    let d2 = Math.floor(Math.random()*6)+1;
        
    setDice1(diceEmojis[d1]);                           
    setDice2(diceEmojis[d2]); 
        
    if (option === "7UP" || option === "7DOWN") {               
      
      if ((d1 + d2) > 7) {
        setMsg("🎉 You win 2x!");
        setTrack((track) => {
          return {...track, wins:track.wins+1};
        });
        setBalance(balance + (2 * amt));
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      } else {
        setMsg(`😔 You lose!`);
        setTrack((track) => {
          return {...track, loses:track.loses+1};
        });
        setBalance(balance - amt);

      }
    } else if (option === "7"){
      
      if ((d1 + d2) === 7) {
        setMsg("🎉 You win 5x!");
        setTrack((track) => {
          return {...track, wins:track.wins+1};
        });
        setBalance(balance + (5 * amt));
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      } else {
        setMsg(`😔 You lose!`);
        setTrack((track) => {
          return {...track, loses:track.loses+1};
        });
        setBalance(balance - amt);

      }
    } else {
      alert("Please choose an option before placing a bet!");
    }  
  }
  
  return (
    <div >
      
      {/* option buttons */}
      <div className="game-options flex justify-center mt-1 lg:mt-4 ">
        <div className="btn-group sm:btn-group-sm lg:btn-group-lg text-white" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" value='7UP' onChange={(e)=>setOption(e.target.value)} className="btn-check" name="btnradio" id="btnradio1" autocomplete="off"/>
          <label className="btn btn-outline-secondary" for="btnradio1">7 UP</label>

          <input type="radio" value='7DOWN' onChange={(e)=>setOption(e.target.value)} className="btn-check" name="btnradio" id="btnradio2" autocomplete="off"/>
          <label className="btn btn-outline-secondary" for="btnradio2">7 DOWN</label>

          <input type="radio" value='7' onChange={(e)=>setOption(e.target.value)} className="btn-check" name="btnradio" id="btnradio3" autocomplete="off"/>
          <label className="btn btn-outline-secondary" for="btnradio3">7</label>
        </div>
      </div>
      
      {/* amt input box */}
      <div className="ipt-amt flex justify-center mt-4 text-md lg:text-2xl text-white ">
        <input type="text" placeholder="Enter betting amount here..." className="input input-ghost text-center pl-1 w-[15rem] lg:w-sm" onChange={(e) => {
          if(e.target.value != "" && e.target.value > 0) {                    // issue
            setAmt(e.target.value); 
          } else {
            alert("Please enter a valid betting amount first!");
          }
        }}/>
      </div>  
      
      {/* diceboard */}
      <div className="diceBoard flex justify-center items-center text-white text-2xl gap-12 bg-[#414040] w-[80%] lg:w-[60%] rounded-2xl mx-auto mt-4 pb-4">
        <div className='dice flex flex-col items-center'>
          <h1 id="dice1" className={`${isAnimating ? 'animate' : ''}`}>{ dice1 }</h1>
          <label htmlFor="dice1">Dice1</label>
        </div>
        <div className="dice flex flex-col items-center">
          <h1 id="dice2" className={`${isAnimating ? 'animate' : ''}`}>{ dice2 }</h1>
          <label htmlFor="dice2">Dice2</label>
        </div>
      </div>
      
      {/* place bet button */}
      <div className="place-bet flex justify-center mt-3">
        <button className="button mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white font-bold rounded-3xl shadow-lg hover:from-pink-600 hover:to-purple-700 active:scale-95 transition duration-300" onClick={ rollDice }>Place Bet</button>  
      </div>

      {/* result box */}
      <div className="result flex justify-center m-3 text-gray-300 pb-3">
        <h3>{ msg }</h3>
      </div>  
    </div>
  )
}
