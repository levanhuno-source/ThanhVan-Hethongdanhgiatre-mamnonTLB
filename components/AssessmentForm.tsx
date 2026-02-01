
import React, { useState, useMemo } from 'react';
import { AssessmentTarget, Student, AssessmentStatus, AssessmentRecord, StudentAssessment, DevelopmentDomain } from '../types';
import { generateSmartSummary } from '../services/geminiService';

interface AssessmentFormProps {
  students: Student[];
  targets: AssessmentTarget[];
  onSave: (assessment: StudentAssessment) => void;
  onCancel: () => void;
  initialEvaluatorName?: string;
  // Added initialStudentId to allow pre-selection from student list
  initialStudentId?: string;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ 
  students, 
  targets, 
  onSave, 
  onCancel, 
  initialEvaluatorName = '',
  initialStudentId = '' 
}) => {
  // Initialize with initialStudentId if provided
  const [selectedStudentId, setSelectedStudentId] = useState(initialStudentId);
  const [evaluatorName, setEvaluatorName] = useState(initialEvaluatorName);
  const [selectedDomain, setSelectedDomain] = useState<DevelopmentDomain | 'All'>('All');
  const [records, setRecords] = useState<AssessmentRecord[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const selectedStudent = useMemo(() => 
    students.find(s => s.id === selectedStudentId), 
  [students, selectedStudentId]);

  const ageFilteredTargets = useMemo(() => 
    selectedStudent ? targets.filter(t => t.ageGroup === selectedStudent.ageGroup) : [],
  [targets, selectedStudent]);

  const displayTargets = useMemo(() => 
    selectedDomain === 'All' 
      ? ageFilteredTargets 
      : ageFilteredTargets.filter(t => t.domain === selectedDomain),
  [ageFilteredTargets, selectedDomain]);

  const progress = useMemo(() => {
    if (ageFilteredTargets.length === 0) return 0;
    return Math.round((records.length / ageFilteredTargets.length) * 100);
  }, [records, ageFilteredTargets]);

  const handleStatusChange = (targetId: string, status: AssessmentStatus) => {
    setRecords(prev => {
      const existing = prev.find(r => r.targetId === targetId);
      if (existing) {
        return prev.map(r => r.targetId === targetId ? { ...r, status } : r);
      }
      return [...prev, { targetId, status }];
    });
  };

  const handleNoteChange = (targetId: string, note: string) => {
    setRecords(prev => {
      const existing = prev.find(r => r.targetId === targetId);
      if (existing) {
        return prev.map(r => r.targetId === targetId ? { ...r, note } : r);
      }
      return [...prev, { targetId, status: AssessmentStatus.NOT_ACHIEVED, note }];
    });
  };

  const handleSubmit = async () => {
    if (!selectedStudentId || !evaluatorName.trim() || records.length === 0) return;
    setIsSubmitting(true);
    
    const summary = await generateSmartSummary(selectedStudent?.name || 'Trẻ', records, targets);

    const assessment: StudentAssessment = {
      id: Date.now().toString(),
      studentId: selectedStudentId,
      evaluatorName: evaluatorName.trim(),
      date: new Date().toISOString(),
      records,
      summary
    };

    onSave(assessment);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-indigo-600 p-6 md:p-8 text-white relative">
        <h2 className="text-2xl font-bold">Phiếu Đánh giá Sự phát triển</h2>
        <p className="text-indigo-100 opacity-90">Bám sát chương trình GDMN - Thông tư 51/2020/TT-BGDĐT</p>
        
        {activeStep === 2 && (
          <div className="absolute top-8 right-8 text-right hidden md:block">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-200 mb-1">Tiến độ đánh giá</div>
            <div className="text-2xl font-black">{progress}%</div>
          </div>
        )}
      </div>

      <div className="p-6 md:p-8">
        {/* Step 1: Select Student & Evaluator */}
        {activeStep === 1 && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="space-y-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 text-indigo-600">1. Họ tên người đánh giá</label>
                <input 
                  type="text"
                  value={evaluatorName}
                  onChange={(e) => setEvaluatorName(e.target.value)}
                  placeholder="Nhập tên giáo viên đánh giá..."
                  className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none transition-all bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 text-indigo-600">2. Chọn học sinh cần đánh giá</label>
                <select 
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none transition-all bg-white"
                >
                  <option value="">-- Chọn học sinh từ danh sách lớp --</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name} - Lớp {s.class} ({s.ageGroup})</option>
                  ))}
                </select>
              </div>
            </div>
            
            {selectedStudent && (
              <div className="grid grid-cols-2 gap-4 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase block mb-1">Ngày sinh</span>
                  <span className="font-semibold text-indigo-900">{selectedStudent.birthDate}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase block mb-1">Tổng số mục tiêu</span>
                  <span className="font-semibold text-indigo-900">{ageFilteredTargets.length} chỉ tiêu</span>
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-3 pt-4">
              <button onClick={onCancel} className="px-6 py-3 rounded-xl font-semibold text-slate-500 hover:bg-slate-50 transition-colors">Hủy bỏ</button>
              <button 
                disabled={!selectedStudentId || !evaluatorName.trim()}
                onClick={() => setActiveStep(2)}
                className="px-10 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-200 active:scale-95"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Evaluation */}
        {activeStep === 2 && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setSelectedDomain('All')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${selectedDomain === 'All' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                >
                  Tất cả ({ageFilteredTargets.length})
                </button>
                {Object.values(DevelopmentDomain).map(domain => {
                  const count = ageFilteredTargets.filter(t => t.domain === domain).length;
                  if (count === 0) return null;
                  return (
                    <button
                      key={domain}
                      onClick={() => setSelectedDomain(domain)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${selectedDomain === domain ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                    >
                      {domain} ({count})
                    </button>
                  );
                })}
              </div>
              <div className="text-xs text-slate-500 font-medium italic">
                Người đánh giá: <span className="text-indigo-600 font-bold">{evaluatorName}</span>
              </div>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {displayTargets.map((target) => {
                const record = records.find(r => r.targetId === target.id);
                return (
                  <div key={target.id} className="p-5 rounded-2xl border border-slate-100 bg-white hover:border-indigo-200 transition-all shadow-sm">
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-slate-100 text-[10px] font-black text-slate-500 rounded uppercase tracking-tighter">{target.code}</span>
                          <span className="text-[10px] font-bold text-indigo-400 uppercase">{target.domain}</span>
                        </div>
                        <p className="text-slate-800 font-medium leading-relaxed">{target.content}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {Object.values(AssessmentStatus).map(status => (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(target.id, status)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 ${
                              record?.status === status 
                                ? status === AssessmentStatus.ACHIEVED ? 'bg-green-500 border-green-500 text-white shadow-md' :
                                  status === AssessmentStatus.NOT_ACHIEVED ? 'bg-red-500 border-red-500 text-white shadow-md' :
                                  'bg-amber-500 border-amber-500 text-white shadow-md'
                                : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                    {record?.status && (
                      <input
                        type="text"
                        placeholder="Thêm ghi chú minh chứng hoặc lưu ý..."
                        value={record?.note || ''}
                        onChange={(e) => handleNoteChange(target.id, e.target.value)}
                        className="w-full mt-3 p-3 text-xs rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all italic"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-4">
              <button onClick={() => setActiveStep(1)} className="px-6 py-3 rounded-xl font-semibold text-slate-500 hover:bg-slate-50 transition-colors">Quay lại</button>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-400 hidden md:block">
                   Đã đánh giá {records.length}/{ageFilteredTargets.length} mục tiêu
                </span>
                <button 
                  disabled={isSubmitting || records.length === 0}
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Đang xử lý...
                    </>
                  ) : 'Hoàn thành & Lưu'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentForm;
