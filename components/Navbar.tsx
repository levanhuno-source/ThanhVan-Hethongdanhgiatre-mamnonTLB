
import React from 'react';
import { User, UserRole } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  user: User;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, user }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: 'Tổng quan' },
    { id: 'assessment', icon: 'fa-file-signature', label: 'Đánh giá trẻ' },
    { id: 'goals', icon: 'fa-bullseye', label: 'Mục tiêu GD' },
    { id: 'students', icon: 'fa-user-graduate', label: 'Danh sách trẻ' },
  ];

  return (
    <nav className="w-full md:w-64 bg-white border-r border-gray-100 p-4 sticky top-0 h-auto md:h-screen flex flex-col shadow-lg md:shadow-none z-10">
      <div className="flex items-center gap-2 mb-10 px-2 py-4">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-orange-300 rounded-xl flex items-center justify-center text-white">
          <i className="fas fa-child-reaching text-xl"></i>
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400">
          KiddieTrack
        </span>
      </div>

      <div className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                : 'text-gray-500 hover:bg-orange-50 hover:text-orange-600'
            }`}
          >
            <i className={`fas ${item.icon} w-6`}></i>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all">
          <i className="fas fa-sign-out-alt w-6"></i>
          <span className="font-medium">Đăng xuất</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
