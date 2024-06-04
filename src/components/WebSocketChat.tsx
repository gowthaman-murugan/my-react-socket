import { FC, useEffect, useRef, useState } from "react";


interface Message {
    targetID: string;
    message: string;
}


const WebSocketChat:FC = () => {
    const [userID, setUserID] = useState<string>('');
    const [targetID, setTargetID] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);
    const socketRef = useRef<WebSocket | null>(null);

    const connect = () => {
        if (userID) {
            socketRef.current = new WebSocket(`ws://localhost:8080/ws?user_id=${userID}`);

            socketRef.current.onmessage = (event: MessageEvent) => {
                const data = JSON.parse(event.data);
                setMessages((prevMessages) => [...prevMessages, data.message]);
            };

            socketRef.current.onclose = () => {
                console.log('WebSocket closed');
            };
        }
    };

    const sendMessage = () => {
        if (socketRef.current && targetID && message) {
            const msg: Message = { targetID, message };
            socketRef.current.send(JSON.stringify(msg));
            setMessage('');
        }
    };

    useEffect(() => {
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    return (
        <div>
            <input
                type="text"
                value={userID}
                onChange={(e) => {
                    setTargetID(`desktop_${e.target.value}`)
                    setUserID(e.target.value)}
                }
                placeholder="Enter your user ID"
            />
            <button onClick={connect}>Connect</button>
            <br />
            {/* <input
                type="text"
                value={targetID}
                onChange={(e) => setTargetID(e.target.value)}
                placeholder="Enter target user ID"
            /> */}
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
            />
            <button onClick={sendMessage}>Send Message</button>
            <br />
            <div>
                <h2>Messages</h2>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
        </div>
    );

}

export default WebSocketChat