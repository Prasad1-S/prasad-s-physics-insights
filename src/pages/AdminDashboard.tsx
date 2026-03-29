import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthHeaders, clearAdminToken } from "@/lib/admin-auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fetchAdminPosts = async () => {
  const res = await fetch("/api/admin/posts", {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  if (res.status === 401 || res.status === 403) {
    throw new Error("unauthorized");
  }
  if (!res.ok) {
    throw new Error("Failed to load posts");
  }
  return (await res.json()) as Array<{ id: string; slug: string; title: string; category: string; published: boolean; createdAt: string }>;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: posts, isLoading, isError, error } = useQuery({
    queryKey: ["adminPosts"],
    queryFn: fetchAdminPosts,
    retry: false,
    onError(err) {
      if ((err as Error).message === "unauthorized") {
        clearAdminToken();
        navigate("/admin/login");
      }
    },
  });

  const deleteMutation = useMutation<void, Error, string>(
    async (id) => {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      });
      if (!res.ok) throw new Error("Failed to delete");
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(["adminPosts"]);
      },
    }
  );

  const toggleMutation = useMutation<void, Error, string>(
    async (id) => {
      const res = await fetch(`/api/admin/toggle/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      });
      if (!res.ok) throw new Error("Failed to toggle");
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(["adminPosts"]);
      },
    }
  );

  const handleLogout = () => {
    clearAdminToken();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 px-6 pb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <div className="flex gap-2">
              <button
                onClick={handleLogout}
                className="rounded-xl bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground"
              >
                Log out
              </button>
              <Link
                to="/admin/new"
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                New Post
              </Link>
            </div>
          </div>

          {isLoading && <p className="text-foreground">Loading posts...</p>}
          {isError && <p className="text-destructive">{(error as Error)?.message || "Error loading posts."}</p>}

          {!isLoading && posts && (
            <div className="overflow-x-auto rounded-xl border border-muted p-2 bg-white/5">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr>
                    <th className="px-3 py-2">Title</th>
                    <th className="px-3 py-2">Slug</th>
                    <th className="px-3 py-2">Category</th>
                    <th className="px-3 py-2">Published</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-t border-muted/40">
                      <td className="px-3 py-2">{post.title}</td>
                      <td className="px-3 py-2">{post.slug}</td>
                      <td className="px-3 py-2">{post.category}</td>
                      <td className="px-3 py-2">{post.published ? "Yes" : "Draft"}</td>
                      <td className="px-3 py-2 space-x-1">
                        <Link
                          to={`/admin/${post.id}/edit`}
                          className="rounded-lg border border-primary px-2 py-1 text-xs font-medium text-primary"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => toggleMutation.mutate(post.id)}
                          className="rounded-lg border border-secondary px-2 py-1 text-xs font-medium text-secondary"
                        >
                          {post.published ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          onClick={() => deleteMutation.mutate(post.id)}
                          className="rounded-lg border border-destructive px-2 py-1 text-xs font-medium text-destructive"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
