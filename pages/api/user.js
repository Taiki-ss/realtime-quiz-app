const { getFirestore } = require("firebase-admin/firestore");
const { cert } = require("firebase-admin/app");
const admin = require("firebase-admin");

export default async function handler(req, res) {
  // const COLLECTION_NAME = "users";
  const COLLECTION_NAME = "testUsers";
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
    const porto = req.query.porto;
    const role = req.query.role;
    const data = {
      docId: "",
      userName: "",
      porto: "",
      role: "",
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
          data.porto = response.data().porto;
          data.role = response.data().role;
          data.answered = response.data().answered;

          res.status(200).json(data);
        });
    } else if (req.query.getResult) {
      const result = [];
      await db
        .collection(COLLECTION_NAME)
        .orderBy("point", "desc")
        .get()
        .then((response) => {
          let lank = 1;
          let num = 0;
          let maxPoint = 0;
          response.docs.forEach((v, i) => {
            if (v.data().point === maxPoint) {
              result[num].member.push({
                name: v.data().name,
                porto: v.data().porto,
                role: v.data().role,
              });
              lank++;
            } else {
              if (i !== 0) {
                num++;
              }
              maxPoint = v.data().point;

              result[num] = {
                lank: lank,
                point: maxPoint,
                member: [
                  {
                    name: v.data().name,
                    porto: v.data().porto,
                    role: v.data().role,
                  },
                ],
              };
              lank++;
            }
          });

          res.status(200).json(result);
        });
    } else {
      await db
        .collection(COLLECTION_NAME)
        .get()
        .then((response) => {
          for (const doc of response.docs) {
            if (
              doc.data().name === currentUser &&
              doc.data().porto === porto &&
              doc.data().role === role
            ) {
              data.docId = doc.id;
              data.point = doc.data().point;
              data.userName = doc.data().name;
              data.porto = doc.data().porto;
              data.role = doc.data().role;
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
      const result = await db
        .collection(COLLECTION_NAME)
        .doc(req.body.userId)
        .set(updateData, { merge: true });
      res.status(200).json(result);
    } else {
      const updateData = {
        name: req.body.currentName,
        porto: req.body.porto,
        role: req.body.role,
        point: 0,
        answered: { q1: false },
      };
      const result = await db.collection(COLLECTION_NAME).doc().set(updateData);
      res.status(200).json(result);
    }
  }
}
