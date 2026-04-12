import type { LucideIcon } from "lucide-react";
import {
  Binary,
  Blocks,
  FolderGit2,
  Globe2,
  Handshake,
  Layers3,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from "lucide-react";

export const navigation = [
  { label: "Features", href: "#features" },
  { label: "Projects", href: "#projects" },
  { label: "Contribute", href: "#contribute" },
  { label: "FAQ", href: "#faq" },
];

export const stats = [
  { label: "Community maintainers", value: "40+" },
  { label: "Active pilots", value: "12" },
  { label: "Funding partners", value: "8" },
];

export const features: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Open standards by default",
    description:
      "Build on transparent governance, reusable protocols, and contributor-friendly documentation from day one.",
    icon: Blocks,
  },
  {
    title: "Developer-first distribution",
    description:
      "Ship modular packages, reference apps, and starter kits that make adoption feel immediate instead of aspirational.",
    icon: Binary,
  },
  {
    title: "Operational trust",
    description:
      "Give collaborators crisp roadmaps, public changelogs, and obvious ownership boundaries across every release.",
    icon: ShieldCheck,
  },
];

export const projectHighlights: Array<{
  title: string;
  description: string;
  status: string;
  icon: LucideIcon;
}> = [
  {
    title: "Core protocol",
    description:
      "The shared foundation for identity, access, and orchestration across every community-built surface.",
    status: "In review",
    icon: Layers3,
  },
  {
    title: "Reference dashboard",
    description:
      "A polished operator console for maintainers, sponsors, and developers to monitor open initiative health.",
    status: "Live alpha",
    icon: Globe2,
  },
  {
    title: "CLI toolkit",
    description:
      "A local-first toolbox for scaffolding modules, publishing releases, and keeping contributor workflows tight.",
    status: "Roadmap",
    icon: TerminalSquare,
  },
];

export const contributionTracks: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Ship code",
    description:
      "Pick up scoped issues, improve primitives, or help shape the starter kits that new teams depend on.",
    icon: FolderGit2,
  },
  {
    title: "Strengthen docs",
    description:
      "Translate rough implementation detail into onboarding material that gets contributors moving fast.",
    icon: Sparkles,
  },
  {
    title: "Support the mission",
    description:
      "Partner on funding, advocacy, or ecosystem introductions that multiply what the core team can sustain.",
    icon: Handshake,
  },
];

export const faqs = [
  {
    question: "Who is this project for?",
    answer:
      "Teams building public infrastructure, internal platforms, or mission-driven developer tools that benefit from transparent collaboration and reusable foundations.",
  },
  {
    question: "How early is the initiative?",
    answer:
      "Early enough to shape the roadmap, but mature enough to have a clear architecture, initial pilots, and documented contribution paths.",
  },
  {
    question: "Do I need to contribute code to participate?",
    answer:
      "No. Design, documentation, governance, community operations, and partnerships all create real leverage for an open-source initiative.",
  },
  {
    question: "What should live on this homepage later?",
    answer:
      "Swap these placeholders with your real mission, proof points, maintainer bios, roadmap updates, partner logos, and contribution workflows.",
  },
];

export const footerLinks = [
  { label: "GitHub", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Community", href: "#" },
  { label: "Roadmap", href: "#" },
];

export const heroSignals = [
  {
    label: "Mission",
    value: "Build open tooling that feels premium, rigorous, and easy to adopt.",
  },
  {
    label: "Focus",
    value: "Developer infrastructure, transparent governance, long-term stewardship.",
  },
  {
    label: "Momentum",
    value: "From concept to contributor-ready in weeks, not quarters.",
  },
];
