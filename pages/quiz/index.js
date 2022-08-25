import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import axios from "axios";


export default function Quiz() {
  const router = useRouter();
  const username = router.query.username;
  const userId = router.query.userId;
  const [questionNum, setQuestionNum] = useState(0);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState("");
  const [isAnswerd, setIsAnswerd] = useState(false);

  useEffect(() => resetQuestion,[questionNum]);

  const resetQuestion = () => {
    console.log("実行");
    axios
      .get("/api/question", { params: { param: "currentNum" } })
      .then((res) => {
        console.log(res.data);
        if (questionNum != res.data) {
          setIsAnswerd(false);
        }
		setQuestionNum(res.data);
        getQuestion(res.data);
      })
      .catch((error) => console.log(error));
  };
  const getQuestion = (num) => {
    axios
      .get("/api/question", {
        params: { param: "getQuestion", qNum: num },
      })
      .then((res) => {
        console.log(res.data);
        setQuestion(res.data);
        setAnswer(res.answer);
      })
      .catch((error) => console.log(error));
  };

  const toAnswer = (e) => {
    if (
      confirm(
        `回答は「${e.target.value}」でよろしいですか？\n解答をやり直すことはできません`
      )
    )
      setIsAnswerd(true);
  };

  return (
    <div className={styles.container}>
      <p>{router.query.username}さんが解答中</p>
      <button
        style={{ display: userId ? "block" : "none", backgroundColor: "pink" }}
      >
        <Link href={"/"}>回答者選択へ戻る</Link>
      </button>
      <main className={styles.main}>
        <h1 className={styles.title}>第{questionNum}問</h1>
        <h2>{isAnswerd ? "解答済み" : "未解答"}</h2>
        <p>{question.question}</p>
        <div
          style={{
            display: isAnswerd && !question.question ? "none" : "block",
          }}
        >
          <ul className="answer-list">
            <li>
              <button value="A" onClick={toAnswer} disabled={isAnswerd}>
                A
              </button>
            </li>
            <li>
              <button value="B" onClick={toAnswer} disabled={isAnswerd}>
                B
              </button>
            </li>
            <li>
              <button value="C" onClick={toAnswer} disabled={isAnswerd}>
                C
              </button>
            </li>
            <li>
              <button value="D" onClick={toAnswer} disabled={isAnswerd}>
                D
              </button>
            </li>
          </ul>
        </div>

        <button
          onClick={resetQuestion}
          style={{
            display: userId ? "block" : "none",
            backgroundColor: "pink",
          }}
        >
          問題を再表示
        </button>
        <p>※司会が合図をしてからしか次の問題には進めません</p>
      </main>
    </div>
  );
}
