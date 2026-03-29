import prisma from "../../_lib/prisma";
import { requireAuth } from "../../_lib/auth";

export default async function handler(req, res) {
  try {
    requireAuth(req);
  } catch (err) {
    return res.status(err.status || 401).json({ message: err.message });
  }

  const { id } = req.query;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  if (req.method === "GET") {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(post);
  }

  if (req.method === "PATCH") {
    const { title, slug, excerpt, content, category, published } = req.body;

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Post not found" });
    }

    const updated = await prisma.post.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        slug: slug ?? existing.slug,
        excerpt: excerpt ?? existing.excerpt,
        content: content ?? existing.content,
        category: category ?? existing.category,
        published: published ?? existing.published,
      },
    });

    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    await prisma.post.delete({ where: { id } });
    return res.status(204).end();
  }

  res.status(405).json({ message: "Method not allowed" });
}
