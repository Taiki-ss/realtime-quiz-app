import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "styles/Home.module.scss";
import axios from "axios";

export default function Result() {
  const [showStatus, setShowStatus] = useState(false);
  const [result, setResult] = useState([]);
  // const [time, setTime] = useState(10);
  const [time, setTime] = useState(0);

  // useEffect(()=>{
  // if(time>0 && showStatus){
  // 	setTimeout(()=>{
  // 		setTime(time-1)
  // 	},1000)
  // }
  // },[time,showStatus])

  useEffect(() => {
    axios
      .get("/api/result")
      .then((res) => {
        setShowStatus(res.data);
      })
      .catch((error) => console.log(error));

    axios
      .get("/api/user", {
        params: {
          getResult: true,
        },
      })
      .then((res) => {
        setResult(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const menberList = result.map((obj) => {
    return obj.member.map((mem) => {
      return (
        <tr key={mem.name}>
          <td>{obj.lank}位</td>
          <td>{mem.name}</td>
          <td>{mem.porto}</td>
          <td>{mem.role}</td>
          <td>{obj.point}点</td>
        </tr>
      );
    });
  });
  console.log(result);

  return (
    <div className={styles.container}>
      <button
        style={{
          backgroundColor: "pink",
        }}
      >
        <Link href={"/"}>TOPへ戻る</Link>
      </button>
      <main className={styles.main}>
        <h1 className={styles.title}>結果発表</h1>
        <p>{showStatus && time > 0 ? time + "秒" : ""}</p>
        <p>
          {showStatus && time === 0 ? "おめでとう！" : "まだ教えないよ〜ん"}
        </p>
        <div
          className="member-list-wrapper"
          style={{ display: showStatus && time === 0 ? "block" : "none" }}
        >
          <table className="member-list">
            <tbody>
              <tr>
                <th>順位</th>
                <th>名前</th>
                <th>所属</th>
                <th>職種</th>
                <th>得点</th>
              </tr>
              {menberList}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
