export function openSocket =  () {
    var socket;
    let token = getCookie("studentToken");
    var socketUrl = `http://112.74.33.254:2358/ws/message/${token}`;
    socketUrl = socketUrl.replace("https", "ws").replace("http", "ws");
    if (socket != null) {
        socket.close();
        socket = null;
    }
    socket = new WebSocket(socketUrl);
    socket.onopen = function () {
        console.log("websocket已打开");
    };
    
    socket.onclose = function (e) {
        console.log(
            "websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean
        );
        openSocket();
    };
};