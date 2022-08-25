const { getFirestore } = require("firebase-admin/firestore");
const { cert } = require("firebase-admin/app");
const serviceAccount = require("../../steamship-gcp-firebase-adminsdk.jsonfirebase-test-serviceAccount.json"); // 秘密鍵を取得
const admin = require("firebase-admin");

export default async function handler(req, res) {
  const COLLECTION_NAME = "currentQuestion";
  //　初期化する
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }
  const db = getFirestore();
  let targetDoc = "",
    point = 0;

  if (req.method === "GET") {
    if (req.query.param === "currentNum") {
      await db
        .collection(COLLECTION_NAME)
        .doc("currentQuestion")
        .get()
        .then((response) => {
          res.status(200).json(response.data().currentQuestion);
        });
    }
    if (req.query.param === "getQuestion") {
      await db
        .collection('questions')
        .doc(`question${req.query.qNum}`)
        .get()
        .then((response) => {
			console.log(response.data())
          res.status(200).json(response.data());
        });
    }

  }

//   if (req.method === "POST") {
//     const updateData = {
//       name: req.body.currentName,
//       point: 0,
//     };
//     const docRef = await db.collection(COLLECTION_NAME).doc();
//     const result = docRef.set(updateData);
//     res.status(200).json(result);
//   }
}
