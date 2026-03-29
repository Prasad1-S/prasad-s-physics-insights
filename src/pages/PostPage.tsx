import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { categoryColors } from "@/types/post";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fetchPost = async (slug: string) => {
  const res = await fetch(`/api/posts/${encodeURIComponent(slug)}`);
  if (!res.ok) {
    throw new Error("Post not found");
  }
  return (await res.json()) as {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: import("@/types/post").Category;
    published: boolean;
    createdAt: string;
  };
};

const formatDate = (createdAt: string) => {
  try {
    return new Date(createdAt).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
};

const getReadTime = (content: string) => {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min`;
};

const PostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug || ""),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-foreground">Loading article…</div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Post not found</h1>
          <Link to="/" className="text-primary font-body hover:underline">
            ← Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-2xl">
          <Link
            to="/"
            className="inline-block text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            ← Back to all articles
          </Link>

          <div className="flex items-center gap-3 mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className={`text-xs font-body font-medium px-3 py-1 rounded-full ${categoryColors[post.category]}`}>
              {post.category}
            </span>
            <span className="text-xs text-muted-foreground font-body">{getReadTime(post.content)}</span>
            <span className="text-xs text-muted-foreground font-body">·</span>
            <span className="text-xs text-muted-foreground font-body">{formatDate(post.createdAt)}</span>
          </div>

          <h1
            className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {post.title}
          </h1>

          <div className="prose prose-invert opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default PostPage;
