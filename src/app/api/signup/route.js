import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const { name, password } = await request.json();

  if (!name || !password) {
    return Response.json({ error: "Name and password are required" }, { status: 400 });
  }

  await connectToDatabase();

  const existingUser = await User.findOne({ name });

  if (existingUser) {
    return Response.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    password: hashedPassword,
  });

  return Response.json({ message: "User created", userId: user._id }, { status: 201 });
}