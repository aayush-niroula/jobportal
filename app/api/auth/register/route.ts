import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user, hashes the password, and assigns a role using role_name.
 *     tags:
 *       - Authentication
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role_name
 *             properties:
 *               name:
 *                 type: string
 *                 example: ayushniroula
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ayush@gmail.com
 *               password:
 *                 type: string
 *                 example: StrongPass@123
 *               phone:
 *                 type: string
 *                 example: 9800000000
 *               role_name:
 *                 type: string
 *                 example: job_seeker
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered
 *                 userId:
 *                   type: string
 *                   example: 64f8a2c1e3a2f9a9b1234567
 *       400:
 *         description: Bad request - validation error or user exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               MissingFields:
 *                 value:
 *                   error: Missing required fields
 *               UserExists:
 *                 value:
 *                   error: User already exists
 *       404:
 *         description: Role not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Role not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error
 */

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone, role_name } = await req.json();

    if (!name || !email || !password || !role_name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

  
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = await prisma.role.findUnique({ where: { role_name } });
    if (!role) return NextResponse.json({ error: "Role not found" }, { status: 404 });

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role_id: role.id,
      },
    });

    return NextResponse.json({ message: "User registered", userId: user.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
