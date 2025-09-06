import { X } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        {/* Avatar + User info */}
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src="/avatar.png"
                alt="John Doe"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium">John Doe</h3>
            <p className="text-sm text-base-content/70">Online</p>
          </div>
        </div>

        {/* Close button */}
        <button>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
