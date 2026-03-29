import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";
import CategoryFilter from "@/components/CategoryFilter";
import Footer from "@/components/Footer";
import { Category } from "@/types/post";

const fetchPosts = async (category: Category | null) => {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  const res = await fetch(`/api/posts${query}`);
  if (!res.ok) {
    throw new Error("Failed to load articles");
  }
  return (await res.json()) as Array<{ id: string; slug: string; title: string; excerpt: string; content: string; category: Category; published: boolean; createdAt: string }>;
};

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["posts", selectedCategory],
    queryFn: () => fetchPosts(selectedCategory),
    staleTime: 1000 * 60,
    keepPreviousData: true,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      <section id="posts" className="px-6 pb-16">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground text-center mb-8">
            All Articles
          </h2>
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

          {isError && (
            <div className="text-center py-12">
              <p className="text-lg text-foreground">Could not load articles. Please refresh the page.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card rounded-xl p-6 animate-pulse h-52" />
              ))}

            {!isLoading && posts?.length === 0 && (
              <p className="text-center text-muted-foreground font-body mt-12">
                No articles in this category yet. Check back soon!
              </p>
            )}

            {!isLoading &&
              posts?.map((post, i) => (
                <Link
                  key={post.id}
                  to={`/post/${post.slug}`}
                  className="opacity-0 animate-fade-up block"
                  style={{ animationDelay: `${0.1 * i}s` }}
                >
                  <PostCard post={post} />
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
