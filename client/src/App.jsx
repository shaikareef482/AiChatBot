import { useRef, useState } from "react";
import classes from "./App.module.css";
import axios from "axios";

function App() {
  const YOU = "YOU";
  const AI = "AI";
  const inputvalue = useRef();
  const [qna, setQna] = useState([]);
  const [loading, SetLoadig] = useState(false);

  const upadateQna = (from, value) => {
    setQna((qna) => [...qna, { from, value }]);
  };

  const handleSend= async()=>{
    const question = inputvalue.current.value;
    upadateQna(YOU,question);

    SetLoadig(true);

    const response = await axios.post("http://localhost:4000/post",{question});

     upadateQna(AI,response.data.answer);

     SetLoadig(false);
  }

  const renderConent = (qna) => {
    const value = qna.value;

    if (Array.isArray(value)) {
      return value.map((v) => <p>{v}</p>);
    }
    return <p>{value}</p>;
  };
  return (
    <main className={` ${classes.container}`}>
      <div className={classes.chats}>
        {qna.map((qna) => {
          if (qna.from === YOU) {
            return (
              <div className={`${classes.send} ${classes.chat}`}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                  alt=""
                  className={classes.avater}
                />
                <p>{renderConent(qna)}</p>
              </div>
            );
          }
          return (
            <div className={`${classes.recieve} ${classes.chat}`}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
                alt=""
                className={classes.avater}
              />
              <p>{renderConent(qna)}</p>
            </div>
          );
        })}

        {loading && (
          <div className={`${classes.recieve} ${classes.chat}`}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
              alt=""
              className={classes.avater}
            />
            <p>{renderConent(qna)}</p>
          </div>
        )}
        <div className={classes.chat_input}>
          <input
            type="text"
            ref={inputvalue}
            className="form-control col"
            placeholder="Type Something"
          />
          <button
            disabled
            className="btn btn-success"
          >
            send
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
