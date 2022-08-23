import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  const insertUser = async () => {
    await axios.post("/api/user")
  };
  const updateUser = async () => {
    await axios.patch("/api/user");
  };
  const getUser = async () => {
    await axios.get("/api/user");
  };
  const deleteUser = async () => {
    await axios.delete("/api/user");
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div className="flex min-h-screen flex-col items-center justify-center py-2">
          <button
            className="mt-4 w-60 rounded-full bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700"
            onClick={() => insertUser()}
          >
            Insert User
          </button>
          <button
            className="mt-4 w-60 rounded-full bg-yellow-500 py-2 px-4 font-bold text-white hover:bg-yellow-700"
            onClick={() => updateUser()}
          >
            Update User
          </button>
          <button
            className="mt-4 w-60 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            onClick={() => getUser()}
          >
            Get User
          </button>
          <button
            className="mt-4 w-60 rounded-full bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
            onClick={() => deleteUser()}
          >
            Delete User
          </button>
        </div>
      </main>
    </div>
  );
}
