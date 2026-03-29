import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Missing credentials" });
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    res.status(500).json({ message: "Admin credentials not configured" });
    return;
  }

  if (email !== adminEmail || password !== adminPassword) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "8h" });
  res.status(200).json({ token });
}
