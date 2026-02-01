
import React, { useState } from 'react';
import { Student, AgeGroup, User } from '../types';

interface StudentListProps {
  students: Student[];
  user: User;
}

const StudentList: React.FC<StudentListProps> = ({ students, user }) => {
  const [filterAge, setFilterAge] = useState<string>('All');
  
  const filtered = students.filter(s => {
    const ageMatch = filterAge === 'All' || s.ageGroup === filterAge;
    // Fix: Using assignedClass instead of managedClass
    const classMatch = !user.assignedClass || s.class === user.assignedClass;
    return ageMatch && classMatch;
  });

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls,.csv';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        alert(`Hệ thống đang tải danh sách học sinh:\n- Tệp: ${file.name}\n\nDữ liệu sẽ tự động phân loại theo Lớp, Ngày sinh và Giáo viên phụ trách.`);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Cơ sở dữ liệu học sinh</h2>
            <p className="text-sm text-gray-500 mt-1">Quản lý hồ sơ và phân loại trẻ theo nhóm lớp</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select 
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
              onChange={e => setFilterAge(e.target.value)}
            >
              <option value="All">Tất cả khối</option>
              {Object.values(AgeGroup).map(age => <option key={age} value={age}>{age}</option>)}
            </select>
            
            <button 
              onClick={handleFileUpload}
              className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-bold shadow-md hover:bg-green-600 transition-all flex items-center gap-2"
            >
              <i className="fas fa-file-excel"></i> Nhập danh sách lớp
            </button>

            <button className="px-4 py-2 bg-pink-500 text-white rounded-xl text-sm font-bold shadow-md hover:bg-pink-600 transition-all">
              <i className="fas fa-plus"></i> Thêm trẻ
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(student => (
          <div key={student.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 hover:shadow-xl hover:border-pink-100 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-pink-50 to-transparent opacity-50"></div>
            
            <div className="flex items-center gap-4 mb-6 relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-blue-500 text-2xl group-hover:scale-110 transition-transform shadow-inner">
                <i className="fas fa-child"></i>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors leading-tight">{student.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                   <span className="px-2 py-0.5 bg-pink-50 text-pink-500 rounded text-[10px] font-bold uppercase">Lớp {student.class}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-50">
               <div className="flex justify-between items-center text-xs">
                 <span className="text-gray-400 font-bold uppercase tracking-tighter">Ngày sinh</span>
                 {/* Fix: Using birthDate instead of dob */}
                 <span className="font-bold text-gray-600">{student.birthDate}</span>
               </div>
               <div className="flex justify-between items-center text-xs">
                 <span className="text-gray-400 font-bold uppercase tracking-tighter">Độ tuổi</span>
                 <span className="font-bold text-orange-500">{student.ageGroup}</span>
               </div>
               <div className="flex justify-between items-center text-xs">
                 <span className="text-gray-400 font-bold uppercase tracking-tighter">Giáo viên</span>
                 <span className="font-bold text-gray-600 italic">{student.teacher}</span>
               </div>
            </div>

            <div className="mt-6 pt-4 flex gap-2">
              <button className="flex-1 py-2.5 bg-gray-50 text-blue-600 rounded-xl text-xs font-bold border border-blue-50 hover:bg-blue-600 hover:text-white transition-all">
                Xem hồ sơ
              </button>
              <button className="px-4 py-2.5 bg-orange-50 text-orange-600 rounded-xl border border-orange-50 hover:bg-orange-500 hover:text-white transition-all">
                <i className="fas fa-edit"></i>
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-32 bg-white rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-300">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
               <i className="fas fa-user-slash text-3xl"></i>
            </div>
            <p className="font-bold">Không tìm thấy dữ liệu học sinh</p>
            <p className="text-sm">Vui lòng kiểm tra lại bộ lọc hoặc tải lên danh sách mới</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;