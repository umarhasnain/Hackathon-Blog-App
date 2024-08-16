import { app ,db } from "./firebase.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  Timestamp,
  collection,
  addDoc,
} from "./firebase.js";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

//SignUp COde

let btnCreateAccount = document.getElementById("btnCreateAccount");

if (btnCreateAccount) {
  btnCreateAccount.addEventListener("click", () => {
    let yourSignUpName = document.getElementById("yourSignUpName");
    let yourSignUpEmail = document.getElementById("yourSignUpEmail");
    let yourSignUpPassword = document.getElementById("yourSignUpPassword");

    if (yourSignUpName.value === "") {
      new AWN().alert("Name Field Required!");
    } else if (yourSignUpEmail.value == "") {
      new AWN().alert("Email Field Required!");
    } else if (yourSignUpEmail.value == "@") {
      new AWN().alert("Email Field Is Not Correct!");
    } else if (yourSignUpPassword.value == "") {
      new AWN().alert("Password Field Required!");
    } else if (yourSignUpPassword.value <= 8) {
      new AWN().alert("Password Should Not Be Grater Then 8");
    }

    if (
      yourSignUpName.value !== "" ||
      yourSignUpEmail.value !== "" ||
      yourSignUpPassword.length <= 8
    ) {
      createUserWithEmailAndPassword(
        auth,
        yourSignUpEmail.value,
        yourSignUpPassword.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          new AWN().success("Account SignUp Succesfully With Google");
         

        async  function userDataSent() {
            const docRef = await addDoc(collection(db, "users"), {
              name:yourSignUpName.value,
              email:yourSignUpEmail.value,
              password:yourSignUpPassword.value
            });
            console.log("Document written with ID: ", docRef.id);
          }
          userDataSent()
         setTimeout(() => {
          window.location.href = "./login.html";
         }, 4000);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          new AWN().alert(errorCode);
        });
    }

    yourSignUpName.value = "";
    yourSignUpEmail.value = "";
    yourSignUpPassword.value = "";
  });
}

//SignUp With Google

let googleSignUp = document.getElementById("googleSignUp");

if (googleSignUp) {
  googleSignUp.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        new AWN().success("Account SignUp Succesfully With Google");

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        new AWN().alert(errorCode);
      });
  });
}

//Sign In COde

let loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    let loginName = document.getElementById("loginName");
    let loginemail = document.getElementById("loginemail");
    let loginpassword = document.getElementById("loginpassword");

    if (loginName.value === "") {
      new AWN().alert("Name Field Required!");
    } else if (loginemail.value == "") {
      new AWN().alert("Email Field Required!");
    } else if (loginemail.value == "@") {
      new AWN().alert("Email Field Is Not Correct!");
    } else if (loginpassword.value == "") {
      new AWN().alert("Password Field Required!");
    } else if (loginpassword.value <= 8) {
      new AWN().alert("Password Should Not Be Grater Then 8");
    }

    if (
      loginName.value !== "" ||
      loginemail.value !== "" ||
      loginpassword.length <= 8
    ) {
      signInWithEmailAndPassword(auth, loginemail.value, loginpassword.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          new AWN().success("Account Sign In Succesfully!");
          setTimeout(() => {
            window.location.href = "./dashboard.html";
          }, 2000);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("account Register Failed");
          new AWN().alert(errorCode);
        });
    }

    loginName.value = "";
    loginemail.value = "";
    loginpassword.value = "";
  });
}

//onAuthStateChanged

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log(user);
    // ...
  } else {
    // User is signed out
    console.log("user Sign Out");

    // ...
  }
});

// Sign Out

let signoutBtn = document.querySelector("#signoutBtn");

if (signoutBtn) {
  signoutBtn.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful");
        new AWN().success("SignOut Succesfully");
        // window.location.href = "./signup.html";
        setTimeout(() => {
          window.location.href = "./signup.html";
        }, 2000);
      })
      .catch((error) => {
        console.log("Sign-out Error");
        new AWN().alert(errorCode);
      });
  });
}
