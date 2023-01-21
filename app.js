  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
  import { getDatabase,ref,onChildAdded} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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
  
  var loader = document.getElementById('loader')
  var showQuetion = document.getElementById('showQuetion')

  var abc = document.getElementById('abc')


  function getDataFromDatabase(){
    loader.style.display = 'block'
    showQuetion.style.display = 'none'

    const refrenece = ref(db, 'questions/')
    onChildAdded(refrenece,function(data){
        console.log(data.val());

        
        questions.push(data.val())
        loader.style.display = 'none'
        showQuetion.style.display = 'block'
    renderQuestion()
    })
  }
  getDataFromDatabase()


var questions = [];


  var currentQuetion = document.getElementById('currentQuetion')
  var totalQuestion = document.getElementById('totalQuestion')
  var question = document.getElementById('question')
  var answerParent = document.getElementById('answerParent')

  var indexNum = 0
  var score = 0

window.checkQuetion = function(a,b){
  if(a == b){
    score ++
    console.log(score);
   }
    nextQuestion()
    
}

window.nextQuestion = function(){
    if(indexNum + 1 == questions.length){
        alert('your score is '+ score)
        alert('your percent is '+ score * 10 +'%')
    }else{
        indexNum ++
        renderQuestion()
    }
}

  function renderQuestion(){
    currentQuetion.innerHTML = indexNum + 1
    totalQuestion.innerHTML = questions.length
    var obj = questions[indexNum]
    question.innerHTML = obj.question
    answerParent.innerHTML = ''
    for(var i=0;i<obj.options.length; i++){
        answerParent.innerHTML += `<div class="col-md-6">
        <div class="py-2">
            <button onclick="checkQuetion('${obj.options[i]}','${obj.correctAnswer}')" class="btn btn-dark fs-4 rounded-pill w-100">
                ${obj.options[i]}
            </button>
        </div>
    </div>`
    }
  }
  renderQuestion()



