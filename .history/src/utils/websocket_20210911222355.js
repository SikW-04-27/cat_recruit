import { getCookie } from './myCookie'

export function openSocket(socketUrl = `http://112.74.33.254:2358/ws/message/`, token = getCookie("studentToken")) {
    const socket = new WebSocket(`${socketUrl}${token}`);
    // let token = ;
    // var socketUrl = `${socketUrl}${token}`;
    socketUrl = socketUrl.replace("https", "ws").replace("http", "ws");
    if (socket != null) {
        socket.close();
        socket = null;
    }
    socket.onopen = function () {
        console.log("websocket已打开");
    };

    socket.onclose = function (e) {
        console.log(
            "websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean
        );
        openSocket();
    };
    return socket
};

const replace = ()=>{
    
}