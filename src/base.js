import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDayaphv7xHVUoV1bGzr8FyTSeP9tV_Ebo",
    authDomain: "catch-of-the-day-d277a.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-d277a.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database());


//This is a named export
export { firebaseApp };

//this is a default export
export default base;

