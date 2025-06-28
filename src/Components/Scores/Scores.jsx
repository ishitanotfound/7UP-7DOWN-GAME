import { useNavigate } from "react-router";
import './../../App'


export default function Scores({track, setTrack, balance, setBalance}) {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-center text-white mb-4 mt-4">Scores🎯</h1>
      <ul class="score-board bg-[#414040] text-white text-lg rounded-2xl shadow-lg p-4 list-none space-y-2 w-[90%] mx-auto
      ">
        <li class="list-group-item font-semibold">🤑 Wins:  <span>{track.wins}</span></li>
        <li class="list-group-item font-semibold">😩 Loses: <span>{track.loses}</span></li>
        <li class="list-group-item font-semibold">💰 Balance: {balance >= 0 
          ? <>₹<span>{balance}</span></> 
          : <>- ₹<span>{balance*(-1)}</span></>}</li>
      </ul>
      <div className="flex flex-col justify-center mt-3">
        <button className="button mt-6 px-6 py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-600 text-white font-bold rounded-3xl shadow-lg hover:from-rose-600 hover:to-fuchsia-700 active:scale-95 transition duration-300" onClick={()=>{
          setBalance(0);
          setTrack((track) => {
            return {...track, wins:0, loses:0};
          })
          navigate('/',{replace:true});
        }}>
          RESTART
        </button>
        <button className="text-white mt-3 underline" onClick={()=>{navigate('/',{replace:true});}}>Back</button>
      </div>
    </div>
  )
}
