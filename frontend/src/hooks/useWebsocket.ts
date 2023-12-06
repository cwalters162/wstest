import {useCallback, useEffect, useState} from "react";

export enum Command {
    INCREMENT_COUNT = "increment_count",
    UPDATE_COUNT = "update_count",
}

export default function useWebSocket(handleMessage: (event: MessageEvent) => void) {
    const [socket, setSocket] = useState(null as unknown as WebSocket);

    const onOpen = useCallback(() => {
        console.log("Connected to server.")
    }, [])

    function updateOpen() {
        if (socket) {
            console.log("I'm adding a new open event listener");
            socket.addEventListener("open", onOpen)
        }
        return () => {
            if (socket) {
                console.log("I'm removing the open event listener");
                socket.removeEventListener("open", onOpen);
            }
        }
    }

    const onMessage = () => {
        if (socket) {
            console.log("I'm adding a new message event listener");
            socket.addEventListener('message', handleMessage);
        }
        return () => {
            if (socket) {
                console.log("I'm removing the message event listener");
                socket.removeEventListener('message', handleMessage);
            }
        }
    }

    useEffect(updateOpen, []);
    useEffect(onMessage, [socket]);

    const connect = useCallback((url: string) => {
        let ws = new WebSocket("ws://" + url);
        console.log(`Connecting to ${url}.`);

        setSocket(ws);
    }, [])

    const sendMessage = useCallback((command: Command, payload: string) => {
        if (socket) socket.send(JSON.stringify({command, payload}));
    }, [socket])

    const close = useCallback(() => {
        console.log("Closing connection.")
        if (socket && socket.readyState === socket.OPEN) socket.close();
    }, [socket]);

    return {
        connect,
        sendMessage,
        close,
    }
}