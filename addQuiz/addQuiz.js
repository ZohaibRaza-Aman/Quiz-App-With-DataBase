  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
  import { getDatabase ,ref,set,push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCSUbXWR85pPXHykEFezGc6A0O9pd4pdc8",
    authDomain: "quiz-app-103eb.firebaseapp.com",
    databaseURL: "https://quiz-app-103eb-default-rtdb.firebaseio.com",
    projectId: "quiz-app-103eb",
    storageBucket: "quiz-app-103eb.appspot.com",
    messagingSenderId: "596367183049",
    appId: "1:596367183049:web:929cc16055a2c0dc12d118",
    measurementId: "G-82WWVRTZKH"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase();


  var question = document.getElementById('question')
  var option = document.getElementById('option')
  var optionsParent = document.getElementById('optionsParent')
  var correctAnswerElem = document.getElementById('correctAnswer')

  var options = []
  var correctAnswer

  function renderOptions(){
    optionsParent.innerHTML = ''
    for(var i=0;i<options.length; i++){
      optionsParent.innerHTML += `<li onclick="setCorrectAnswer('${options[i]}')" class="p-2 bg-light fs-5 rounded shadow my-2">${options[i]}</li>`
    }
  }


  window.addOption = function(){
    options.push(option.value)
    renderOptions()
  }

  window.setCorrectAnswer = function(a){
    correctAnswer = a
    correctAnswerElem.innerHTML = correctAnswer
  }

  window.submitQuetion = function(){
    var obj = {
        question : question.value,
        options : options,
        correctAnswer : correctAnswer
    } 
    obj.id = push(ref(db,'questions/')).key
    const Reference = ref(db,`questions/${obj.id}`)
    set(Reference,obj) 
  }