import prisma from "../_lib/prisma.js";
import { requireAuth } from "../_lib/auth.js";

const categories = ["Light", "Heat", "Motion", "Sound", "Forces", "Electricity"];

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      requireAuth(req);
    } catch (err) {
      return res.status(err.status || 401).json({ message: err.message });
    }

    const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
    return res.status(200).json(posts);
  }

  if (req.method === "POST") {
    try {
      requireAuth(req);
    } catch (err) {
      return res.status(err.status || 401).json({ message: err.message });
    }

    const { title, slug, excerpt, content, category, published } = req.body;

    if (!title || !slug || !excerpt || !content || !category || !categories.includes(category)) {
      return res.status(400).json({ message: "Missing or invalid fields" });
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        category,
        published: Boolean(published),
      },
    });

    return res.status(201).json(post);
  }

  res.status(405).json({ message: "Method not allowed" });
}
