const { getFirestore } = require("firebase-admin/firestore");
const { cert } = require("firebase-admin/app");
const admin = require("firebase-admin");

export default async function handler(req, res) {
  const COLLECTION_NAME = "users";
  //　初期化する
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert({
        projectId: process.env.FSA_PROJECT_ID,
        privateKey: process.env.FSA_PRIVATE_KEY.replace(/\\n/g, "\n"),
        clientEmail: process.env.FSA_CLIENT_EMAIL,
      }),
    });
  }
  const db = getFirestore();

  if (req.method === "GET") {
    const currentUser = req.query.currentName;
    const data = {
      docId: "",
      userName: "",
      point: "",
      answered: "",
    };

    if (req.query.userId) {
      await db
        .collection(COLLECTION_NAME)
        .doc(req.query.userId)
        .get()
        .then((response) => {
          data.docId = req.query.userId;
          data.point = response.data().point;
          data.userName = response.data().name;
          data.answered = response.data().answered;

          res.status(200).json(data);
        });
    } else {
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
  }

  if (req.method === "POST") {
    if (req.body.userId) {
      const updateData = {
        point: req.body.point,
        answered: req.body.answered,
      };
      const docRef = await db.collection(COLLECTION_NAME).doc(req.body.userId);
      const result = docRef.set(updateData, { merge: true });
      res.status(200).json(result);
    } else {
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
}
