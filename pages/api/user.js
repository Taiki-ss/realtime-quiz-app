const { getFirestore } = require("firebase-admin/firestore");
const { cert } = require("firebase-admin/app");
const serviceAccount = require("../../firebase-test-serviceAccount.json"); // 秘密鍵を取得
const admin = require("firebase-admin");

export default async function handler(req, res) {
  const COLLECTION_NAME = "users";
  //   const currentUser = "Wakai";
  //　初期化する
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }
  const db = getFirestore();
  let targetDoc = "",
    point = 0;

  //   await db
  //     .collection(COLLECTION_NAME)
  //     .get()
  //     .then((res) => {
  //       for (const doc of res.docs) {
  //         if (doc.data().name === currentUser) {
  //           targetDoc = doc.id;
  //           point = doc.data().point;
  //           break;
  //         }
  //       }
  //     });

  if (req.method === "GET") {
    const currentUser = req.query.currentName;
    const data = {
      docId: "",
      userName: "",
      point: "",
      answered: "",
    };

    await db
      .collection(COLLECTION_NAME)
      .get()
      .then((response) => {
        for (const doc of response.docs) {
          if (doc.data().name === currentUser) {
            data.docId = doc.id;
            data.point = doc.data().point;
            data.userName = doc.data().name;
            data.answered = doc.data().answered;
            break;
          }
        }
        res.status(200).json(data);
      });
  }

  if (req.method === "POST") {
    const updateData = {
      name: req.body.currentName,
      point: 0,
      answered: { q1: false },
    };
    const docRef = await db.collection(COLLECTION_NAME).doc();
    const result = docRef.set(updateData);
    res.status(200).json(result);
  }
}
