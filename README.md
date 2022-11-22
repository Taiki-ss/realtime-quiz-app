# realtime-quiz-app

## What
イベントでクイズ大会をした際のリアルタイムクイズ解答アプリ
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

起動時は`npm run dev`  
本番デプロイ時は`npm run build`すると`/out`にビルドされる

