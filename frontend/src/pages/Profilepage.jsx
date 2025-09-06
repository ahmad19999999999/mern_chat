import { Camera, Mail, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUser = async () => {
  const { data } = await axios.get(
  "http://localhost:5001/api/v1/profile",
  { withCredentials: true }
);

  return data.user  // تأكد من استخدام user إذا موجود
};

const ProfilePage = () => {
  const { data: authUser, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchUser,
  });

  // حالة التحميل
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // حالة الخطأ
 if (error) {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-red-500">
        {error?.response?.data?.message || "Failed to load user data"}
      </p>
    </div>
  );
}


  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={authUser?.profilePic || "/pic/profile.jpg"} // صورة افتراضية
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4"
              />
              <div className="absolute bottom-0 right-0 bg-base-content p-2 rounded-full">
                <Camera className="w-5 h-5 text-base-200" />
              </div>
            </div>
            <p className="text-sm text-zinc-400">
              Click the camera icon to update your photo
            </p>
          </div>

          {/* User Info */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.fullName || "No Name"}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email || "No Email"}
              </p>
            </div>
          </div>

          {/* Account Info */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>
                  {authUser?.createdAt
                    ? authUser.createdAt.split("T")[0]
                    : "-"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
