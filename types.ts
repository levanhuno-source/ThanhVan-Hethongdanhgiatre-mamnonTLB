
export enum AgeGroup {
  INFANT_3_12 = '3-12 tháng',
  INFANT_12_18 = '12-18 tháng',
  INFANT_18_24 = '18-24 tháng',
  INFANT_24_36 = '24-36 tháng',
  AGE_3_4 = '3-4 tuổi',
  AGE_4_5 = '4-5 tuổi',
  AGE_5_6 = '5-6 tuổi'
}

export enum DevelopmentDomain {
  PHYSICAL = 'Phát triển thể chất',
  COGNITIVE = 'Phát triển nhận thức',
  LANGUAGE = 'Phát triển ngôn ngữ',
  SOCIAL_EMOTIONAL = 'Phát triển tình cảm - Kỹ năng xã hội',
  AESTHETIC = 'Phát triển thẩm mỹ'
}

export enum AssessmentStatus {
  ACHIEVED = 'Đạt',
  NOT_ACHIEVED = 'Chưa đạt',
  NEEDS_SUPPORT = 'Cần hỗ trợ'
}

export enum UserRole {
  ADMIN = 'Ban giám hiệu',
  TEACHER = 'Giáo viên'
}

export interface AssessmentTarget {
  id: string;
  code: string;
  ageGroup: AgeGroup;
  domain: DevelopmentDomain;
  content: string;
}

export interface Student {
  id: string;
  name: string;
  birthDate: string;
  class: string;
  ageGroup: AgeGroup;
  teacher: string;
}

export interface AssessmentRecord {
  targetId: string;
  status: AssessmentStatus;
  note?: string;
}

export interface StudentAssessment {
  id: string;
  studentId: string;
  date: string;
  evaluatorName: string;
  records: AssessmentRecord[];
  summary?: string;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  assignedClass?: string;
}
