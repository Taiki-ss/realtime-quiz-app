import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "styles/Home.module.scss";
import { db } from "firebase/firebase_init";
import Rank1 from "compornent/rank1";

type member = {
  name: string;
  porto: string;
  role: string;
  time: number;
  count: number;
};

type ranking = {
  lank?: number;
  point?: number;
  member?: member[] | undefined;
};

const COLLECTION_NAME: string = process.env.NEXT_PUBLIC_COLLECTION_NAME
  ? process.env.NEXT_PUBLIC_COLLECTION_NAME
  : "users";

export default function Result() {
  const [showStatus, setShowStatus] = useState(false);
  const [result, setResult] = useState<ranking[]>([]);
  const [showcount, setShowcount] = useState(0);
  const [amariDelete, setAmariDelete] = useState(false);
  const [top5, setTop5] = useState(false);
  const [top5count, setTop5count] = useState(5);
  const [rankingCount, setRankingCount] = useState<number>(0);

  useEffect(() => {
    db.collection("result")
      .doc("status")
      .onSnapshot(async (snapshot: any) => {
        setShowStatus(snapshot.data().show);
        console.log(showStatus);
      });
  }, []);

  useEffect(() => {
    if (showStatus === false) return;
    (async () => {
      await db
        .collection(COLLECTION_NAME)
        .orderBy("point", "desc")
        .get()
        .then((res: any) => {
          const rankingArr: ranking[] = [];

          let lank: number = 1;
          let num: number = 0;
          let maxPoint: number = 0;
          let count: number = 0;
          res.docs.forEach((v: any, i: number) => {
            if (v.data().point !== maxPoint) {
              if (i !== 0) {
                num++;
              }
              maxPoint = v.data().point;

              rankingArr[num] = {
                lank: lank,
                point: maxPoint,
                member: [
                  {
                    name: v.data().name,
                    porto: v.data().porto,
                    role: v.data().role,
                    time: v.data().time,
                    count: count,
                  },
                ],
              };
              lank++;
              count++;
            } else {
              (rankingArr[num].member as member[]).push({
                name: v.data().name,
                porto: v.data().porto,
                role: v.data().role,
                time: v.data().time,
                count: count,
              });
              lank++;
              count++;
            }
          });
          console.log(rankingArr);
          setResult(rankingArr);
        });
    })();
  }, [showStatus]);

  const menberList = result.map((obj: ranking) => {
    return (obj.member as member[]).map((mem) => {
      return (
        <tr
          className={obj.lank === 1 ? "late rank1" : "late"}
          key={mem.count}
          data-count={mem.count}
        >
          <td>{obj.lank}位</td>
          <td>{mem.name}</td>
          <td>{mem.porto}</td>
          <td>{mem.role}</td>
          <td>
            {obj.point}点{" "}
            <span style={{ display: "none" }}>
              {obj.lank === 1 ? `(${110 - mem.time}秒)` : ``}
            </span>
          </td>
        </tr>
      );
    });
  });

  const showRanking = () => {
    const showNum = 15;
    document.querySelectorAll(".late").forEach((v: any) => {
      v.style.display = "none";
    });
    const length = document.querySelectorAll(".late").length;
    let kaisuu = Math.floor(length / showNum);
    let amari = length % showNum;

    // rank1の人数
    setTop5count(document.querySelectorAll(".rank1").length);

    if (!amariDelete && amari !== 0) {
      let time = 0;
      for (let i = showNum * kaisuu + amari - 1; i >= showNum * kaisuu; i--) {
        setTimeout(() => {
          (
            document.querySelector(`.late[data-count="${i}"]`) as any
          ).style.display = "table-row";
        }, 100 * time);
        time++;
      }
      setAmariDelete(true);
      return;
    }

    if (kaisuu - showcount > 1) {
      setRankingCount(kaisuu - showcount);
      let time = 0;
      for (
        let i = showNum * (kaisuu - showcount) - 1;
        i >= showNum * (kaisuu - showcount - 1);
        i--
      ) {
        setTimeout(() => {
          (
            document.querySelector(`.late[data-count="${i}"]`) as any
          ).style.display = "table-row";
        }, 100 * time);
        time++;
      }
      setShowcount(showcount + 1);
      return;
    }

    if (kaisuu - showcount === 1) {
      setRankingCount(kaisuu - showcount);
      let time = 0;
      for (
        let i = showNum * (kaisuu - showcount) - 1;
        i >= showNum * (kaisuu - showcount - 1) + top5count;
        i--
      ) {
        setTimeout(() => {
          (
            document.querySelector(`.late[data-count="${i}"]`) as any
          ).style.display = "table-row";
        }, 100 * time);
        time++;
      }
      setTop5(true);
      return;
    }
  };

  const showTop5 = () => {
    setRankingCount(0);
    for (let i = top5count; i > 0; i--) {
      (
        document.querySelector(`.late[data-count="${i - 1}"]`) as any
      ).style.backgroundColor = "blue";
      (
        document.querySelector(`.late[data-count="${i - 1}"]`) as any
      ).style.display = "table-row";
    }
  };

  const rank1 = () => {
    if (result[0].member === undefined) return;

    let topTime: number = 0;

    for (let i = 0; i < (result[0].member as any).length; i++) {
      if (topTime < result[0].member[i].time) {
        topTime = result[0].member[i].time;
      }
    }

    console.log(topTime);

    document.querySelectorAll(".rank1>td>span").forEach((v: any) => {
      if (Number(v.innerText.replace(/[^0-9$]/g, "")) === 110 - topTime) {
        v.classList.add("No1");
      }
      v.style.display = "inline-block";
    });

    setTimeout(() => {
      document.querySelectorAll(".No1").forEach((v: any) => {
        v.parentNode.parentNode.style.backgroundColor = "red";
      });
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div>あと{rankingCount}回</div>
      <button
        onClick={showRanking}
        style={{
          display: showStatus && !top5 ? "inline-block" : "none",
          padding: "8px",
          margin: 0,
        }}
      >
        <p style={{ writingMode: "vertical-rl", margin: 0 }}>ランキング表示</p>
      </button>
      <button
        onClick={showTop5}
        style={{
          display: showStatus && top5 ? "block" : "none",
          backgroundColor: "blue",
          color: "white",
          padding: "8px",
          margin: 0,
        }}
      >
        <p style={{ writingMode: "vertical-rl", margin: 0 }}>１位表示</p>
      </button>
      <button
        onClick={rank1}
        style={{
          display: showStatus && top5 ? "block" : "none",
          backgroundColor: "red",
          color: "white",
          padding: "8px",
          margin: 0,
        }}
      >
        <p style={{ writingMode: "vertical-rl", margin: 0 }}>真の１位</p>
      </button>
      <main>
        <h1
          className={styles.title}
          style={{
            writingMode: "vertical-rl",
            position: "absolute",
            right: 0,
            fontSize: "80px",
            top: "50%",
            transform: "translate(0,-50%)",
            color: "#dab300",
			background: "linear-gradient(#05FBFF, #1D62F0 ) fixed",
            height: "100%",
            padding: "0 8px",
          }}
        >
          結果発表
        </h1>
        <p style={{fontSize:"60px",fontWeight:"bold",color:"white",textAlign:"center"}}>
          {showStatus
            ? "見事エンジニア王に輝いたのは？？"
            : "まだ教えないよ〜ん"}
        </p>
        <div className="member-list-wrapper">
          <table className="member-list">
            <tbody>{menberList}</tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
