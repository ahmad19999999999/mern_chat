import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {/* Header */}
      <ChatHeader />

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Message from other user */}
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="size-10 rounded-full border">
              <img src="/avatar.png" alt="User" />
            </div>
          </div>
          <div className="chat-header mb-1">
            <time className="text-xs opacity-50 ml-1">10:30 AM</time>
          </div>
          <div className="chat-bubble flex flex-col">
            <p>Hello! How are you?</p>
          </div>
        </div>

        {/* Message from auth user */}
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="size-10 rounded-full border">
              <img src="/avatar.png" alt="You" />
            </div>
          </div>
          <div className="chat-header mb-1">
            <time className="text-xs opacity-50 ml-1">10:31 AM</time>
          </div>
          <div className="chat-bubble flex flex-col">
            <p>I'm good, thanks!</p>
          </div>
        </div>
      </div>

      {/* Message input */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
