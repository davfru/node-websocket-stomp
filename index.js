const SockJS = require("sockjs-client");
const Stomp = require("stompjs");

let stompClient = null;

function connect() {
    let socket = new SockJS('http://localhost:8080/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        sendMessage();
        stompClient.subscribe('/topic/user', function (message) {
            console.log(message.body);
        });
    });
}

function disconnect() {
    if (!stompClient) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

function sendMessage() {
    stompClient.send("/app/user", {}, "hello!");
}

connect();