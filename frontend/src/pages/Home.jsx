import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import Navbar from "../components/Navbar";
// أو يمكنك استخدام ChatContainer بشكل ثابت بدل NoChatSelected
// import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  return (
    <>
    <Navbar/>
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {/* هنا نستخدم نسخة ثابتة */}
            <NoChatSelected />
            {/* أو إذا تريد تظهر محادثة ثابتة */}
            {/* <ChatContainer /> */}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HomePage;
