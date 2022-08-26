import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "styles/Home.module.scss";
import axios from "axios";

export default function Result() {
  const [showStatus, setShowStatus] = useState(false);
  const [result, setResult] = useState({});

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

  const menberList = Object.values(result).map((obj) => (
        <li key={obj.name}>
          {obj.name}：{obj.point}点
        </li>
      ));
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
        <p>{showStatus ? "おめでとう！" : "まだ教えないよ〜ん"}</p>
        <div style={{ display: showStatus ? "block" : "none" }}>
          <ul>{menberList}</ul>
        </div>
      </main>
    </div>
  );
}
