const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports = module.exports = functions.database.ref("vehicles/{vehicleId}").onCreate(
  (snapshot, context) =>
    new Promise((resolve, reject) => {
      console.log("log in cloud functions: ", snapshot.val());
      const data = snapshot.val();
      console.log("log in cloud functions context: ", context.params);
      return admin.auth().createUser({
        uid: data.id,
        email: data.email,
        emailVerified: false,
        password: data.password,
        displayName: data.driverName,
        disabled: false
      });
    })
);
