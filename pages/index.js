import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  const [user, setUser] = useState("");
  useEffect(() => {
    axios
      .get("/api/user")
      .then((res) => {
        setUser(res.data);
		console.log(res.data)
      })
      .catch((error) => console.log(error));
  },[]);

  const updateUser = async () => {
    await axios.post("/api/user");
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const createNewUser = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        name: name,
      })
      .then((response) => {
        setUsers([...users, response.data]);
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
			<h2>名前{user.userName}</h2>
          <input value={user.name} onChange={handleChange} />
          <button onClick={() => updateUser()}>送信</button>
        </div>
      </main>
    </div>
  );
}
