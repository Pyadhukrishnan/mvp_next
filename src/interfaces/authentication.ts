export interface LoginResponse{
    status: boolean | "error";
    message: string;
    errors:{
        emailError?:string;
        passwordError?:string;
        mainError?:string;
    }
}


export interface RegisterUserResponse{
    status: boolean | "error";
    message: string;
    errors:{
        emailError?:string;
        passwordError?:string;
        mainError?:string;
    }
}


export interface VerifyRegistrationResponse{
    status: boolean | "error";
    message: string;
}