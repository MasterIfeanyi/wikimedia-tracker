import connectToDatabase from "@/lib/mongodb";
import PR from "@/lib/models/PR";

export async function PUT(request, { params }) {
  const { id } = params;
  const { title, description, link, repoTag } = await request.json();

  await connectToDatabase();

  const updatedPr = await PR.findByIdAndUpdate(
    id,
    { title, description, link, repoTag },
    { new: true }
  );

  return Response.json(updatedPr);
}