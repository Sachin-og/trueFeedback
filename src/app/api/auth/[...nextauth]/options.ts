import { NextAuthOptions } from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User";

export const authOptions:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials : any):Promise<any>{
                    await dbConnect();

                    try {
                       const user =  await UserModel.findOne({
                            $or :[
                                {email: credentials.identifier},
                                {username : credentials.identifier}
                            ]
                        })

                        if(!user){
                            throw new Error("No user find with thius email");
                        }

                        if(!user.isVerified){
                            
                            throw new Error("First Verify your email");
                        }
                    } catch (error: any) {
                        throw new Error(error);
                        
                    }

              }
        })
    ]
}