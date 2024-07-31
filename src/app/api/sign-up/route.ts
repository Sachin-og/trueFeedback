import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request){
    await dbConnect();
    try{
        const {username , email, password}= await request.json();
        const ExistingVerifiedUsername = await UserModel.findOne({
            username , 
            isVerified: true
        });
        if(ExistingVerifiedUsername){
            return Response.json({
                success: false,
                message : "Useranme not available"},{
                    status: 400
                }
            )
        }

       const ExistingVerifiedEmail = await UserModel.findOne({email});
       const verifyCode = Math.floor(100000 + Math.random()*900000).toString();
       if(ExistingVerifiedEmail){

       }
       else{
        const hashedPassword = await bcrypt.hash(password,10);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() +1);

        const newUser =     new UserModel({
            username,
            email,
            password: hashedPassword,
            verifyCode,
            isVerified : false,
            verifyCodeExpiry: expiryDate,
            isAcceptingMessage: true,
            messages : [],
                })
                await newUser.save();
 
            }
            const emailResponse =  await sendVerificationEmail(
                email,
                username,
                verifyCode
            );

    }catch(error){
        console.log("Error Registering user", error);
        return Response.json({
            success : false,
            message: " Error Registering User"
        },
        {
            status: 500
        }
    );
       } 
    
}
