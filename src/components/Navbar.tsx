import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav shadow-card border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-heading text-xl md:text-2xl font-semibold text-foreground tracking-tight">
          Prasad Explains
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <a
            href="#posts"
            className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
          >
            Articles
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
