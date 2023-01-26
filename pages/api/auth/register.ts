import { prisma } from "../../../utils/db";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";

// const SECRET = process.env.SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | string>
) {
  try {
    if (!req.body) {
      return res.status(400).json("No content!");
    }
    const { firstName, lastName, email, password, confirm_password } = req.body;
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email ||
      !password ||
      !confirm_password
    ) {
      return res.status(400).json("Missing field!");
    }
    if (password !== confirm_password) {
      return res.status(400).json("Password is not match!");
    }
    const isExisted = await prisma.user.findFirst({ where: { email } });
    if (isExisted) {
      return res.status(400).json("This email has already existed!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json("Lỗi hệ thống");
  }
}
