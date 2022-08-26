import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "styles/Home.module.scss";
import axios from "axios";

export default function Result() {

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
      </main>
    </div>
  );
}
