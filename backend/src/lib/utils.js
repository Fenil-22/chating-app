import jvt from "jsonwebtoken";

export const generateToken = (userId,res) => {
    const token = jvt.sign({ userId},process.env.JWT_SECRET, 
        {
             expiresIn: "7d",
             
    });

    res.cookie("jwt", token, {
        httpOnly: true, 
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            secure: process.env.NODE_ENV === "production",
        });

        return token;
}
