export interface RegisterData {
    email: string;
    password: string;
    name: string;
    surname: string;
    dateOfBirth: Date;
    phoneNumber?: string;
    address?: string;
    profilePicture?: string;
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  