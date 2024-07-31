import mongoose, {Schema, Document, trusted} from "mongoose";

export interface Message extends Document{
    content : string;
    createdAt : Date

}

const MessageSchema : Schema<Message> = new Schema ({
    content :{
        //see clearly that in mongoose it start with capital letter ("String") while normally it is all smaller
        type: String,
        required: true
    },
    createdAt : {
        type : Date ,
        required: true,
        default: Date.now,
    }
})

export interface User extends Document{
    username : string;
    email : string;
    password: string;
    verifyCode: string;
    isVerified : boolean;
    verifyCodeExpiry: Date;
    isAcceptingMessage: boolean;
    messages : Message[];

}


const UserSchema : Schema<User> = new Schema ({
    username :{
        type: String,
        required: [true, "username is required"],
        trim : true,
        unique : true
    },
    email :{
        type: String,
        required: [true, "email is required"],
        unique : true,
        match: [/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/, "please provide a valid email"]
    },
    password :{
        type: String,
        required: [true, "password is required"],
    },
    verifyCode :{
        type: String,
        required: [true, "Verify Code is required"],
    },
    isAcceptingMessage :{
        type: Boolean,
        required: true
    },
    isVerified :{
        type: Boolean,
        default : false
    },
    verifyCodeExpiry : {
        type : Date ,
        required: [true, "Verify Code Expiry is required"],
        default: Date.now,
    },
    messages :[MessageSchema]
})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;