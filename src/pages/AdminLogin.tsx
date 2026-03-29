import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { setAdminToken } from "@/lib/admin-auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body?.message || "Login failed");
      }

      const { token } = await res.json();
      setAdminToken(token);
      navigate("/admin");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 px-6">
        <div className="container mx-auto max-w-md bg-white/10 backgroud-blur-xl rounded-2xl p-8 shadow-lg">
          <h1 className="font-heading text-3xl mb-4 text-foreground">Admin Login</h1>
          <p className="mb-6 text-muted-foreground">Only accessible to the site owner.</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="font-medium text-foreground">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border border-muted bg-background px-3 py-2 text-foreground"
              />
            </label>
            <label className="block">
              <span className="font-medium text-foreground">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border border-muted bg-background px-3 py-2 text-foreground"
              />
            </label>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            <Link to="/" className="underline hover:text-foreground">
              ← Back to home
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLogin;
