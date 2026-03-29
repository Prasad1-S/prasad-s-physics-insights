import { useQuery } from "@tanstack/react-query";
import { Post } from "@/types/post";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";

const fetchFeatured = async () => {
  const res = await fetch("/api/posts");
  if (!res.ok) throw new Error("Failed to load featured post");
  return (await res.json()) as Post[];
};

const Hero = () => {
  const { data: posts } = useQuery({
    queryKey: ["heroPosts"],
    queryFn: fetchFeatured,
    staleTime: 1000 * 60,
  });
  const featured = posts?.[0];

  return (
    <section className="pt-32 pb-16 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <h1
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Everyday things.{" "}
          <span className="text-gradient-warm">Extraordinary physics.</span>
        </h1>
        <p
          className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          Prasad notices the physics hiding in ordinary moments — soap bubbles, refrigerators, blue skies — and can't stop explaining why they're extraordinary.
        </p>

        <div
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body font-medium">
            Featured
          </p>
          {featured ? (
            <Link to={`/post/${featured.slug}`} className="block max-w-2xl mx-auto">
              <PostCard post={featured} featured />
            </Link>
          ) : (
            <div className="glass-card rounded-xl p-8 text-center text-muted-foreground">No featured post available.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
