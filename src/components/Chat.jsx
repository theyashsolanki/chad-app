import { useEffect, useState } from "react"
import {addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where} from 'firebase/firestore'
import { auth, db } from "../config/firebase";
import '../styles/Chat.css'

export const Chat = ({room}) => {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([])

    const messageRef = collection(db, 'messages')

    useEffect(() => {
        const queryMessages = query(messageRef, 
            where("room", "==", room),
            orderBy('createdAt'))
        const unsub = onSnapshot(queryMessages, (snapshot) => {
            let messagesArr = []
            snapshot.forEach((doc) => {
                messagesArr.push({...doc.data(), id: doc.id})
            })
           
            setMessages(messagesArr)
            
        })

        return () => {
            unsub()
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(newMessage === '') return;

        await addDoc(messageRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        })
        setNewMessage('')

    }
    return (
        <div className="chat-app">
            <div className="header">
                <h1>Current Room : {room}</h1>
            </div>
            <div className="messages">{
                messages.map(message => (
                    <div className="message" key={message.id}>
                        <span className="user">{message.user}</span>
                        {message.text}
                    </div>
                ))
            }</div>
            <form onSubmit={handleSubmit} className="new-message-form">
                <input className="new-message-input" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your message here..."/>
                <button className="send-button">Send</button>
            </form>
        </div>
    )
}