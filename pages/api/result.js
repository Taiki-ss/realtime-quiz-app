const { getFirestore } = require("firebase-admin/firestore");
const { cert } = require("firebase-admin/app");
const admin = require("firebase-admin");

export default async function handler(req, res) {
  const COLLECTION_NAME = "result";
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

    await db
      .collection(COLLECTION_NAME)
      .doc("status")
      .get()
      .then((response) => {
        res.status(200).json(response.data().show);
      });
  }
}
