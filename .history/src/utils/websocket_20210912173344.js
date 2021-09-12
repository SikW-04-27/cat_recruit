import { getCookie } from './myCookie'

const replaceHttpToWebSocket = (url) => {
    return url.replace("https", "ws").replace("http", "ws");
}

export function openSocket(socketUrl = `http://47.107.49.231/ws/message/`, token = getCookie("studentToken"), customConfig = {onopen: () => {console.log("websocket已打开111");}}) {
    const socket = new WebSocket(replaceHttpToWebSocket(`${socketUrl}${token}`));
    // let token = ;
    // var socketUrl = `${socketUrl}${token}`;
    // socketUrl = socketUrl.replace("https", "ws").replace("http", "ws");
    // todo 检查

    const config = {
        onopen: () => {
            console.log("websocket已打开");
        }
    }

    const mergeConfig = Object.assign(config, customConfig)
    socket.onopen=mergeConfig.onopen

    socket.onclose = function (e) {
        // console.log(
        //     "websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean
        // );
        openSocket();
    };
    return socket
};

