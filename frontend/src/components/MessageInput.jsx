import { Image, Send, X } from "lucide-react";

const MessageInput = () => {
  return (
    <div className="p-4 w-full">
      {/* مثال صورة مرفوعة */}
      <div className="mb-3 flex items-center gap-2">
        <div className="relative">
          <img
            src="/avatar.png"
            alt="Preview"
            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
          />
          <button
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
            flex items-center justify-center"
            type="button"
          >
            <X className="size-3" />
          </button>
        </div>
      </div>

      {/* Input form */}
      <form className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
          />

          {/* زر رفع صورة */}
          <button
            type="button"
            className="hidden sm:flex btn btn-circle text-zinc-400"
          >
            <Image size={20} />
          </button>
        </div>

        {/* زر إرسال */}
        <button type="submit" className="btn btn-sm btn-circle">
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
