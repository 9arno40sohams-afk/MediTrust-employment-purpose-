export type Sector = 'IT' | 'Marketing';

export interface RoleOption {
  id: string;
  title: string;
  sector: Sector;
  description: string;
  skills: string[];
  level: string;
}

export interface EducationDetails {
  collegeName: string;
  degreeCompletion: string; // e.g. B.Tech, M.Tech, BCA, MCA, MBA, etc.
  degreeTypeOther?: string;
  specialization: string;
  completionYear: string;
  collegeCity: string;
  collegeCountry: string;
  cgpaOrPercentage: string;
}

export interface ExperienceDetails {
  experienceLevel: 'fresher' | '1-2' | '3-5' | '5+';
  currentCompany: string;
  currentDesignation: string;
  totalYearsExp: string;
  noticePeriod: string; // Immediate, 15 days, 30 days, 60 days, 90 days
  skills: string[];
  projectAchievements: string;
}

export interface SalaryExpectations {
  currentCTC: string; // in LPA
  expectedCTC: string; // in LPA
  isNegotiable: boolean;
  workModePreference: 'Remote' | 'Hybrid' | 'On-site';
  availableFrom: string;
}

export interface ApplicationFormData {
  // Sector & Role
  sector: Sector;
  roleId: string;
  roleTitle: string;
  
  // Personal & Photo
  fullName: string;
  photoUrl: string;
  photoFileName?: string;
  
  // Contact Info
  email: string;
  phone: string;
  alternatePhone?: string;
  currentAddress: string;
  currentCity: string;
  currentCountry: string;
  linkedInUrl: string;
  portfolioUrl?: string;
  
  // Education
  education: EducationDetails;
  
  // Resume & Cover Letter
  resumeFile?: {
    name: string;
    size: number;
    type: string;
    lastModified?: number;
    dataUrl?: string;
  };
  coverLetter: string;
  
  // Professional Experience
  experience: ExperienceDetails;
  
  // Salary
  salary: SalaryExpectations;
  
  // Metadata
  id?: string;
  submittedAt?: string;
}

export interface LeadershipContact {
  role: string;
  name: string;
  phone: string;
  displayPhone: string;
  email: string;
  whatsappMessage: string;
}
