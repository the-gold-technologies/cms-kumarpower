import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user && user.password) {
        // Compare entered password with hashed password securely
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          return NextResponse.json({
            success: true,
            message: "Login successful",
            user: { id: user.id, email: user.email, name: user.name },
          });
        }
      }
    } catch (dbError) {
      console.warn("PostgreSQL database offline or unreachable:", dbError);
    }

    // Fallback authentication for local development
    if (email === "admin@kumarpower.com" && password === "1234asdf@") {
      return NextResponse.json({
        success: true,
        message: "Login successful",
        user: { email: "admin@kumarpower.com", name: "Admin" },
      });
    }

    return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ success: false, message: "Authentication error" }, { status: 500 });
  }
}
