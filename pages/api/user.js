const { getFirestore } = require("firebase-admin/firestore");
const { cert } = require("firebase-admin/app");
const serviceAccount = require("../../../FirebaseAdminSDK/steamship-gcp-firebase-adminsdk.json"); // 秘密鍵を取得
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

			res.status(200).json(data)
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
	if(req.body.userId){
		const updateData = {
			point: req.body.point,
			answered: req.body.answered
		}
		const docRef = await db.collection(COLLECTION_NAME).doc(req.body.userId);
		const result = docRef.set(updateData,{merge:true});
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
