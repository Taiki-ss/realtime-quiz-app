import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.scss";
import { db } from "firebase/firebase_init";

export default function Home() {
  const [username, setUsername] = useState("");
  const [porto, setPorto] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");

  const getUser = () => {
    if (username === "" || porto === "" || role === "") {
      alert("名前、ポルト、職種を選択してから再度決定を押してください。");
      return;
    }

    db.collection("testUsers")
      .get()
      .then((res) => {
        const user = res.docs
          .map((doc) => {
            return doc.data().name == username &&
              doc.data().porto == porto &&
              doc.data().role === role
              ? doc
              : false;
          })
          .filter(Boolean);

        if (user.length) {
          setUserId(user[0].id);
          setUsername(user[0].data().name);
        } else {
          if (
            !confirm(
              `ユーザー未登録です。\nこの名前「${username}」で新規登録しますか？`
            )
          )
            return;

          db.collection("testUsers")
            .add({
              name: username,
              porto: porto,
              role: role,
              point: 0,
              answered: {
                q1: 'F',
                q2: 'F',
                q3: 'F',
                q4: 'F',
                q5: 'F',
                q6: 'F',
                q7: 'F',
                q8: 'F',
                q9: 'F',
                q10: 'F',
                q11: 'F',
                q12: 'F',
                q13: 'F',
                q14: 'F',
                q15: 'F',
              },
            })
            .then((response) => {
              console.log(response.id);
              setUserId(response.id);
            });
        }
      })
      .catch((error) => console.log(error));

  };

  const nameChange = (e) => {
    setUsername(e.target.value);
    setUserId("");
  };

  const portoChange = (e) => {
    setPorto(e.target.value);
    setUserId("");
  };

  const roleChange = (e) => {
    setRole(e.target.value);
    setUserId("");
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          エンジニア王は
          <br />
          きみだ！
        </h1>

        <div>
          <h2>
            登録:{userId ? "登録済み" : "未登録"}
            <br />
            {porto ? porto : "無所属"}の{role ? role : ""}
            <br />「{username ? username : ""}」
          </h2>
          <div className="input-container">
            <p>登録している名前を入力してください</p>
            <div className="input-name">
              <input
                placeholder="空白なしフルネーム"
                value={username}
                onChange={nameChange}
              />
            </div>
            <div className="input-porto">
              <select onChange={portoChange}>
                <option value="">所属ポルト</option>
                <option value="はさぽる">はさぽる</option>
                <option value="ありぽる">ありぽる</option>
                <option value="よしぽる">よしぽる</option>
                <option value="でじぽる">でじぽる</option>
                <option value="いとぽる">いとぽる</option>
                <option value="ときぽる">ときぽる</option>
                <option value="いえぽる">いえぽる</option>
                <option value="どこぽる？">どこぽる？</option>
              </select>
            </div>
            <div className="input-role">
              <select onChange={roleChange}>
                <option value="">職種</option>
                <option value="キャプテン">キャプテン</option>
                <option value="キャプテンルーム">キャプテンルーム</option>
                <option value="ディレクター">ディレクター</option>
                <option value="ディレクターサポート">
                  ディレクターサポート
                </option>
                <option value="カスタマーサポート">カスタマーサポート</option>
                <option value="デザイナー">デザイナー</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => getUser()}
            style={{ margin: "0 auto", width: "100%" }}
          >
            決定
          </button>

          <button
            style={{
              display: userId ? "block" : "none",
              backgroundColor: "pink",
              margin: "24px auto",
              width: "100%",
            }}
          >
            <Link
              href={{
                pathname: "/quiz",
                query: { username: username, userId: userId },
              }}
            >
              クイズへ進む
            </Link>
          </button>
        </div>
      </main>
    </div>
  );
}
