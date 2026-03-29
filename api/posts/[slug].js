import prisma from "../_lib/prisma.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { slug } = req.query;
  if (!slug || Array.isArray(slug)) {
    res.status(400).json({ message: "Invalid slug" });
    return;
  }

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  res.status(200).json(post);
}
