import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "styles/Home.module.scss";
import axios from "axios";

export default function Result() {
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    axios
      .get("/api/result")
      .then((res) => {
		setShowStatus(res.data)
      })
      .catch((error) => console.log(error));
  }, []);

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
		<p>{showStatus ? '結果が出てます' : '結果は出てません'}</p>
      </main>
    </div>
  );
}
