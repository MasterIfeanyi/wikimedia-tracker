import connectToDatabase from "@/lib/mongodb";
import PR from "@/lib/models/PR";

export async function GET() {
  await connectToDatabase();
  const prs = await PR.find().sort({ _id: -1 });
  return Response.json(prs);
}

export async function POST(request) {
  const { title, description, link, repoTag } = await request.json();

  if (!title || !description || !link || !repoTag) {
    return Response.json({ error: "All fields are required" }, { status: 400 });
  }

  await connectToDatabase();

  const pr = await PR.create({ title, description, link, repoTag });

  return Response.json(pr, { status: 201 });
}