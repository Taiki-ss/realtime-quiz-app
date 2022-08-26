import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "styles/Home.module.scss";
import axios from "axios";

export default function Result() {
  const [showStatus, setShowStatus] = useState(false);
  const [result, setResult] = useState([]);
    const [time, setTime] = useState(10);

    useEffect(()=>{
  	if(time>0 && showStatus){
  		setTimeout(()=>{
  			setTime(time-1)
  		},1000)
  	}
    },[time,showStatus])

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

  const menberList = result.map((obj, i) => {
	if(obj.member.length > 1){
		return (
			<li>
				{obj.lank}位：{obj.member.join('、')}・・・{obj.point}点(同率{obj.member.length}人)
			</li>
		)
	} else {
		return (
		  <li key={obj.name}>
			{obj.lank}位：{obj.member}・・・{obj.point}点
		  </li>
		);
	}

  });
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
        <p>{showStatus && time > 0 ? time + "秒" : ""}</p>
        <p>
          {showStatus && time === 0 ? "おめでとう！" : "まだ教えないよ〜ん"}
        </p>
        <div style={{ display: showStatus && time === 0 ? "block" : "none" }}>
          <ul>{menberList}</ul>
        </div>
      </main>
    </div>
  );
}
