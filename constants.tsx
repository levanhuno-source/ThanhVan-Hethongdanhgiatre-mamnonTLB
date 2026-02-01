
import { AgeGroup, DevelopmentDomain, AssessmentTarget, Student, User, UserRole } from './types';

export const MOCK_TARGETS: AssessmentTarget[] = [
  // Khối Nhà trẻ 18-24 tháng
  { id: 'nt-1824-tc-1', code: 'NT.1824.TC.1', ageGroup: AgeGroup.INFANT_18_24, domain: DevelopmentDomain.PHYSICAL, content: 'Đi hết đoạn đường hẹp (3m x 0,2m).' },
  { id: 'nt-1824-nn-1', code: 'NT.1824.NN.1', ageGroup: AgeGroup.INFANT_18_24, domain: DevelopmentDomain.LANGUAGE, content: 'Phát âm được các từ đơn giản, bắt chước tiếng kêu của các con vật quen thuộc.' },

  // Khối Nhà trẻ 24-36 tháng
  { id: 'nt-2436-tc-1', code: 'NT.2436.TC.1', ageGroup: AgeGroup.INFANT_24_36, domain: DevelopmentDomain.PHYSICAL, content: 'Giữ được thăng bằng trong vận động đi/chạy thay đổi tốc độ theo cô.' },
  { id: 'nt-2436-nn-1', code: 'NT.2436.NN.1', ageGroup: AgeGroup.INFANT_24_36, domain: DevelopmentDomain.LANGUAGE, content: 'Nói được câu đơn có 2-3 tiếng để biểu đạt nhu cầu.' },
  
  // Khối Mẫu giáo 3-4 tuổi
  { id: 'mg-34-tc-1', code: 'MG.34.TC.1', ageGroup: AgeGroup.AGE_3_4, domain: DevelopmentDomain.PHYSICAL, content: 'Bò trong đường hẹp (3m x 0,4m) không chệch ra ngoài.' },
  
  // Khối Mẫu giáo 4-5 tuổi
  { id: 'mg-45-nn-1', code: 'MG.45.NN.1', ageGroup: AgeGroup.AGE_4_5, domain: DevelopmentDomain.LANGUAGE, content: 'Nghe hiểu và làm theo được 2, 3 yêu cầu liên tiếp.' },

  // Khối Mẫu giáo 5-6 tuổi
  { id: 'mg-56-nt-1', code: 'MG.56.NT.1', ageGroup: AgeGroup.AGE_5_6, domain: DevelopmentDomain.COGNITIVE, content: 'Đếm trong phạm vi 10 và nhận biết các chữ số từ 1-10.' },
  { id: 'mg-56-tm-1', code: 'MG.56.TM.1', ageGroup: AgeGroup.AGE_5_6, domain: DevelopmentDomain.AESTHETIC, content: 'Hát đúng giai điệu, lời ca và thể hiện cảm xúc phù hợp với bài hát.' },
];

export const MOCK_STUDENTS: Student[] = [
  { id: 's0', name: 'Lê Minh Nhật', birthDate: '2022-08-10', class: 'Nhà trẻ A1', ageGroup: AgeGroup.INFANT_18_24, teacher: 'Cô Thảo' },
  { id: 's1', name: 'Nguyễn An Nhiên', birthDate: '2020-05-12', class: 'Mầm 1', ageGroup: AgeGroup.AGE_3_4, teacher: 'Cô Lan' },
  { id: 's2', name: 'Trần Minh Khang', birthDate: '2021-02-15', class: 'Nhà trẻ B2', ageGroup: AgeGroup.INFANT_24_36, teacher: 'Cô Huệ' },
  { id: 's3', name: 'Lê Bảo Ngọc', birthDate: '2019-08-20', class: 'Chồi 2', ageGroup: AgeGroup.AGE_4_5, teacher: 'Cô Thảo' },
  { id: 's4', name: 'Phạm Gia Bảo', birthDate: '2018-11-05', class: 'Lá 1', ageGroup: AgeGroup.AGE_5_6, teacher: 'Cô Minh' },
];

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Ban Giám Hiệu', role: UserRole.ADMIN },
  { id: 'u2', name: 'Cô Lan', role: UserRole.TEACHER, assignedClass: 'Mầm 1' },
];

export const COLORS = {
  primary: '#6366f1',
  secondary: '#f472b6',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  pastel: {
    blue: '#e0f2fe',
    pink: '#fce7f3',
    green: '#dcfce7',
    yellow: '#fef9c3',
    purple: '#f3e8ff'
  }
};
