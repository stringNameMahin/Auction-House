"use server"

import { hash } from "bcrypt"
import { prisma } from "@/lib/prisma"

interface RegisterUserParams {
  name: string
  email: string
  password: string
}

export async function registerUser({ name, email, password }: RegisterUserParams) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: "User with this email already exists" }
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return { success: true, userId: user.id }
  } catch (error) {
    console.error("Registration error:", error)
    return { error: "Failed to register user" }
  }
}

export async function verifyEmail(token: string) {
  try {
    // Find the verification token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    })

    if (!verificationToken) {
      return { error: "Invalid token" }
    }

    // Check if token is expired
    if (new Date() > verificationToken.expires) {
      return { error: "Token expired" }
    }

    // Update user's email verification status
    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() },
    })

    // Delete the used token
    await prisma.verificationToken.delete({
      where: { token },
    })

    return { success: true }
  } catch (error) {
    console.error("Email verification error:", error)
    return { error: "Failed to verify email" }
  }
}

