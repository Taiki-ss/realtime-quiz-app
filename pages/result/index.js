import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "styles/Home.module.scss";
import axios from "axios";

export default function Result() {
  const [showStatus, setShowStatus] = useState(false);
  const [result, setResult] = useState([]);
  const [showcount, setShowcount] = useState(0);
  const [amariDelete, setAmariDelete] = useState(false);
  const [top5, setTop5] = useState(false);
  const [top5count, setTop5count] = useState(5);
  // const [time, setTime] = useState(10);
  const [time, setTime] = useState(0);

  // useEffect(()=>{
  // if(time>0 && showStatus){
  // 	setTimeout(()=>{
  // 		setTime(time-1)
  // 	},1000)
  // }
  // },[time,showStatus])

  const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

  const test = async () => {
    await sleep(3000);
    console.log("表示");
  };

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
    document.querySelectorAll(".late").forEach((v) => {
      v.style.display = "none";
    });
    const length = document.querySelectorAll(".late").length;
    let kaisuu = Math.floor(length / 10);
    let amari = length % 10;

    if (document.querySelectorAll(".rank1").length + 2 > top5count) {
      setTop5count(document.querySelectorAll(".rank1").length + 2);
    }

    console.log(kaisuu);
    console.log(amari);
    if (!amariDelete && amari !== 0) {
      let time = 0;
      for (let i = 10 * kaisuu + amari - 1; i >= 10 * kaisuu; i--) {
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
        let i = 10 * (kaisuu - showcount) - 1;
        i >= 10 * (kaisuu - showcount - 1);
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
        let i = 10 * (kaisuu - showcount) - 1;
        i >= 10 * (kaisuu - showcount - 1) + top5count;
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

      <button onClick={showRanking}>ランキング表示</button>
      <button onClick={showTop5}>TOP５くらい表示</button>
      <main className={styles.main}>
        <h1 className={styles.title}>結果発表</h1>
        <p>{showStatus && time > 0 ? time + "秒" : ""}</p>
        <p>
          {showStatus && time === 0 ? "おめでとう！" : "まだ教えないよ〜ん"}
        </p>
        <div
          className="member-list-wrapper"
          style={{ display: showStatus && time === 0 ? "block" : "none" }}
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
              {menberList}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
