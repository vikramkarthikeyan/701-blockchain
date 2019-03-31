pragma solidity ^0.5.0;

contract Survey {
 
 uint public totalSurveysCollected;
 uint public pointsPerSurvey;
 
 struct User {
     string name;
     uint balance;
     bool active;
 }
 
 mapping (address => User) public users;
 
 constructor() public {
     totalSurveysCollected = 0;
     pointsPerSurvey = 10;
 }
 
 event allowEntry(address user);
 event userRegistered(string name);
 event redeemedPoints(address user);
 
 modifier newUser(address user) { require(users[user].active == false); _; }
 modifier registeredUser(address user) {  require(users[user].active == true); _; }
 modifier hasPoints(address user, uint points) {    require(users[user].balance >= points); _;}
 
 function registerUser(string memory name) public newUser(msg.sender){
     users[msg.sender].name = name;
     users[msg.sender].balance = 0;
     users[msg.sender].active = true;
     emit userRegistered(name);
 }
 
 function addSurveyEntry() public registeredUser(msg.sender){
     users[msg.sender].balance += pointsPerSurvey;
     totalSurveysCollected += 1;
     emit allowEntry(msg.sender);
 }
 
 function redeemPoints(uint points) public registeredUser(msg.sender) hasPoints(msg.sender, points){
     users[msg.sender].balance -= points;
     emit redeemedPoints(msg.sender);
     
 }
 
}