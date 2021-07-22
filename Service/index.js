const firebase = require('firebase');
const express = require("express");
const app = express();
const cors = require("cors");
const functions = require("firebase-functions");
var AWS = require('aws-sdk/dist/aws-sdk-react-native');
AWS.config.update({region:'us-east-1',accessKeyId: 'ASIAVJDCQO5A3AIOXJKO', secretAccessKey: 'Vv4KaqEmjbHiL1G5gHWRqFcwO9Yg0VCiHJ2VndjY',
sessionToken:'FwoGZXIvYXdzEMb//////////wEaDPspd1NrhVA/lmqG+SK/AXBQpa9gM5SuZ+jkJenjrwjBjBJE20TxC3v8EDxZpTL3ybtLveu35K/GsMyicH5Zi9pUFbqsOS9vXoQ4FrQ8x3Xu68YLuKs9Up51wbx9AtwfDB5W0LP/P8fFrcbLkSSR1O+DC82N0anOqr4egp64gi81KnXQuaslziXbnxuh17IDOoBHbBGneZDOMd/l4pv9tAKdJoUqW6PGcEchDJZZKXH6qZJUo6Afe67aktqv77lXCpsF0TSYp4GqDB+6mzspKMHp3IcGMi0mFW6stSSK8YyOkrHVJSooomHeO9xctQ4GhQNl+RAOa0baESHi41IkwYLBeyU='});
var lambda = new AWS.Lambda({apiVersion: '2015-03-31'});
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var apigClientFactory = require('aws-api-gateway-client').default;
config = {invokeUrl:'https://7qk3g6xwoc.execute-api.us-east-1.amazonaws.com/default/securityQuestion'}
var axios = require('axios');

// To access firebase database.
var firebaseConfig = {
  apiKey: "AIzaSyAQSUDEnIWTE8r2-7PieXAYsmU--JGd4sI",
  authDomain: "halifaxfoodie-1c6fc.firebaseapp.com",
  projectId: "halifaxfoodie-1c6fc",
  storageBucket: "halifaxfoodie-1c6fc.appspot.com",
  messagingSenderId: "662125797776",
  appId: "1:662125797776:web:dda44fb84afcf45de71315"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
app.use(cors());
app.use(express.json());

app.post("/Register", (req, res) => {
  
  const userEmail = req.body.userEmail
  const userPassword = req.body.userPassword
  const userdata = req.body;
  const role = req.body.userRole;
  const securityQuestion = req.body.securityQuestion
  const mfaAnswer = req.body.answer

    if(userEmail != "" && userPassword != ""){
        firebase.auth().createUserWithEmailAndPassword(userEmail,userPassword).then((userCredential) => {
          const uid = userCredential.user.uid;
          userdata.uid = uid;
          console.log(userdata.uid)
          firestore.collection('Users').doc(userEmail).set(userdata).then(() => {
            console.log('User added!');
            axios.post('https://gnp1skts02.execute-api.us-east-1.amazonaws.com/default/securityQuestion?userID='+uid+'&securityQuestion='+securityQuestion+'&answer='+mfaAnswer+'&role='+role).then((response)=>console.log(response));
            }).catch(function(error){
                console.log(error.code); 
                console.log(error.message);
                window.alert("Error Message : "+error.message);
                res.status(400).send();
                }).catch(function(error){
                  console.log(error.code);  
                  console.log(error.message);
                  window.alert("Error Message : "+error.message);
                  res.status(400).send();
        });
    })
    } else{
        res.status(400).send();
    }
    res.status(200).send();
});

app.post("/GetRole", (req, res) => {
    var userEmail = JSON.stringify(req.body)
    console.log(userEmail);
    var temp = fetchRole('akshit787@gmail.com');
    
    async function fetchRole(userEmail) {
      var userRef = firestore.collection('Users');
      var snapshot = await userRef.get(userEmail);
      snapshot.forEach(doc => 
        {
          if(doc.id === userEmail){
            console.log(doc.id, '=>', doc.data());
            userRole = doc.data().userRole;
            return userRole;
          }
        });
        res.status(200).send({userRole:userRole});
    }
    console.log(temp);
    
  });

app.post("/RegisterRestaurant", (req, res) => {
  
  const restaurantName = req.body.restaurantName;
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  const restaurantData = req.body;
  const securityQuestion = req.body.securityQuestion;
  const mfaAnswer = req.body.answer;
  const role = req.body.userRole;

    if(userEmail != "" && userPassword != ""){
      firebase.auth().createUserWithEmailAndPassword(userEmail,userPassword).then((userCredential) => {
          const uid = userCredential.user.uid;
          restaurantData.uid = uid;
          console.log(restaurantData.uid)
            firestore.collection('Restaurants').doc(userEmail).set(restaurantData).then(() => {
            console.log('Restaurent added!');
            axios.post('https://gnp1skts02.execute-api.us-east-1.amazonaws.com/default/securityQuestion?userID='+uid+'&securityQuestion='+securityQuestion+'&answer='+mfaAnswer+'&role='+role).then((response)=>
            console.log(response));
            }).catch(function(error){
                console.log(error.code); 
                console.log(error.message);
                window.alert("Error Message : "+error.message); 
                res.status(400).send();
              })
              }).catch(function(error){
                    console.log(error.code);  
                    console.log(error.message);
                    window.alert("Error Message : "+error.message);
                    res.status(400).send();
              });
    } else {
      res.status(400).send();
    }
    res.status(200).send();
});

app.post("/Login", (req, res) => {
  const userEmail = req.body.userEmail
  const userPassword = req.body.userPassword
  var uID;
    if(userEmail != "" && userPassword != ""){
        firebase.auth().signInWithEmailAndPassword(userEmail,userPassword).then((userCredential) => {
          uID = userCredential.user.uid;
          console.log('User Successfully Logged In.');
          console.log(uID);
          res.status(200).send({uid:uID});
          }).catch(function(error){
             console.log(error.code);  
             console.log(error.message);
             window.alert("Error Message : "+error.message);
             res.status(400).send();
         })
    } else {
      res.status(400).send();
    }
});



app.listen(3001, () => {
  console.log("Login server is running on port 3001");
});
