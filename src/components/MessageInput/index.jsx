import React, { useState } from "react";
import { useAuth } from '../../hooks/useAuth';
import { sendMessage } from "../../services/firebase";
import "./styles.css";

function MessageInput({ roomId }) {
    const { user } = useAuth();
    const [value, setValue] = useState(''); 

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(roomId, user, value);
        setValue('');
    };

    return (
        <form onSubmit={handleSubmit} className="message-input-container">
            <input
                type="text"
                placeholder="Type here"
                value={value}
                onChange={handleChange}
                className="message-input"
                required
                minLength={1}
            />
            <button type="submit" disable={value < 1} className="send-message">
                Send
            </button>
        </form>
    )
}

export {MessageInput};