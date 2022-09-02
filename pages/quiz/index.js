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
  const [questionNum, setQuestionNum] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isAnswerd, setIsAnswerd] = useState("F");
  const [userData, setUserData] = useState({});
  const [answers, setAnswers] = useState({});
  const [downTime, setDownTime] = useState(10);

  useEffect(() => {
    if (downTime === 0 && questionNum !== 0) {
      (async () => {
        const answerCount = {
          A: 0,
          B: 0,
          C: 0,
          D: 0,
        };
        await db
          .collection("testUsers")
          .get()
          .then((res) => {
            res.docs.forEach((v, i) => {
              Object.keys(answerCount).forEach((key) => {
                if (v.data().answered[`q${questionNum}`] === key) {
                  answerCount[key] = answerCount[key] + 1;
                }
              });
            });
            console.log(answerCount);
            setAnswers(answerCount);
          });
      })();
    }
  }, [downTime]);

  useEffect(() => {
	if(questionNum === 0){
		return
	}

    if (isAnswerd === "F" && downTime === 0) {
      setIsAnswerd("T");
    }
    if (downTime === 0) {
      return;
    }
    setTimeout(() => {
      setDownTime(downTime - 1);
    }, 1000);
  }, [downTime,questionNum]);

  useEffect(() => {
    db.collection("currentQuestion")
      .doc("currentQuestion")
      .onSnapshot(async (snapshot) => {
        setQuestionNum(snapshot.data().currentQuestion);
        await db
          .collection("questions")
          .doc(`question${snapshot.data().currentQuestion}`)
          .get()
          .then((res) => {
            setQuestion(res.data());
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
          setDownTime(10);
        }
      });
  }, [questionNum, userId]);

  const toAnswer = async (e) => {
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
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div style={{ display: questionNum === 0 ? "block" : "none" }}>
          <h1>準備はいいかな？？</h1>
          <h2 className={styles.title}>エントリー</h2>
          <p>名前：{userData.name}さん</p>
          <p>所属：{userData.porto}</p>
          <p>職種：{userData.role}</p>
          <br />
          <p>スタートまでこのままお待ちください</p>
        </div>
        <div style={{ display: questionNum > 0 ? "block" : "none" }}>
          <p>{userData ? userData.name : ""}さんが解答中</p>
          <p className={styles.title} style={{ color: "red" }}>
            あと{downTime}秒
          </p>
          <h1 className={styles.title}>第{questionNum}問</h1>
          <h2>
            {isAnswerd !== "F" && isAnswerd !== "T"
              ? "あなたが選んだ回答：" + isAnswerd
              : "あなたは未解答"}
          </h2>
          <div
            style={{
              display: downTime === 0 && answers !== {} ? "block" : "none",
            }}
          >
            <ul>
              <li>A:{answers.A}人</li>
              <li>B:{answers.B}人</li>
              <li>C:{answers.C}人</li>
              <li>D:{answers.D}人</li>
            </ul>
          </div>
          <div
            style={{
              display:
                isAnswerd !== "F" || !question.question ? "none" : "block",
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

          <p>※司会が合図をしたら自動で次の問題に進みます</p>
        </div>
      </main>
    </div>
  );
}
