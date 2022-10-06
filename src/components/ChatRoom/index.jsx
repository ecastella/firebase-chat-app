import { MessageInput } from '../MessageInput';
import { MessageList } from '../MessageList';
import { chatRooms } from '../../data/chatRooms';
import './styles.css';

import { Link, useParams } from 'react-router-dom';

function ChatRoom() {
    const params = useParams();

    const room = chatRooms.find((x) => x.id === params.id);
    if (!room) {
        // TODO: 404
    }
    
    return (
        <>
        <h2>{room.title}</h2>
            <div>
                <h3>
                <Link to="/">⬅️ Return to Lobby</Link>
                </h3>
            </div>
            <div className='messages-container'>
                <MessageList roomId={room.id} />
                <MessageInput roomId={room.id} />
            </div>
        </>
    );
}

export { ChatRoom };