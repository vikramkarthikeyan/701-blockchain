pragma solidity ^0.5.0;

contract Survey {
 
 uint public totalSurveysCollected;
 uint public pointsPerSurvey;
 
 struct User {
     uint balance;
     bool active;
     bool banned;
     string secret;
 }
 
 mapping (uint => User) public users;
 
 constructor() public {
     totalSurveysCollected = 0;
     pointsPerSurvey = 10;
 }
 
 event allowEntry(uint user);
 event userRegistered(uint name);
 event redeemedPoints(uint user);
 
 modifier newUser(uint user) { require(users[user].active == false); _; }
 modifier registeredUser(uint user) {  require(users[user].active == true); _; }
 modifier hasPoints(uint user, uint points) {    require(users[user].balance >= points); _;}
 modifier notBanned(uint user) { require(users[user].banned == false); _;}
 
 function registerUser(uint user) public newUser(user){
     users[user].balance = 0;
     users[user].active = true;
     users[user].banned = false;
     emit userRegistered(user);
 }

 function getSurveyCount() view public returns(uint){
     return totalSurveysCollected;
 }
  
 function getPoints(uint user) view public registeredUser(user) notBanned(user) returns(uint){
     return users[user].balance;
 }
 
 function getUserHash(uint user) view public registeredUser(user) notBanned(user) returns(string memory){
     return users[user].secret;
 }
 
 function updateUserHash(uint user, string memory secret) public registeredUser(user) notBanned(user){
     users[user].secret = secret;
 }

 function banUser(uint user) public registeredUser(user){
     users[user].banned = true;
 }
 
 function addSurveyEntry(uint user) public registeredUser(user) notBanned(user){
     users[user].balance += pointsPerSurvey;
     totalSurveysCollected += 1;
     emit allowEntry(user);
 }

 function redeemPoints(uint user, uint points) public registeredUser(user) hasPoints(user, points){
     users[user].balance -= points;
     emit redeemedPoints(user);
 }
 
}