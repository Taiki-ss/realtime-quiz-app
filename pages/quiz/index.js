import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import axios from "axios";

export default function Quiz() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>第１問</h1>
        <p>{router.query.username}</p>
      </main>
    </div>
  );
}
