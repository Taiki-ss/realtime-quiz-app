import { useState, useEffect, HTMLInputTypeAttribute } from "react";
import styles from "../styles/Home.module.scss";
import Router from "next/router";
import { db } from "firebase/firebase_init";

const COLLECTION_NAME: string = process.env.NEXT_PUBLIC_COLLECTION_NAME
  ? process.env.NEXT_PUBLIC_COLLECTION_NAME
  : "users";

export default function Home() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [point, setPoint] = useState(0);
  const [time, setTime] = useState(0);

  const entryUser = () => {
    if (username === "" || role === "") {
      alert("名前、職種を選択してから再度決定を押してください。");
      return;
    }

    if (
      !confirm(
        `この名前「${username}」でエントリーしますか？`
      )
    )
      return;

    db.collection(COLLECTION_NAME)
      .add({
        name: username,
        role,
        point,
        time,
        answered: {
          q1: "F",
          q2: "F",
          q3: "F",
          q4: "F",
          q5: "F",
          q6: "F",
          q7: "F",
          q8: "F",
          q9: "F",
          q10: "F",
          q11: "F",
        },
      })
      .then((response) => {
        console.log(response.id);
        setUserId(response.id);
        decision(username, response.id);
      })
      .catch((error) => console.log(error));
  };

  const nameChange = (e) => {
    setUsername(e.target.value);
    setUserId("");
  };

  const roleChange = (e) => {
    setRole(e.target.value);
    setUserId("");
  };
  const pointChange = (e) => {
    setPoint(e.target.value);
  };
  const timeChange = (e) => {
    setTime(e.target.value);
  };

  // 自動ページ遷移
  const decision = (username, userId) => {
    Router.push({
      pathname: "/quiz",
      query: { username: username, userId: userId },
    });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <figure className="top-logo">
          <img src="images/logo.png" alt="" />
        </figure>
        <h1 className={styles.title}>
          さあクイズの時間だ。
        </h1>

        <div>
          <h2>さあ、エントリーしてくれ！</h2>
          <div className="input-container">
            <div className="input-name">
              <input
                placeholder="名前を入力してください"
                value={username}
                onChange={nameChange}
              />
            </div>
            <div className="input-role">
              <select onChange={roleChange}>
                <option value="">職種</option>
                <option value="エンジニア">エンジニア</option>
                <option value="デザイナー">デザイナー</option>
                <option value="カスタマーサポート">カスタマーサポート</option>
                <option value="営業">営業</option>
                <option value="経理">経理</option>
                {/* <option value="セイバー">セイバー</option>
                <option value="ランサー">ランサー</option>
                <option value="アーチャー">アーチャー</option>
                <option value="ライダー">ライダー</option>
                <option value="キャスター">キャスター</option>
                <option value="アサシン">アサシン</option>
                <option value="バーサーカー">バーサーカー</option> */}
              </select>
            </div>
            {/* <div className="input-point">
              <label>point</label>
              <input
                onChange={pointChange}
              />
            </div>
            <div className="input-time">
              <label>time</label>
              <input
                onChange={timeChange}
              />
            </div> */}
            
          </div>

          <button
            onClick={() => entryUser()}
            style={{ margin: "0 auto", width: "100%" }}
          >
            決定
          </button>
        </div>
      </main>
    </div>
  );
}
