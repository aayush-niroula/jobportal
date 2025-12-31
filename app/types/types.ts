export interface User {
  name: string;
  phone?: number;
  email?: string;
}

export interface Education {
  degree: string;
  institution: string;
  start_year: number;
  end_year: number;
}

export interface Expericene{
    company:string;
    start_date:Date;
    end_date:Date;
    role:string;
    points:string[]
}
export interface Candidate {
  id: string;
  user: User;
  professional_summary?: string;
  technical_skills?: string[];
  soft_skills?: string[];
  availability?: string;
  expected_salary_min?: number;
  expected_salary_max?: number;
  work_mode?: string;
  job_type?: string;
  educations?: Education[];
  location:string;
  profile_image:string;
  resume_url?:string;
  portfolio_url?:string;
  linkedin_url?:string;
  experiecence_level?:string;
  experiences?:Expericene[]
}
