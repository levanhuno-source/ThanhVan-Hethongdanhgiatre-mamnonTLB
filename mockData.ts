
import { AgeGroup, DevelopmentDomain, AssessmentTarget, Student, User, UserRole } from './types';

export const mockGoals: AssessmentTarget[] = [
  { id: 'g0', code: 'NT18-1', ageGroup: AgeGroup.INFANT_18_24, domain: DevelopmentDomain.PHYSICAL, content: 'Đi hết đoạn đường hẹp (3m x 0,2m).' },
  { id: 'g01', code: 'NT24-1', ageGroup: AgeGroup.INFANT_24_36, domain: DevelopmentDomain.LANGUAGE, content: 'Nói được câu đơn có 2-3 tiếng.' },
  { id: 'g1', code: 'TC1', ageGroup: AgeGroup.AGE_3_4, domain: DevelopmentDomain.PHYSICAL, content: 'Bò trong đường hẹp (3m x 0,4m) không chệch ra ngoài.' },
  { id: 'g2', code: 'TC2', ageGroup: AgeGroup.AGE_3_4, domain: DevelopmentDomain.PHYSICAL, content: 'Bật tại chỗ.' },
  { id: 'g3', code: 'NN1', ageGroup: AgeGroup.AGE_4_5, domain: DevelopmentDomain.LANGUAGE, content: 'Nghe hiểu và làm theo được 2, 3 yêu cầu.' },
  { id: 'g4', code: 'NT1', ageGroup: AgeGroup.AGE_5_6, domain: DevelopmentDomain.COGNITIVE, content: 'Nhận biết các con số được sử dụng trong cuộc sống hàng ngày.' },
  { id: 'g5', code: 'TM1', ageGroup: AgeGroup.AGE_5_6, domain: DevelopmentDomain.AESTHETIC, content: 'Thể hiện thái độ, tình cảm khi nghe âm thanh gợi cảm.' },
];

export const mockStudents: Student[] = [
  { id: 's0', name: 'Lê Minh Nhật', birthDate: '2022-08-10', class: 'Nhà trẻ A', ageGroup: AgeGroup.INFANT_18_24, teacher: 'Cô Thảo' },
  { id: 's01', name: 'Hoàng Gia Bảo', birthDate: '2021-12-05', class: 'Nhà trẻ B', ageGroup: AgeGroup.INFANT_24_36, teacher: 'Cô Cúc' },
  { id: 's1', name: 'Nguyễn An Nhiên', birthDate: '2020-05-12', class: 'Mầm 1', ageGroup: AgeGroup.AGE_3_4, teacher: 'Cô Lan' },
  { id: 's2', name: 'Trần Minh Khang', birthDate: '2020-02-20', class: 'Mầm 1', ageGroup: AgeGroup.AGE_3_4, teacher: 'Cô Lan' },
  { id: 's3', name: 'Lê Bảo Anh', birthDate: '2019-11-05', class: 'Chồi 2', ageGroup: AgeGroup.AGE_4_5, teacher: 'Cô Hoa' },
  { id: 's4', name: 'Phạm Gia Huy', birthDate: '2018-08-15', class: 'Lá 1', ageGroup: AgeGroup.AGE_5_6, teacher: 'Cô Mai' },
];

export const currentUser: User = {
  id: 'u1',
  name: 'Nguyễn Thị Lan',
  role: UserRole.TEACHER,
  assignedClass: 'Mầm 1'
};