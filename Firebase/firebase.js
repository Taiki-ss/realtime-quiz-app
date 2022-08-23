// firebaseをimportしています
import firebase from "firebase/app";

const firebaseConfig = {
  // 先程Firebaseにアプリを追加するところでコピーしたコードを追加
  apiKey: "AIzaSyDuJoRAwK-GiC7O-BWRP3UC0tWLp8E_2PU",
  authDomain: "test-9f6c6.firebaseapp.com",
  projectId: "test-9f6c6",
  storageBucket: "test-9f6c6.appspot.com",
  messagingSenderId: "413926796187",
  appId: "1:413926796187:web:fbc022a79a1d1c7fb28f3e",
};
// Firebaseのインスタンスが存在しない場合にのみ、インスタンスを作成します
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
