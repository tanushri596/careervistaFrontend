
export interface Candidate
{
    id:number,
  firstName:string,
  lastName:string,
  password:string,
  confirmPassword:string,
  username:string,
  role:string,
  birthDate:string,
  phoneNumber:string,
  company: Company ,
  designation:string,
  status:string
}

export interface CandidateDto
{
    id:number,
  firstName:string,
  lastName:string,
 
  username:string,
  role:string,
  birthDate:string,
  phoneNumber:string,
  companyId:number,
  designation:string,
  status:string,
  
}



export interface logIn
{
  username : string,
  password : string,
  role:string
}

export interface Company
{
    id:number,
  name:string,
  password:string,
  confirmPassword:string,
  username:string,
  role:string,
  foundingDate:string,
  phoneNumber:string,
  ceoName : string;
}

export interface CompanyDto
{
  id:number,
  name:string,
  
  ceoName : string;
  foundingDate:string
}

export interface Job 
{
  id:number,
  role:string,
  description:string,
  salary:number,
  vacancy:number,
  companyId:number
  userId:number
  location:string,
  postDate:string,
  status:boolean,
  companyName:string
}

export interface Education
{
  id:number,
  institution:string,
  marks:number,
  startDate:string,
  endDate:string,
  userId:number,
  courseName:string
}

export interface Project
{
  id:number,
  name:string,
  description:string,
  startDate:string,
  endDate:string,
  userId:number
}

export interface Experience
{
  id:number,
  role:String,
  company:string,
  startDate:string,
  endDate:string,
  userId:number,
  description:string
}

export interface Application
{
  id:number,
  status:string,
  active:boolean,
  jobDto:Job,
  userDto:CandidateDto
  applyDate:string,
  role:string,
  companyId:number
  withdrawn:boolean,
  companyName:string,
  
}


export interface Chat
{
  id:number,
  sender:CandidateDto,
  receiver:CandidateDto
}

export interface Message
{
   id:number,
   sender:CandidateDto,
   receiver:CandidateDto,
   message:string,
   channel:string,
   time:string

}

export interface Page<T> {
  content: T[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  
}
