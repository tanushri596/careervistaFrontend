
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
  designation:string
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

export interface Job 
{
  id:number,
  role:string,
  description:string,
  salary:number,
  vacancy:number,
  company:Company,
  user:Candidate
}

export interface Education
{
  id:number,
  institution:string,
  marks:number,
  startDate:string,
  endDate:string,
  user:Candidate
}

export interface Project
{
  id:number,
  description:string,
  startDate:string,
  endDate:string,
  user:Candidate
}

export interface Experience
{
  id:number,
  role:String,
  company:string,
  startDate:string,
  endDate:string,
  user:Candidate
}