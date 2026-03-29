import { useParams, Link } from "react-router-dom";
import { posts } from "@/data/posts";
import { categoryColors } from "@/data/posts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
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
            <span className="text-xs text-muted-foreground font-body">{post.readTime}</span>
            <span className="text-xs text-muted-foreground font-body">·</span>
            <span className="text-xs text-muted-foreground font-body">{post.date}</span>
          </div>

          <h1
            className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {post.title}
          </h1>

          <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {post.content.map((paragraph, i) => {
              if (i === 2) {
                return (
                  <div key={`quote-${i}`}>
                    <p className="font-body text-foreground/85 leading-relaxed text-lg mb-6">
                      {paragraph}
                    </p>
                    <blockquote className="border-pull-quote pl-6 py-2 my-8">
                      <p className="font-heading text-lg md:text-xl italic text-foreground/75 leading-relaxed">
                        {post.pullQuote}
                      </p>
                    </blockquote>
                  </div>
                );
              }
              return (
                <p key={i} className="font-body text-foreground/85 leading-relaxed text-lg mb-6">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default PostPage;
