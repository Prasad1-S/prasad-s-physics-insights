import { Post, categoryColors } from "@/types/post";

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

const getReadTime = (content: string) => {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min`;
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

const PostCard = ({ post, featured = false }: PostCardProps) => {
  return (
    <article
      className={`glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 group ${
        featured ? "p-8" : "p-6"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className={`text-xs font-body font-medium px-3 py-1 rounded-full ${categoryColors[post.category]}`}
        >
          {post.category}
        </span>
        <span className="text-xs text-muted-foreground font-body">{getReadTime(post.content)}</span>
      </div>
      <h3
        className={`font-heading font-semibold text-foreground group-hover:text-primary transition-colors mb-3 ${
          featured ? "text-2xl md:text-3xl" : "text-xl"
        }`}
      >
        {post.title}
      </h3>
      <p className="font-body text-muted-foreground leading-relaxed text-sm">{post.excerpt}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-body">{formatDate(post.createdAt)}</span>
        <span className="text-sm font-body font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Read →
        </span>
      </div>
    </article>
  );
};

export default PostCard;
