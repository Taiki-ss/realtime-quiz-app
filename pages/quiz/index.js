import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "styles/Home.module.scss";
import axios from "axios";
import { db } from "firebase/firebase_init";

export default function Quiz() {
  const router = useRouter();
  const query = router.query;
  const userId = router.query.userId;
  const [questionNum, setQuestionNum] = useState(1);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isAnswerd, setIsAnswerd] = useState("F");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    db.collection("currentQuestion")
      .doc("currentQuestion")
      .onSnapshot(async (snapshot) => {
        setQuestionNum(snapshot.data().currentQuestion);
        await db
          .collection("questions")
          .doc(`question${snapshot.data().currentQuestion}`)
          .get()
          .then( (res) => {
            setQuestion(res.data());
            setAnswer(res.data().answer);
          });
      });
  }, [userId]);

  useEffect(() => {
    db.collection("testUsers")
      .doc(userId)
      .get()
      .then((res) => {
        console.log(res.data());
        setUserData(res.data());
        if (res.data()) {
          setIsAnswerd(res.data().answered[`q` + questionNum]);
        }
      });
  }, [questionNum]);

  const toAnswer = async (e) => {
    if (
      confirm(
        `回答は「${e.target.value}」でよろしいですか？\n解答をやり直すことはできません`
      )
    ) {
      setIsAnswerd(true);

      const answeredData = userData.answered;
      answeredData[`q${questionNum}`] = e.target.value;

      setIsAnswerd(e.target.value);
      await db
        .collection("testUsers")
        .doc(userId)
        .set(
          {
            answered: answeredData,
            point:
              question.answer === e.target.value
                ? userData.point + 1
                : userData.point,
          },
          { merge: true }
        );
    }
  };

  return (
    <div className={styles.container}>
      <p>{userData ? userData.name : ""}さんが解答中</p>
      <button
        style={{
          display: userId ? "block" : "none",
          backgroundColor: "pink",
        }}
      >
        <Link href={"/"}>回答者選択へ戻る</Link>
      </button>
      <main className={styles.main}>
        <h1 className={styles.title}>第{questionNum}問</h1>
        <h2>{isAnswerd !== "F" ? "あなたの回答：" + isAnswerd : "未解答"}</h2>
        <p>{question.question}</p>
        <div
          style={{
            display: isAnswerd !== "F" || !question.question ? "none" : "block",
          }}
        >
          <ul className="answer-list">
            <li>
              <button value="A" onClick={toAnswer}>
                A
              </button>
            </li>
            <li>
              <button value="B" onClick={toAnswer}>
                B
              </button>
            </li>
            <li>
              <button value="C" onClick={toAnswer}>
                C
              </button>
            </li>
            <li>
              <button value="D" onClick={toAnswer}>
                D
              </button>
            </li>
          </ul>
        </div>

        {/* <button
          onClick={resetQuestion}
          style={{
            display: userId ? "block" : "none",
            backgroundColor: "pink",
          }}
        >
          問題を表示
        </button> */}
        <p>※司会が合図をしてからしか次の問題には進めません</p>
      </main>
    </div>
  );
}
