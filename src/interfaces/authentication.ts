export interface LoginResponse{
    status: boolean;
    message: string;
    errors:{
        emailError?:string;
        passwordError?:string;
        mainError?:string;
    }
}