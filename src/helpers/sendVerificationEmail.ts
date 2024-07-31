import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/Apiresponse";

export async function sendVerificationEmail(
    email : string,
    username: string,
    verifyCode: string
):Promise<ApiResponse>{
    try{
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Hello World',
            html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
          });
        return {success: true, message:"Verification email sent successfully"};
    }catch(errorEmail){
        console.log("error sending verification email", errorEmail);
        return {success: false, message:"Failed to send verification email"};

    }

}



