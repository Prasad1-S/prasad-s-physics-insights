import { Post, categoryColors } from "@/data/posts";

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

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
        <span className="text-xs text-muted-foreground font-body">
          {post.readTime}
        </span>
      </div>
      <h3
        className={`font-heading font-semibold text-foreground group-hover:text-primary transition-colors mb-3 ${
          featured ? "text-2xl md:text-3xl" : "text-xl"
        }`}
      >
        {post.title}
      </h3>
      <p className="font-body text-muted-foreground leading-relaxed text-sm">
        {post.teaser}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-body">{post.date}</span>
        <span className="text-sm font-body font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Read →
        </span>
      </div>
    </article>
  );
};

export default PostCard;
