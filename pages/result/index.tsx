import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "styles/Home.module.scss";
import { db } from "firebase/firebase_init";

type member = {
  name: string;
  porto: string;
  role: string;
  count: number;
};

type ranking = {
  lank?: number;
  point?: number;
  member?: member[] | undefined;
};

export default function Result() {
  const [showStatus, setShowStatus] = useState(false);
  const [result, setResult] = useState<ranking[]>([]);
  const [showcount, setShowcount] = useState(0);
  const [amariDelete, setAmariDelete] = useState(false);
  const [top5, setTop5] = useState(false);
  const [top5count, setTop5count] = useState(5);

  useEffect(() => {
    db.collection("result")
      .doc("status")
      .onSnapshot(async (snapshot: any) => {
        setShowStatus(snapshot.data().show);
        console.log(showStatus);
      });
  }, []);

  useEffect(() => {
    (async () => {
      await db
        .collection("testUsers")
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
                count: count,
              });
              lank++;
              count++;
            }
          });
          setResult(rankingArr);
        });
    })();
  }, []);

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
          <td>{obj.point}点</td>
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

    if (document.querySelectorAll(".rank1").length + 2 > top5count) {
      setTop5count(document.querySelectorAll(".rank1").length + 2);
    }

    console.log(kaisuu);
    console.log(amari);
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
      let time = 0;
      for (
        let i = showNum * (kaisuu - showcount) - 1;
        i >= showNum * (kaisuu - showcount - 1);
        i--
      ) {
        setTimeout(() => {
          (document.querySelector(`.late[data-count="${i}"]`) as any).style.display =
            "table-row";
        }, 100 * time);
        time++;
      }
      setShowcount(showcount+1);
      return;
    }

    if (kaisuu - showcount === 1) {
      let time = 0;
      for (
        let i = showNum * (kaisuu - showcount) - 1;
        i >= showNum * (kaisuu - showcount - 1) + top5count;
        i--
      ) {
        setTimeout(() => {
          (document.querySelector(`.late[data-count="${i}"]`) as any).style.display =
            "table-row";
        }, 100 * time);
        time++;
      }
      setTop5(true);
      return;
    }
  };

  const showTop5 = () => {
    (document.querySelector(
      `.late[data-count="${top5count - 1}"]`
    ) as any).style.backgroundColor = "pink";
    (document.querySelector(
      `.late[data-count="${top5count - 1}"]`
    ) as any).style.display = "table-row";
    if (top5count !== 1) setTop5count(top5count-1);
  };

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

      <button
        onClick={showRanking}
        style={{ display: showStatus ? "block" : "none" }}
      >
        ランキング表示
      </button>
      <button
        onClick={showTop5}
        style={{ display: showStatus ? "block" : "none" }}
      >
        TOP５くらい表示
      </button>
      <main className={styles.main}>
        <h1 className={styles.title}>結果発表</h1>
        <p>
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
