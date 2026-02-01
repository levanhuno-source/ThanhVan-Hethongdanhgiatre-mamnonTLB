
import React, { useState, useEffect } from 'react';
import { User, UserRole, Student, AssessmentTarget, StudentAssessment, AgeGroup } from './types';
import { MOCK_USERS, MOCK_STUDENTS, MOCK_TARGETS } from './constants';
import Dashboard from './components/Dashboard';
import AssessmentForm from './components/AssessmentForm';
import GoalManagement from './components/GoalManagement';
import StudentList from './components/StudentList';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'assessment' | 'students' | 'goals'>('dashboard');
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [targets, setTargets] = useState<AssessmentTarget[]>(MOCK_TARGETS);
  const [assessments, setAssessments] = useState<StudentAssessment[]>([]);
  const [selectedStudentIdInForm, setSelectedStudentIdInForm] = useState('');

  // Auto-login as admin for demo
  useEffect(() => {
    setCurrentUser(MOCK_USERS[0]);
  }, []);

  const handleSaveAssessment = (newAssessment: StudentAssessment) => {
    setAssessments(prev => [newAssessment, ...prev]);
    setActiveTab('dashboard');
    setSelectedStudentIdInForm('');
  };

  const handleAddTarget = (newTarget: AssessmentTarget) => {
    setTargets(prev => [...prev, newTarget]);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border-t-8 border-indigo-600">
          <h1 className="text-4xl font-black text-indigo-600 mb-2 italic tracking-tighter">KindiEval</h1>
          <p className="text-slate-500 mb-8 font-medium italic">Hệ thống quản lý đánh giá trẻ chuyên nghiệp</p>
          <div className="space-y-4">
            <button 
              onClick={() => setCurrentUser(MOCK_USERS[0])}
              className="w-full p-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition-all active:scale-95"
            >
              Cổng Ban Giám Hiệu
            </button>
            <button 
              onClick={() => setCurrentUser(MOCK_USERS[1])}
              className="w-full p-4 bg-pink-500 text-white rounded-2xl font-bold shadow-lg hover:bg-pink-600 transition-all active:scale-95"
            >
              Cổng Giáo Viên
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC]">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} user={currentUser} />

      <main className="flex-1 overflow-y-auto h-screen relative scroll-smooth">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                {activeTab === 'dashboard' ? 'Bảng Điều Khiển Tổng Quan' : 
                 activeTab === 'assessment' ? 'Đánh Giá Sự Phát Triển' : 
                 activeTab === 'students' ? 'Cơ Sở Dữ Liệu Học Sinh' : 'Quản Lý Mục Tiêu Đào Tạo'}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                 <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Trường Mầm Non Tân Lập B - Hà Nội</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100">
               <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">{currentUser.name}</p>
                  <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest">{currentUser.role}</p>
               </div>
               <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md font-bold">
                  {currentUser.name.charAt(0)}
               </div>
            </div>
          </header>

          <div className="min-h-[70vh]">
            {activeTab === 'dashboard' && <Dashboard assessments={assessments} />}
            {activeTab === 'assessment' && (
              <AssessmentForm 
                students={students} 
                targets={targets} 
                initialEvaluatorName={currentUser.name}
                initialStudentId={selectedStudentIdInForm}
                onSave={handleSaveAssessment}
                onCancel={() => { setActiveTab('dashboard'); setSelectedStudentIdInForm(''); }}
              />
            )}
            {activeTab === 'students' && <StudentList students={students} user={currentUser} />}
            {activeTab === 'goals' && <GoalManagement targets={targets} onAddTarget={handleAddTarget} user={currentUser} />}
          </div>

          <footer className="mt-16 pt-8 border-t border-slate-100 pb-8 text-center">
            <div className="inline-flex flex-col items-center">
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Bản Quyền Hệ Thống & Nội Dung</p>
               <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100">
                  <p className="text-sm font-bold text-slate-800">CÔ GIÁO: LÊ THANH VÂN</p>
                  <p className="text-[11px] text-slate-500 font-medium">TRƯỜNG MẦM NON TÂN LẬP B - XÃ ĐAN PHƯỢNG - TP. HÀ NỘI</p>
               </div>
               <p className="mt-4 text-[9px] text-slate-300 font-medium">© 2024 KindiEval - Standardized Educational Assessment Framework</p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;
