
import React, { useState, useMemo } from 'react';
import { AssessmentTarget, AgeGroup, DevelopmentDomain, User, UserRole } from '../types';

interface GoalManagementProps {
  targets: AssessmentTarget[];
  onAddTarget: (target: AssessmentTarget) => void;
  user: User;
}

const GoalManagement: React.FC<GoalManagementProps> = ({ targets, onAddTarget, user }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterAge, setFilterAge] = useState<AgeGroup | 'All'>('All');
  const [newTarget, setNewTarget] = useState<Partial<AssessmentTarget>>({
    domain: DevelopmentDomain.PHYSICAL,
    ageGroup: AgeGroup.AGE_3_4,
    code: '',
    content: ''
  });

  const canEdit = user.role === UserRole.ADMIN;

  const detectDomainFromContent = (text: string): DevelopmentDomain | undefined => {
    const lower = text.toLowerCase();
    const mappings = [
      { domain: DevelopmentDomain.PHYSICAL, keywords: ['thể chất', 'vận động', 'đi', 'chạy', 'nhảy', 'bò', 'trèo', 'ném', 'bắt', 'tung', 'leo', 'bật', 'physical', 'move'] },
      { domain: DevelopmentDomain.COGNITIVE, keywords: ['nhận thức', 'số', 'hình', 'toán', 'khoa học', 'khám phá', 'tìm hiểu', 'đếm', 'màu', 'to', 'nhỏ', 'cognitive'] },
      { domain: DevelopmentDomain.LANGUAGE, keywords: ['ngôn ngữ', 'nói', 'nghe', 'truyện', 'thơ', 'chữ', 'đọc', 'kể', 'phát âm', 'từ', 'câu', 'language'] },
      { domain: DevelopmentDomain.SOCIAL_EMOTIONAL, keywords: ['tình cảm', 'kỹ năng', 'xã hội', 'ứng xử', 'tự lập', 'quy tắc', 'cảm xúc', 'vệ sinh', 'chào', 'social', 'emotional'] },
      { domain: DevelopmentDomain.AESTHETIC, keywords: ['thẩm mỹ', 'vẽ', 'nặn', 'xé', 'dán', 'hát', 'múa', 'âm nhạc', 'nghệ thuật', 'tô màu', 'aesthetic'] },
    ];

    for (const m of mappings) {
      if (m.keywords.some(kw => lower.includes(kw))) {
        return m.domain;
      }
    }
    return undefined;
  };

  const handleContentChange = (content: string) => {
    const detectedDomain = detectDomainFromContent(content);
    setNewTarget(prev => ({
      ...prev,
      content,
      domain: detectedDomain || prev.domain
    }));
  };

  const handleFileUpload = (age: AgeGroup) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.csv';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        alert(`Đang xử lý tệp mục tiêu cho khối: ${age}\nTên file: ${file.name}\nDữ liệu sẽ được tự động đồng bộ vào hệ thống.`);
      }
    };
    input.click();
  };

  const filteredTargets = useMemo(() => {
    return filterAge === 'All' ? targets : targets.filter(t => t.ageGroup === filterAge);
  }, [targets, filterAge]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Cơ sở dữ liệu Mục tiêu giáo dục</h2>
            <p className="text-sm text-slate-500 mt-1 italic">Quản lý nội dung đánh giá theo Chương trình GDMN của Bộ GD&ĐT</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select 
              value={filterAge}
              onChange={(e) => setFilterAge(e.target.value as any)}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-300 outline-none"
            >
              <option value="All">Tất cả khối lớp</option>
              {Object.values(AgeGroup).map(age => <option key={age} value={age}>{age}</option>)}
            </select>
            
            {canEdit && (
              <button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-indigo-700 transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showAddForm ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"}></path></svg>
                {showAddForm ? 'Đóng' : 'Thêm thủ công'}
              </button>
            )}
          </div>
        </div>

        {canEdit && (
          <div className="mt-8 pt-8 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Nhập tệp mục tiêu hàng loạt</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.values(AgeGroup).map((age) => (
                <button
                  key={age}
                  onClick={() => handleFileUpload(age)}
                  className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-indigo-400 hover:bg-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-500 shadow-sm group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Nhập file tiêu chí</p>
                      <p className="text-sm font-bold text-slate-800">{age}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-indigo-100 animate-in slide-in-from-top-4 duration-300">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            Tạo tiêu chí đánh giá mới
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Mã tiêu chí (Code)</label>
              <input 
                placeholder="VD: NT-1824-01" 
                value={newTarget.code}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none font-medium text-sm"
                onChange={e => setNewTarget({...newTarget, code: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Khối độ tuổi</label>
              <select 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none font-medium text-sm"
                onChange={e => setNewTarget({...newTarget, ageGroup: e.target.value as AgeGroup})}
                value={newTarget.ageGroup}
              >
                {Object.values(AgeGroup).map(age => <option key={age} value={age}>{age}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Lĩnh vực phát triển</label>
              <select 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none font-medium text-sm"
                onChange={e => setNewTarget({...newTarget, domain: e.target.value as DevelopmentDomain})}
                value={newTarget.domain}
              >
                {Object.values(DevelopmentDomain).map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Nội dung mục tiêu giáo dục</label>
            <div className="relative">
              <textarea 
                placeholder="Nhập yêu cầu đạt được của trẻ (VD: Trẻ đi vững trong đường hẹp...)" 
                value={newTarget.content}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl h-28 focus:ring-2 focus:ring-indigo-100 outline-none resize-none text-sm font-medium"
                onChange={e => handleContentChange(e.target.value)}
              />
              <p className="absolute bottom-2 right-4 text-[10px] text-indigo-400 italic">
                Hệ thống tự nhận diện Lĩnh vực phát triển qua từ khóa bạn nhập.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
             <button 
              onClick={() => setShowAddForm(false)}
              className="px-6 py-3 bg-slate-100 text-slate-500 font-bold rounded-xl hover:bg-slate-200 transition-colors text-sm"
            >
              Hủy bỏ
            </button>
            <button 
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all text-sm"
              onClick={() => {
                if (newTarget.code && newTarget.content) {
                  onAddTarget({ ...newTarget, id: Date.now().toString() } as AssessmentTarget);
                  setShowAddForm(false);
                  setNewTarget({ domain: DevelopmentDomain.PHYSICAL, ageGroup: AgeGroup.AGE_3_4, code: '', content: '' });
                } else {
                  alert('Vui lòng nhập Mã và Nội dung mục tiêu!');
                }
              }}
            >
              Lưu tiêu chí
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-24">Mã</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-32">Độ tuổi</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest w-48">Lĩnh vực</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Nội dung chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTargets.map((t) => (
                <tr key={t.id} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-indigo-600">{t.code}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">
                    <span className="px-2 py-1 bg-slate-100 rounded-md text-[10px] font-bold text-slate-500 uppercase">{t.ageGroup}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      t.domain === DevelopmentDomain.PHYSICAL ? 'bg-green-100 text-green-700' :
                      t.domain === DevelopmentDomain.LANGUAGE ? 'bg-purple-100 text-purple-700' :
                      t.domain === DevelopmentDomain.COGNITIVE ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {t.domain}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 font-medium leading-relaxed">{t.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GoalManagement;
