import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    // axios
    //   .get("/api/user",{
    // 	params: {
    // 		currentName: "Wakai"
    // 	}
    //   })
    //   .then((res) => {
    //     setUsername(res.data.userName);
    // 	console.log(res.data)
    //   })
    //   .catch((error) => console.log(error));
  }, []);

  const updateUser = async () => {
    await axios.post("/api/user");
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const getUser = () => {
    axios
      .get("/api/user", {
        params: {
          currentName: username,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.docId) {
          setUsername(res.data.userName);
          setUserId(res.data.docId);
        } else {
          if (
            confirm(
              `ユーザー未登録です。\nこの名前「${username}」で新規登録しますか？`
            )
          ) {
            createNewUser();
          }
        }
      })
      .catch((error) => console.log(error));
  };

  const createNewUser = () => {
    axios
      .post("/api/user", {
        currentName: username,
      })
      .then((res) => {
        console.log("登録済み");
        getUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>エンジニア王はきみだ！</h1>

        <div>
          <h2>
            登録:{userId ? "登録済み" : "未登録"}
            <br /> 名前:{username ? username : "未登録"}
          </h2>
          <p>登録している名前を入力してください</p>
          <input
            placeholder="空白なしフルネーム"
            value={username}
            onChange={handleChange}
          />
          <button onClick={() => getUser()}>決定</button>
          {/* <button onClick={() => updateUser()}>送信</button> */}
        </div>
      </main>
    </div>
  );
}
