# realtime-quiz-app

## What
イベントでクイズ大会をした際のリアルタイムクイズ解答アプリ  
エントリー画面　　
<p><img width="370" alt="top" src="https://user-images.githubusercontent.com/81791711/203260186-865012b5-2a61-402a-8000-262734421cfc.png"></p>
スタンバイ画面　　
<p><img width="370" alt="entry" src="https://user-images.githubusercontent.com/81791711/203260373-85717dcf-7d2b-4a05-97cb-a2ecb4a0298f.png"></p>
解答画面　　
<p><img width="368" alt="quiz" src="https://user-images.githubusercontent.com/81791711/203260419-7b90d254-5972-427c-93ab-56d5bc01adba.png"></p>
回答数画面　　
<p><img width="371" alt="answer" src="https://user-images.githubusercontent.com/81791711/203260947-41e009f2-da91-4bbc-afea-87ea6054236d.png"></p>
ランキング画面　　
<p><img width="1301" alt="rank" src="https://user-images.githubusercontent.com/81791711/203260670-7289127e-115c-4561-9a4c-acd7b0907931.png"></p>
<p><img width=""1300" src="https://user-images.githubusercontent.com/81791711/205552296-6f802c51-b86b-4a98-a71f-29e8debd6d6f.png"></p>


### 使用技術

Next.js, TypeScript, Firestore
### 制作期間
2週間ほど

### 機能
- 回答者登録
- リアルタイムに参加者の端末が同期して同タイミングで解答
- カウントダウン
- 解答状況のグラフ表示
- 正解数と解答タイム集計
- 最下位から１位までのランキング表示

## How
### 環境構築
/firebase/firebase_init.js
例）
```
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxx.firebaseapp.com",
  projectId: "xxxxxxxxxxx",
  storageBucket: "xxxxxxxxxx",
  messagingSenderId: "xxxxxxxx",
  appId: "xxxxxxxxxxxxxxx"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch {}

export const db = firebase.firestore();
```

[Taiki-ssのFirebaseアカウント用ファイル](https://drive.google.com/drive/folders/16P2KaQr0ExQDs8CzxUfYKq3bfb3CzvAl?usp=share_link)

### Firestoreのデータ構造
<p><img width="1017" alt="result" src="https://user-images.githubusercontent.com/81791711/203260496-14b9be12-906e-4eb7-9b82-8cbacf2a281a.png"></p>
<p><img width="1020" alt="currentQuestions" src="https://user-images.githubusercontent.com/81791711/203261653-cc61ad68-1d24-4601-b9e0-5d1814dc34e7.png"></p>
<p><img width="1018" alt="questions" src="https://user-images.githubusercontent.com/81791711/203261733-bcfb1450-2eab-459a-b43b-7fd12fba7b75.png"></p>
<p><img width="1017" alt="users" src="https://user-images.githubusercontent.com/81791711/203261831-660931db-930a-49e1-8cd8-a308ab62d4ea.png"></p>

起動時は`npm run dev`  
本番デプロイ時は`npm run build`すると`/out`にビルドされる

