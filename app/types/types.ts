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
  applications?:[{
    status:string
    message:string

  }],
  bookmarks:string[]
}

export interface Facilitator {
  id?:string
  company_email?:string
  company_location_link?:string
  company_size:string
  company_name: string;
  company_logo: string;
  company_description: string;
  industry: string;
  location: string;
  department:string
  features:string[]
  founded_year:number
  gallery_images:string[]
  website_link?:string

}

export interface Job {
  id: string;
  job_name: string;
  job_type: string;
  location: string;
  created_at: string;
  deadline: string;
  salary_min: number;
  salary_max: number;
  benefits: string[];
  description: string[];
  responsibilities: string[];
  requirements: string[];
  preferred_qualifications: string[];
  skills:string[]
  work_mode?:string;
  facilitator: Facilitator;
  isBookmarked?:boolean
  bookmarks?:{
    created_at:string;
    id:string;
    job_id:string;
    jobseeker_id:string
  }
    views?: number;
}

export type Application = {
  id: string;
  status: "PENDING" | "SCREENING" | "INTERVIEW" | "REJECTED";
  appliedAt: string;
  reviewedAt: string | null;
  message?: string;
  job: {
    job_name: string;
    job_type: string;
    experience_level: string;
    location: string;
    salary_min?: number;
    salary_max?: number;
    description:string;
    requirements:string[]
    facilitator: {
      company_name: string;
      company_logo?: string;
      user?:{
        name:string
        phone:number
        email:number
      }
    
    };
  };
  interviews:{
    notes:string
    scheduled_at:string
    scheduled_by:string
  }
};
