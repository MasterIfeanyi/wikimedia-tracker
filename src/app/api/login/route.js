import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const { name, password } = await request.json();

  if (!name || !password) {
    return Response.json({ error: "Name and password are required" }, { status: 400 });
  }

  await connectToDatabase();

  const user = await User.findOne({ name });

  if (!user) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const response = Response.json({ message: "Logged in" });
  response.headers.set(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`
  );

  return response;
}