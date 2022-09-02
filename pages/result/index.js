import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "styles/Home.module.scss";
import { db } from "firebase/firebase_init";

export default function Result() {
  const [showStatus, setShowStatus] = useState(false);
  const [result, setResult] = useState([]);
  const [showcount, setShowcount] = useState(0);
  const [amariDelete, setAmariDelete] = useState(false);
  const [top5, setTop5] = useState(false);
  const [top5count, setTop5count] = useState(5);

  // useEffect(() => {
  //   db.collection("result")
  //     .doc("status")
  //     .onSnapshot(async (snapshot) => {
  //       setShowStatus(snapshot.data().show);
	// 	console.log(showStatus)
  //     });
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     const rankingArr = [];
  //     await db
  //       .collection("testUsers")
  //       .orderBy("point", "desc")
  //       .get()
  //       .then((res) => {
  //         let lank = 1;
  //         let num = 0;
  //         let maxPoint = 0;
  //         let count = 0;
  //         res.docs.forEach((v, i) => {
  //           if (v.data().point === maxPoint) {
  //             rankingArr[num].member.push({
  //               name: v.data().name,
  //               porto: v.data().porto,
  //               role: v.data().role,
  //               count: count,
  //             });
  //             lank++;
  //             count++;
  //           } else {
  //             if (i !== 0) {
  //               num++;
  //             }
  //             maxPoint = v.data().point;

  //             rankingArr[num] = {
  //               lank: lank,
  //               point: maxPoint,
  //               member: [
  //                 {
  //                   name: v.data().name,
  //                   porto: v.data().porto,
  //                   role: v.data().role,
  //                   count: count,
  //                 },
  //               ],
  //             };
  //             lank++;
  //             count++;
  //           }
  //         });
  //         setResult(rankingArr);
  //       });
  //   })();

  // }, []);

  const menberList = result.map((obj) => {
    return obj.member.map((mem) => {
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
    const showNum = 20;
    document.querySelectorAll(".late").forEach((v) => {
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
          document.querySelector(`.late[data-count="${i}"]`).style.display =
            "table-row";
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
          document.querySelector(`.late[data-count="${i}"]`).style.display =
            "table-row";
        }, 100 * time);
        time++;
      }
      setShowcount(showcount++);
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
          document.querySelector(`.late[data-count="${i}"]`).style.display =
            "table-row";
        }, 100 * time);
        time++;
      }
      setTop5(true);
      return;
    }
  };

  const showTop5 = () => {
    document.querySelector(
      `.late[data-count="${top5count - 1}"]`
    ).style.backgroundColor = "pink";
    document.querySelector(
      `.late[data-count="${top5count - 1}"]`
    ).style.display = "table-row";
    if (top5count !== 1) setTop5count(top5count--);
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

      <button onClick={showRanking} style={{ display: showStatus ? "block" : "none" }}>ランキング表示</button>
      <button onClick={showTop5} style={{ display: showStatus ? "block" : "none" }}>TOP５くらい表示</button>
      <main className={styles.main}>
        <h1 className={styles.title}>結果発表</h1>
        <p>
          {showStatus ? "見事エンジニア王に輝いたのは？？" : "まだ教えないよ〜ん"}
        </p>
        <div
          className="member-list-wrapper"
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
              <tr className="late" data-count="1"><td>1位</td><td>○○ ○○さん</td><td>よしぽる</td><td>エンジニア</td><td>25点</td></tr>
              <tr className="late" data-count="1"><td>1位</td><td>○○ ○○さん</td><td>ありぽる</td><td>ディレクター</td><td>25点</td></tr>
              <tr className="late" data-count="1"><td>1位</td><td>○○ ○○さん</td><td>でじぽる</td><td>エンジニア</td><td>25点</td></tr>
              <tr className="late" data-count="1"><td>4位</td><td>○○ ○○さん</td><td>おむぽる</td><td>ディレクター</td><td>23点</td></tr>
              <tr className="late" data-count="1"><td>5位</td><td>○○ ○○さん</td><td>いとぽる</td><td>エンジニア</td><td>22点</td></tr>
              <tr className="late" data-count="1"><td>6位</td><td>○○ ○○さん</td><td>ときぽる</td><td>キャプテンルーム</td><td>21点</td></tr>
              <tr className="late" data-count="1"><td>7位</td><td>○○ ○○さん</td><td>はさぽる</td><td>エンジニア</td><td>20点</td></tr>
              <tr className="late" data-count="1"><td>8位</td><td>○○ ○○さん</td><td>よしぽる</td><td>ディレクター</td><td>19点</td></tr>
              <tr className="late" data-count="1"><td>9位</td><td>○○ ○○さん</td><td>いとぽる</td><td>エンジニア</td><td>17点</td></tr>
              <tr className="late" data-count="1"><td>9位</td><td>○○ ○○さん</td><td>よしぽる</td><td>エンジニア</td><td>15点</td></tr>
              <tr className="late" data-count="1"><td>11位</td><td>○○ ○○さん</td><td>よしぽる</td><td>ディレクター</td><td>14点</td></tr>
              <tr className="late" data-count="1"><td>12位</td><td>○○ ○○さん</td><td>ありぽる</td><td>エンジニア</td><td>13点</td></tr>
              <tr className="late" data-count="1"><td>13位</td><td>○○ ○○さん</td><td>ありぽる</td><td>ディレクター</td><td>11点</td></tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
