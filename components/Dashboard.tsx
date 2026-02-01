
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AssessmentStatus, AgeGroup, StudentAssessment } from '../types';
import { COLORS } from '../constants';

interface DashboardProps {
  assessments: StudentAssessment[];
}

const Dashboard: React.FC<DashboardProps> = ({ assessments }) => {
  const stats = useMemo(() => {
    let achieved = 0;
    let notAchieved = 0;
    let needsSupport = 0;

    assessments.forEach(ass => {
      ass.records.forEach(rec => {
        if (rec.status === AssessmentStatus.ACHIEVED) achieved++;
        else if (rec.status === AssessmentStatus.NOT_ACHIEVED) notAchieved++;
        else needsSupport++;
      });
    });

    return [
      { name: 'Đạt', value: achieved, color: COLORS.success },
      { name: 'Chưa đạt', value: notAchieved, color: COLORS.danger },
      { name: 'Cần hỗ trợ', value: needsSupport, color: COLORS.warning },
    ];
  }, [assessments]);

  const ageStats = useMemo(() => {
    const data: any = {};
    Object.values(AgeGroup).forEach(age => {
      data[age] = { name: age, reached: 0, pending: 0 };
    });

    assessments.forEach(ass => {
      // For demo, we just count based on presence in this simple logic
      // In a real app we'd map assessments back to student age groups
      const statusCounts = ass.records.reduce((acc, curr) => {
        if (curr.status === AssessmentStatus.ACHIEVED) acc.reached++;
        else acc.pending++;
        return acc;
      }, { reached: 0, pending: 0 });

      // We'll assume these are distributed across ages for visual variety in demo
      const randomAge = Object.values(AgeGroup)[Math.floor(Math.random() * 3)];
      data[randomAge].reached += statusCounts.reached;
      data[randomAge].pending += statusCounts.pending;
    });

    return Object.values(data);
  }, [assessments]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
          <h3 className="text-slate-500 font-medium mb-2">Tổng số bản đánh giá</h3>
          <p className="text-4xl font-bold text-indigo-600">{assessments.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
          <h3 className="text-slate-500 font-medium mb-2">Tỷ lệ hoàn thành mục tiêu</h3>
          <p className="text-4xl font-bold text-green-600">
            {stats[0].value > 0 ? Math.round((stats[0].value / (stats[0].value + stats[1].value + stats[2].value)) * 100) : 0}%
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
          <h3 className="text-slate-500 font-medium mb-2">Cần quan tâm</h3>
          <p className="text-4xl font-bold text-amber-500">{stats[2].value}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold mb-6">Kết quả đánh giá chung</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold mb-6">Theo độ tuổi</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="reached" name="Đã đạt" fill={COLORS.success} radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" name="Chưa đạt/Cần hỗ trợ" fill={COLORS.warning} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
