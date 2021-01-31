require('dotenv').config();
axios = require('axios')

const serverID = process.env.SERVERID;
const channelID = process.env.CHANNELID;

console.log('Beep beep! 🤖');


var userID_FlightMap = {}

const Discord = require('discord.js');
const client = new Discord.Client();
// I recommend using dotenv, you can see how the project is setup here: 
// https://github.com/CodingTrain/Discord-Bot-Choo-Choo
// dotenv will be covered in a future video
client.login(process.env.DISCORDTOKEN);

client.on('ready', readyDiscord);

function readyDiscord() {
  console.log('💖');
}


client.on('message', handleMessage);



const commands = {
    signIn, typeOfUser, flightUpdate
}

function handleMessage(msg){
    //grab the first character check if its !
    let tokens = msg.content.split(" ")
    let command = tokens.shift()


    if(command.charAt(0) !=='!'|| msg.channel.type !== 'dm'){
        return
    }

    try{
        command = command.substring(1)
        commands[command](msg,tokens)
    } catch(err){
        msg.channel.send("Im sorry, that is not a correct command please try again.")
    }
}


function signIn(msg, tokens){
    //check if specific length and all numbers
try{
    if(!isNaN(tokens[0]) && tokens[0].length == 4){
        userID_FlightMap[msg.author.id]=tokens[0]
        console.log(userID_FlightMap)
        
        msg.channel.send("Awesome you are signed in to your flight!")

    } else {
        msg.channel.send("There seems to be an issue with your flight number.")

    }
} catch ( err ){
    msg.channel.send("There seems to be an issue with your flight number.")
}

}

function typeOfUser(msg, tokens){
    



}

function flightUpdate(msg, tokens){

    await axios.get(`https://api.flightapi.io/airline/${env.process.FLIGHTAPI}?num=${userID_FlightMap[msg.author.id]}&name=BA&date=20201223`).then((response) => {
    this.user = response.data
  }).catch(err => console.log(err))

}


