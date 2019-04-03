pragma solidity ^0.5.0;

contract Survey {
 
 uint public totalSurveysCollected;
 uint public pointsPerSurvey;
 
 struct User {
     string name;
     uint balance;
     bool active;
 }
 
 mapping (string => User) public users;
 
 constructor() public {
     totalSurveysCollected = 0;
     pointsPerSurvey = 10;
 }
 
 event allowEntry(string user);
 event userRegistered(string name);
 event redeemedPoints(string user);
 
 modifier newUser(string memory user) { require(users[user].active == false); _; }
 modifier registeredUser(string memory user) {  require(users[user].active == true); _; }
 modifier hasPoints(string memory user, uint points) {    require(users[user].balance >= points); _;}
 
 function registerUser(string memory name) public newUser(name){
     users[name].name = name;
     users[name].balance = 0;
     users[name].active = true;
     emit userRegistered(name);
 }

 function getSurveyCount() view public returns(uint){
     return totalSurveysCollected;
 }
 
 function addSurveyEntry(string memory name) public registeredUser(name){
     users[name].balance += pointsPerSurvey;
     totalSurveysCollected += 1;
     emit allowEntry(name);
 }
 
 function redeemPoints(string memory name, uint points) public registeredUser(name) hasPoints(name, points){
     users[name].balance -= points;
     emit redeemedPoints(name);
     
 }
 
}