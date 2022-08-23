const { getFirestore } = require("firebase-admin/firestore");
const { cert } = require("firebase-admin/app");
const serviceAccount = require("../../firebase-test-serviceAccount.json"); // 秘密鍵を取得
const admin = require("firebase-admin");

export default async function handler(req, res) {
  const COLLECTION_NAME = "users";
  //　初期化する
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }
  const db = getFirestore();
  let targetDoc,docRef;

  await db
    .collection(COLLECTION_NAME)
    .get()
    .then((res) => {
      res.docs.forEach((doc) => {
        if ((doc.data().name = "Taiki")) {
          targetDoc = doc.id;

          docRef = db.collection(COLLECTION_NAME).doc(targetDoc);
        }
        console.log(`${doc.id} => ${doc.data().name}`);
      });
    });

  //   const targetDoc = "a3kcv8CyEVEbHemPeoXB";
  if (req.method === "PATCH") {
    const docRef = db.collection(COLLECTION_NAME).doc();
    const insertData = {
      datano: "1",
      name: "Taiki",
      email: "taiki@example.com",
    };
    docRef.set(insertData);
  } else if (req.method === "POST") {
    const updateData = {
      q4: "A"
    };
    docRef.set(updateData, { merge: true });
	return 'データ更新'
  } else if (req.method === "GET") {
    await db
      .collection(COLLECTION_NAME)
      .get()
      .then((res) => {
        res.docs.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data().name}`);
        });
      });
  } else if (req.method === "DELETE") {
    const doc = await db.collection(COLLECTION_NAME).doc(targetDoc).delete();
  }
  res.status(200);
}
