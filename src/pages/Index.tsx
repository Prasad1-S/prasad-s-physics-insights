import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";
import CategoryFilter from "@/components/CategoryFilter";
import Footer from "@/components/Footer";
import { posts, Category } from "@/data/posts";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const filteredPosts = selectedCategory
    ? posts.filter((p) => p.category === selectedCategory)
    : posts;

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, i) => (
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
          {filteredPosts.length === 0 && (
            <p className="text-center text-muted-foreground font-body mt-12">
              No articles in this category yet. Check back soon!
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
