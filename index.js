// const stomp = require('stompjs');
// let client = stomp.overTCP("localhost:8080/websocket");
//
// function testConnection() {
//     console.log(client);
// }
//
// testConnection();

// https://stackoverflow.com/questions/54786323/how-can-i-make-spring-websocket-node-js-client
// https://www.toptal.com/java/stomp-spring-boot-websocket

const SockJS = require("sockjs-client");
const Stomp = require("stompjs");

let stompClient = null;

function connect() {
    let socket = new SockJS('http://localhost:8080/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        //sendName();
        stompClient.subscribe('/topic/user', function (greeting) {
            console.log(JSON.parse(greeting.body).content);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/user", {}, JSON.stringify({ name: "ciao"}));
}

connect();