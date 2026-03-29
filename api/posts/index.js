import prisma from "../_lib/prisma.js";

const categories = ["Light", "Heat", "Motion", "Sound", "Forces", "Electricity"];

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const category = req.query.category;
  const where = { published: true };

  if (category && categories.includes(category)) {
    where.category = category;
  }

  const posts = await prisma.post.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  res.status(200).json(posts);
}
