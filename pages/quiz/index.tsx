import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import styles from "styles/Home.module.scss";
import { db } from "firebase/firebase_init";
import BarGraph from "compornent/bar";

type answered = {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
  q9: string;
};

type userData = {
  name?: string;
  role?: string;
  point?: number;
  time?: number;
  answered?: answered;
};

type question = {
  answer?: string;
};

type answers = {
  A?: number;
  B?: number;
  C?: number;
  D?: number;
};

const COLLECTION_NAME: string = process.env.NEXT_PUBLIC_COLLECTION_NAME
  ? process.env.NEXT_PUBLIC_COLLECTION_NAME
  : "users";

export default function Quiz() {
  const maxTime = 10;
  const router = useRouter();
  const query = router.query;
  const userId: any = router.query.userId;
  const [questionNum, setQuestionNum] = useState(0);
  const [question, setQuestion] = useState<question>({});
  const [answer, setAnswer] = useState("");
  const [isAnswerd, setIsAnswerd] = useState("F");
  const [userData, setUserData] = useState<userData>({});
  const [answers, setAnswers] = useState<answers>({});
  const [downTime, setDownTime] = useState(maxTime);

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
          .collection(COLLECTION_NAME)
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
    if (questionNum === 0) {
      return;
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
  }, [downTime, questionNum]);

  useEffect(() => {
    db.collection("currentQuestion")
      .doc("currentQuestion")
      .onSnapshot(async (snapshot: any) => {
        setQuestionNum(snapshot.data().currentQuestion);
        await db
          .collection("questions")
          .doc(`question${snapshot.data().currentQuestion}`)
          .get()
          .then((res: any) => {
            setQuestion(res.data());
          });
      });
  }, [userId]);

  useEffect(() => {
    db.collection(COLLECTION_NAME)
      .doc(userId)
      .get()
      .then((res: any) => {
        console.log(res.data());
        setUserData(res.data());
        if (res.data()) {
          setIsAnswerd(res.data().answered[`q` + questionNum]);
          setDownTime(maxTime);
        }
      });
  }, [questionNum, userId]);

  const toAnswer = async (e) => {
    const answeredData: answered | undefined = userData.answered;
    if (
      answeredData === undefined ||
      userData.point === undefined ||
      userData.time === undefined
    )
      return;
    answeredData[`q${questionNum}`] = e.target.value;

    setIsAnswerd(e.target.value);
    await db
      .collection(COLLECTION_NAME)
      .doc(userId)
      .set(
        {
          answered: answeredData,
          point:
            question.answer === e.target.value
              ? userData.point + 1
              : userData.point,
          time: userData.time + downTime,
        },
        { merge: true }
      );
  };

  return (
    <div className={styles.container}>
          <figure style={{position:"fixed",right:"0",top:"0", width:"100px"}}>
            <img src="/realtime-quiz-app/images/logo.png" alt="" />
          </figure>
      <main className={styles.main}>
        <div style={{ display: questionNum === 0 ? "block" : "none" }}>
          <h1>???????????????????????????</h1>
          <h2 className={styles.title}>???????????????</h2>
          <p>?????????{userData ? userData.name : ""}</p>
          <p>?????????{userData ? userData.role : ""}</p>
          <br />
          <p>???????????????????????????????????????????????????</p>
        </div>
        <div style={{ display: questionNum > 0 ? "block" : "none" }}>
          <p>{userData ? userData.name : ""}??????????????????</p>
          <p className={styles.countdown} style={{ color: "red" }}>
            ??????<span className={styles.countdownno}>{downTime}</span>???
          </p>
          <h1 className={styles.title}>???{questionNum}???</h1>
          <h2>
            {isAnswerd !== "F" && isAnswerd !== "T"
              ? "??????????????????????????????" + isAnswerd
              : "?????????????????????"}
          </h2>
          <div
            style={{
              display:
                downTime === 0 && answers.A !== undefined ? "block" : "none",
            }}
          >
            <BarGraph A={answers.A} B={answers.B} C={answers.C} D={answers.D} />
            <ul  
              style={{
                display: "flex",
                listStyle: "none",
                justifyContent: "space-around",
                padding: 0,
              }}
            >
              <li>???A???{answers.A}</li>
              <li>???B???{answers.B}</li>
              <li>???C???{answers.C}</li>
              <li>???D???{answers.D}</li>
            </ul>
          </div>
          <div
            style={{
              display:
                isAnswerd !== "F" || question === undefined ? "none" : "block",
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

          <p>??????????????????????????????????????????????????????????????????</p>
        </div>
      </main>
    </div>
  );
}
