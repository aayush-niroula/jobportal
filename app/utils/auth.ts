import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
export async function authenticate(req: NextRequest) {
    try {
        const authHeader = req.headers.get('Authorization');

        if(!authHeader || !authHeader.startsWith('Bearer')){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        if(!token){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

        return { userId: decoded.userId };
    } catch (error) {
        console.log("Auth error:", error);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}
