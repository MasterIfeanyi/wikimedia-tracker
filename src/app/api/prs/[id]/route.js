import connectToDatabase from "@/lib/mongodb";
import PR from "@/lib/models/PR";

export async function PUT(request, { params }) {
  const { id } = await params;
  const { title, description, link, repoTag } = await request.json();

  await connectToDatabase();

  const updatedPr = await PR.findByIdAndUpdate(
    id,
    { title, description, link, repoTag },
    { new: true }
  );

  return Response.json(updatedPr);
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  await connectToDatabase();

  await PR.findByIdAndDelete(id);

  return Response.json({ message: "Deleted" });
}