const Chat = ({descendingOrderMessages,userId,clickedUserId}) => {
    return (
        <>
            <div className="chat-display">
                {descendingOrderMessages.map((message, _index) => (
                    <div key={_index}>
                        {(message.senderid===userId)?<><div className="chat-message-header1">
                            <p>{message.name}</p>
                            <div className="img-container">
                                <img src={message.img} alt={message.name + ' profile'}/>
                            </div>
                        </div>
                        <p className="chat-message-content1">{message.message}</p></>:
                        <>
                        <div className="chat-message-header2">
                            <div className="img-container">
                                <img src={message.img} alt={message.name + ' profile'}/>
                            </div>
                            <p>{message.name}</p>
                        </div>
                        <p className="chat-message-content2">{message.message}</p></>}
                    </div>
                    
                ))}
            </div>
        </>
    )
}

export default Chat