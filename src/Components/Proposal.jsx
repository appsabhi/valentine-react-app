import { useState } from "react";
import "./Proposal.css";


function Proposal() {
  const [yes, setYes] = useState(false);
const [noPos, setNoPos] = useState({
  position: "relative",
  top: "auto",
  left: "auto"
});


 const moveNo = () => {
  const btnWidth = 120;
  const btnHeight = 50;

  const maxX = window.innerWidth - btnWidth;
  const maxY = window.innerHeight - btnHeight;

  setNoPos({
    position: "fixed",
    left: Math.random() * maxX + "px",
    top: Math.random() * maxY + "px"
  });
};


  return (
    <div className="container">
        <div className="hearts">
  <span>❤️</span>
  <span>💖</span>
  <span>💘</span>
  <span>💕</span>
</div>

      {!yes ? (
        <>
          <h1>Will you be my Valentine? ❤️</h1>

         <div className="buttons">
  <button className="yes" onClick={() => setYes(true)}>
    Yes 💖
  </button>

 <button
  className="no"
  style={{
    position: noPos.position,
    top: noPos.top,
    left: noPos.left
  }}
  onMouseEnter={moveNo}
>
  No 💔
</button>

</div>
        </>
      ) : (
        <div className="celebrate">
    <h1>Yayyyy 😍❤️</h1>
    <p>You just made my Valentine’s Day special 💕</p>
  </div>
      )}


    </div>
  );
}

export default Proposal;
