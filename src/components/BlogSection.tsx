import React from 'react';
import { BlogPost } from '../types';
import { ArrowUpRight, BookOpen, Clock, Calendar } from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts, onSelectPost }) => {
  return (
    <section id="blog" className="py-24 border-t border-neutral-900 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 font-mono mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>04 // Writing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
              Personal Blog Posts
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400">
            Deep dives into software architecture, local-first state, design minimalism, and LLM workflow engineering.
          </p>
        </div>

        {/* Blog Posts List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="group bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-8 hover:border-neutral-700 transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex-1">
                {/* Zero-Pill Metadata */}
                <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-neutral-300">{post.tags.join(' / ')}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-neutral-100 group-hover:text-white mb-2 transition-colors">
                  {post.title}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed line-clamp-2">
                  {post.summary}
                </p>
              </div>

              <div className="shrink-0 flex items-center">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300 group-hover:bg-neutral-100 group-hover:text-neutral-950 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
