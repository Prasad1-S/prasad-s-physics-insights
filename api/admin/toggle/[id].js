import prisma from "../../_lib/prisma.js";
import { requireAuth } from "../../_lib/auth.js";

export default async function handler(req, res) {
  try {
    requireAuth(req);
  } catch (err) {
    return res.status(err.status || 401).json({ message: err.message });
  }

  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ message: "Post not found" });
  }

  const updated = await prisma.post.update({
    where: { id },
    data: { published: !existing.published },
  });

  return res.status(200).json(updated);
}
