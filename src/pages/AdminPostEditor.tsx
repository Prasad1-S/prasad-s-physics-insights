import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { useQuery } from "@tanstack/react-query";
import { categories, type Category } from "@/types/post";
import { getAuthHeaders } from "@/lib/admin-auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const toSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const AdminPostEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("# Start writing your article in Markdown\n");
  const [published, setPublished] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { data: post, isLoading } = useQuery({
    queryKey: ["adminPost", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await fetch(`/api/admin/posts/${id}`, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      });
      if (!res.ok) {
        throw new Error("Could not load post");
      }
      return (await res.json()) as {
        id: string;
        title: string;
        slug: string;
        category: string;
        excerpt: string;
        content: string;
        published: boolean;
      };
    },
    enabled: Boolean(id),
    onSuccess(data) {
      if (data) {
        setTitle(data.title);
        setSlug(data.slug);
        setCategory(categories.includes(data.category as Category) ? (data.category as Category) : categories[0]);
        setExcerpt(data.excerpt);
        setContent(data.content);
        setPublished(data.published);
      }
    },
    retry: false,
  });

  useEffect(() => {
    if (!isEdit) {
      setSlug(toSlug(title));
    }
  }, [title, isEdit]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!title || !slug || !excerpt || !content) {
      setError("All fields are required.");
      return;
    }

    setSubmitting(true);

    try {
      const body = { title, slug, category, excerpt, content, published };
      const res = await fetch(isEdit ? `/api/admin/posts/${id}` : "/api/admin/posts", {
        method: isEdit ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || "Failed to save post");
      }

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
      <main className="pt-32 px-6 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-heading text-3xl text-foreground">{isEdit ? "Edit Post" : "New Post"}</h1>
            <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to dashboard
            </Link>
          </div>

          {isLoading && <p className="text-foreground">Loading post…</p>}

          {!isLoading && (
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="font-medium text-foreground">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-2 w-full rounded-lg border border-muted bg-background px-3 py-2 text-foreground"
                />
              </div>

              <div>
                <label className="font-medium text-foreground">Slug</label>
                <input
                  value={slug}
                  onChange={(e) => setSlug(toSlug(e.target.value))}
                  required
                  className="mt-2 w-full rounded-lg border border-muted bg-background px-3 py-2 text-foreground"
                />
              </div>

              <div>
                <label className="font-medium text-foreground">Category</label>
                <select
                  value={category}
                  onChange={(e) => {
                    const next = e.target.value as Category;
                    setCategory(categories.includes(next) ? next : categories[0]);
                  }}
                  className="mt-2 w-full rounded-lg border border-muted bg-background px-3 py-2 text-foreground"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-medium text-foreground">Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  required
                  className="mt-2 w-full rounded-lg border border-muted bg-background px-3 py-2 text-foreground"
                  rows={3}
                />
              </div>

              <div data-color-mode="light">
                <label className="font-medium text-foreground">Markdown Content</label>
                <MDEditor value={content} onChange={(value) => setContent(value || "")} height={320} />
              </div>

              <div>
                <label className="inline-flex items-center gap-2 text-foreground">
                  <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
                  Published
                </label>
              </div>

              {error && <p className="text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
              >
                {submitting ? "Saving..." : isEdit ? "Update Post" : "Publish Post"}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPostEditor;
