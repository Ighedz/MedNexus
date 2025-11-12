import React from "react";
import { Home, PlusCircle, List, User, LogOut } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { name: "Home", id: "home", icon: <Home size={18} /> },
    { name: "Upload Drug", id: "upload", icon: <PlusCircle size={18} /> },
    { name: "My Products", id: "products", icon: <List size={18} /> },
    { name: "Profile", id: "profile", icon: <User size={18} /> },
  ];

  return (
    <aside className="w-64 bg-green-600 text-white flex flex-col justify-between p-4">
      <div>
        <h1 className="text-2xl font-semibold mb-8">MedNexus</h1>

        <nav className="space-y-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full gap-3 px-4 py-2 rounded-lg text-left transition ${
                activeTab === tab.id
                  ? "bg-green-800"
                  : "hover:bg-green-700 text-green-100"
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <button className="flex items-center gap-2 px-4 py-2 mt-4 bg-red-500 hover:bg-red-600 rounded-lg transition text-sm font-medium">
        <LogOut size={16} /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;
