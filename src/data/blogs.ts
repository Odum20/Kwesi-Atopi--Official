import { BlogPost } from '../types';

export const blogPostsData: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Architecture of Low-Latency Local-First Software',
    date: 'March 14, 2026',
    readTime: '6 min read',
    summary: 'Exploring how CRDTs, SQLite in the browser, and edge workers are redefining what it means to build instantaneous web applications.',
    content: `
# The Architecture of Low-Latency Local-First Software

For the past decade, the default assumption of web engineering has been client-server chat: the browser sends an HTTP request, the server queries a database, renders HTML or JSON, and sends it back. 

But as users, we don't care about network round trips. We care about instant response.

## Why Local-First?

When an application stores state locally first—using IndexedDB, SQLite WASM, or local file systems—and synchronizes opportunistically in the background, latency drops to zero.

1. **Optimistic UI by Default**: Every user action updates local state immediately.
2. **Offline Resiliency**: Planes, tunnels, and flaky Wi-Fi no longer break your workflow.
3. **Data Ownership**: Users truly own their documents and records.

## Synchronization Challenges

Moving to local-first isn't a silver bullet. It introduces fascinating distributed systems challenges: conflict resolution, vector clocks, and cryptographic authorization without central authorities.

In future posts, I will dive deep into how we implemented conflict-free replicated data types for SynthFlow.
    `,
    tags: ['Systems', 'Architecture', 'Web'],
    slug: 'architecture-of-low-latency-local-first-software'
  },
  {
    id: 'b2',
    title: 'Designing Interfaces That Get Out of the Way',
    date: 'February 22, 2026',
    readTime: '4 min read',
    summary: 'Why modern developer tools suffer from visual clutter and how typographic hierarchy and whitespace create cognitive ease.',
    content: `
# Designing Interfaces That Get Out of the Way

The best software feels less like an application you are operating and more like an extension of your own thought process.

## The Anti-Slop Discipline

Too many developer tools are bloated with gradient cards, glowing neon badges, fake status tickers, and unnecessary modal popups. This creates cognitive friction.

### Key Principles for Calm Software:
* **Generous Whitespace**: Let elements breathe. Spacing is the most powerful design tool.
* **Unboxed Metadata**: Categories, timestamps, and tags should whisper, not shout inside colored pill boxes.
* **Single-Elevation Depth**: Avoid stacking shadows and borders. Rely on subtle hairline dividers and clean typography.

When you remove the noise, the work speaks for itself.
    `,
    tags: ['Design', 'UX', 'Engineering'],
    slug: 'designing-interfaces-that-get-out-of-the-way'
  },
  {
    id: 'b3',
    title: 'Building Deterministic LLM Pipelines at Scale',
    date: 'January 18, 2026',
    readTime: '8 min read',
    summary: 'Lessons learned from orchestrating multi-model agentic workflows with strict type validation and fallback recovery.',
    content: `
# Building Deterministic LLM Pipelines at Scale

Large Language Models are inherently stochastic. When you chain multiple LLM calls together to perform complex software engineering or data synthesis tasks, error rates compound exponentially.

## Managing Entropy

To build reliable AI pipelines, you cannot treat the model as a black box. You need:
1. **Strict JSON Schema Validation**: Validate every output against robust runtime schemas (Zod).
2. **Automatic Self-Correction**: When an output fails validation, feed the error back into the context window for targeted repair.
3. **Deterministic State Checkpoints**: Save intermediate graph states so execution can resume instantly after a failure.

With these patterns, we can turn probabilistic models into dependable engineering systems.
    `,
    tags: ['AI', 'Engineering', 'Workflows'],
    slug: 'building-deterministic-llm-pipelines-at-scale'
  }
];
