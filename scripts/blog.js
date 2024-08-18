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
  app,
  db,
  getFirestore,
  doc,
  setDoc,
  Timestamp,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "./firebase.js";

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    let uid = user.uid;
    console.log("Current User", uid, user);
  

    async function displayPosts() {
        
      const postsContainer = document.getElementById("posts-container");
      const q = query(collection(db, "blogs"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const blog = [];

        querySnapshot.forEach((doc) => {

            let userName = document.getElementById("userName");
            let newName = user.displayName || doc.data().name;
        
            userName.innerHTML = newName.toUpperCase();
          blog.push(doc.data());

          // Create a card element
          const card = document.createElement("div");
          card.className = "card";

          // Get the data from the document
          const data = doc.data();

          // Populate the card with data
          const title = document.createElement("h2");
          title.textContent = data.blog_heading; // Assuming the blog post has a 'title' field
          card.appendChild(title);

          const content = document.createElement("p");
          content.textContent = data.blogTextArea; // Assuming the blog post has a 'content' field
          card.appendChild(content);

          // const makeDiv = document.createElement('div')
          // makeDiv.className='card1'

          const displayName = document.createElement("p");
          displayName.className = "name";
          displayName.textContent = data.name; // Assuming the blog post has a 'content' field
          card.appendChild(displayName);

          const date = document.createElement("p");
          date.className = "date";
          date.textContent = new Date().toDateString(); // Assuming the blog post has a 'date' field as a timestamp
          card.appendChild(date);

          // Append the card to the container
          postsContainer.appendChild(card);
        });
      });
    }

    // Call the function to display posts
    displayPosts();



    // ...
  } else {
    // User is signed out
    // ...
    console.log("Current User SignOUt");
  }

  
});
