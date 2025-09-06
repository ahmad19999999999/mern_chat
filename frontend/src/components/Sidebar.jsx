import { Users } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        {/* Filter toggle (static) */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input type="checkbox" className="checkbox checkbox-sm" />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">(3 online)</span>
        </div>
      </div>

      {/* Users list (static demo) */}
      <div className="overflow-y-auto w-full py-3">
        <button
          className="w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors"
        >
          <div className="relative mx-auto lg:mx-0">
            <img
              src="/avatar.png"
              alt="User"
              className="size-12 object-cover rounded-full"
            />
            <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
          </div>

          <div className="hidden lg:block text-left min-w-0">
            <div className="font-medium truncate">John Doe</div>
            <div className="text-sm text-zinc-400">Online</div>
          </div>
        </button>

        <button
          className="w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors"
        >
          <div className="relative mx-auto lg:mx-0">
            <img
              src="/avatar.png"
              alt="User"
              className="size-12 object-cover rounded-full"
            />
          </div>

          <div className="hidden lg:block text-left min-w-0">
            <div className="font-medium truncate">Jane Smith</div>
            <div className="text-sm text-zinc-400">Offline</div>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

