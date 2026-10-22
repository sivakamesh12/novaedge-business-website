import caseStudyFintechImg from '../assets/images/case_study_fintech_1792669469966.jpg';
import caseStudyLogisticsImg from '../assets/images/case_study_logistics_1792669471199.jpg';
import caseStudyHealthtechImg from '../assets/images/case_study_healthtech_1792669470472.jpg';

export interface CaseStudy {
  id: string;
  title: string;
  projectType: string;
  industry: string;
  category: 'fintech' | 'logistics' | 'healthtech';
  headlineMetric: string;
  metricLabel: string;
  image: string;
  fallbackImage: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  isSampleBrief: boolean;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  capabilities: string[];
  icon: string;
}

export interface EngagementStandard {
  id: string;
  title: string;
  principle: string;
  detail: string;
  highlight: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'engagement' | 'technical' | 'pricing' | 'timeline';
}

export const COMPANY_DATA = {
  brand: {
    name: "NovaEdge",
    tagline: "Digital Strategy & Enterprise Engineering",
    mission: "Architecting resilient digital systems, high-velocity software, and refined product experiences for modern enterprise teams.",
    yearEstablished: "2019",
  },
  contact: {
    // Editable placeholders: Replace these with your actual business values
    email: "inquiries@novaedge.io",
    emailSubject: "Project Inquiry - NovaEdge Discovery",
    phone: "+1 (555) 019-8234",
    phoneDisplay: "+1 (555) 019-8234",
    whatsappNumber: "15550198234", // Format: international number without '+' or special characters
    whatsappDefaultMessage: "Hello NovaEdge Team, I would like to schedule a discovery conversation regarding an upcoming digital initiative.",
    address: {
      isDemoLocation: true,
      label: "Demo Location (Placeholder)",
      street: "450 Mission Street, Suite 1400",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "United States",
      display: "450 Mission Street, Suite 1400, San Francisco, CA 94105",
      coordinates: "37.7909° N, 122.3998° W",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=450+Mission+Street,+San+Francisco,+CA+94105",
    },
    officeHours: "Monday – Friday: 08:30 – 18:00 PST",
    responseSLA: "Within 24 business hours",
  },
  // Technical standards and engineering benchmarks (measured in standard staging & load testing)
  benchmarks: [
    { value: "< 50ms", label: "Target p99 API Latency", context: "Distributed edge routing & Redis caching" },
    { value: "99.99%", label: "Target High-Availability", context: "Multi-region redundant failover architecture" },
    { value: "100%", label: "Client Code Ownership", context: "Zero vendor lock-in; complete IP handover" },
    { value: "14 Days", label: "Discovery-to-Blueprint Sprint", context: "Validated technical architecture before coding" },
  ],
  services: [
    {
      id: "product-strategy",
      number: "01",
      title: "Product Strategy & Technical Blueprinting",
      tagline: "Translate business goals into rigorous, stress-tested system architecture.",
      description: "We work directly with founders and technical leaders to audit legacy constraints, identify concurrency bottlenecks, and formulate milestone-driven technical roadmaps before engineering starts.",
      deliverables: [
        "Comprehensive architectural blueprints & domain entity maps",
        "Technical risk matrices & load-capacity forecasts",
        "Infrastructure cost optimization & compute resource models",
        "Quarterly engineering sprint milestones with acceptance criteria"
      ],
      capabilities: ["Domain-Driven Design", "Tech Stack Modernization", "Feasibility Audits", "Legacy Decoupling"],
      icon: "Compass",
    },
    {
      id: "cloud-engineering",
      number: "02",
      title: "Cloud Infrastructure & Distributed Systems",
      tagline: "High-throughput cloud backends engineered for uptime and elastic scale.",
      description: "From asynchronous event-driven queues to zero-loss database replication, we architect backend services engineered to sustain unpredictable traffic spikes while ensuring strict data integrity.",
      deliverables: [
        "Fault-tolerant containerized deployments (Docker & Kubernetes)",
        "Multi-region database clustering & automated disaster recovery",
        "Edge-cached REST & GraphQL API gateway configurations",
        "Distributed tracing and real-time observability telemetry"
      ],
      capabilities: ["Kubernetes & Docker", "PostgreSQL & Redis", "Kafka & Event Streams", "CI/CD GitOps"],
      icon: "Cpu",
    },
    {
      id: "experience-design",
      number: "03",
      title: "Design Systems & High-Velocity UI/UX",
      tagline: "Bespoke digital interfaces that balance visual elegance with operational speed.",
      description: "We craft custom, accessible design systems and responsive web applications built to scale. No cookie-cutter templates—every component is designed for usability, speed, and cross-device consistency.",
      deliverables: [
        "Component token libraries built for Figma-to-code synchronization",
        "Interactive micro-interaction and state feedback prototypes",
        "Fully responsive layouts across mobile, tablet, and desktop viewports",
        "Accessibility compliance audits (WCAG 2.1 AA standards)"
      ],
      capabilities: ["Design Tokens", "Accessible Components", "Motion Design", "Full Responsiveness"],
      icon: "Layers",
    },
    {
      id: "data-intelligence",
      number: "04",
      title: "Data Pipelines & Automated Operations",
      tagline: "Unify fragmented operational workflows into real-time intelligence feeds.",
      description: "Eliminate manual data reconciliation. We build automated ETL pipelines, real-time telemetry dashboards, and webhook-driven notification systems that keep engineering and product teams proactive.",
      deliverables: [
        "High-volume streaming ETL and batch aggregation pipelines",
        "Executive operational dashboards with tabular data precision",
        "Automated error monitoring, health check alerts, and audit trails",
        "Role-based access control (RBAC) and security boundary configuration"
      ],
      capabilities: ["Streaming ETL", "Operational Dashboards", "Webhook Integrations", "Audit Compliance"],
      icon: "BarChart3",
    },
  ] as ServiceItem[],

  // 3 Detailed Sample Case Studies (Hypothetical reference architectures for demonstration)
  caseStudies: [
    {
      id: "sample-fintech-settlement",
      title: "Institutional Settlement Engine: Event-Sourced Transaction Processing",
      projectType: "Sample Financial Architecture",
      industry: "Financial Technology",
      category: "fintech",
      headlineMetric: "1.4s",
      metricLabel: "Benchmark Reconciliation Latency",
      image: caseStudyFintechImg,
      fallbackImage: "/images/case-study-fintech.jpg",
      summary: "Reference blueprint for migrating a batch-based ledger into an event-driven ledger capable of sub-second settlement reconciliation during peak trading sessions.",
      challenge: "Legacy relational databases frequently experience read/write contention during market close spikes, causing reconciliation delays and high operational risk.",
      solution: "Engineered an event-sourced architecture combining Go-based worker services, Redis streams for transient message buffering, and partitioned PostgreSQL storage with cryptographic checksum auditing.",
      results: [
        "Demonstrated 1.4s average settlement turnaround under 10,000 simulated tx/sec",
        "Eliminated database thread starvation via decoupled asynchronous queues",
        "Zero data reconciliation variance across simulated peak load tests",
        "Designed with SOC2 Type II compliance audit logging from the foundation"
      ],
      techStack: ["TypeScript", "Go", "PostgreSQL", "Redis", "Kafka", "Docker"],
      isSampleBrief: true,
    },
    {
      id: "sample-logistics-dispatch",
      title: "Autonomous Fleet Routing: Dynamic Telematics & Transit Optimization",
      projectType: "Sample Logistics Architecture",
      industry: "Supply Chain & Transport",
      category: "logistics",
      headlineMetric: "< 250ms",
      metricLabel: "Dynamic Route Recalculation Time",
      image: caseStudyLogisticsImg,
      fallbackImage: "/images/case-study-logistics.jpg",
      summary: "Architectural prototype for a real-time carrier command console providing live GPS ingestion, automated geofence event triggers, and congestion rerouting.",
      challenge: "Fleet dispatchers working across disjointed regional consoles struggle to react to port bottlenecks and weather disruptions, causing compounding demurrage penalties.",
      solution: "Built a centralized operations interface with WebSocket-driven map telemetry, event-based customs milestone webhooks, and distributed routing algorithms.",
      results: [
        "Tested to reliably ingest 15,000 concurrent vehicle pings with sub-second propagation",
        "Automated ETA recalculation within 250ms of detected transit anomalies",
        "Responsive operator console functional on mobile field devices and 4K command displays",
        "Standardized GIS data schemas using PostGIS and open geo-routing APIs"
      ],
      techStack: ["React", "Node.js", "Redis", "PostGIS", "WebSockets", "Docker"],
      isSampleBrief: true,
    },
    {
      id: "sample-healthtech-telemetry",
      title: "Decentralized Clinical Telemetry: Encrypted Biomarker Ingestion",
      projectType: "Sample HealthTech Architecture",
      industry: "Healthcare & Biotech",
      category: "healthtech",
      headlineMetric: "99.99%",
      metricLabel: "Target Ingestion Availability",
      image: caseStudyHealthtechImg,
      fallbackImage: "/images/case-study-healthtech.jpg",
      summary: "Architectural blueprint for HIPAA-ready decentralized trial data collection, providing secure investigator tablet interfaces and immutable audit verification.",
      challenge: "Multi-site clinical trials require rapid adverse event detection while strictly enforcing patient anonymization, cryptographic auditability, and FDA regulatory standards.",
      solution: "Implemented an encrypted ingestion pipeline with zero-knowledge data tokenization, tamper-evident audit logs, and clean tablet interfaces optimized for clinical staff.",
      results: [
        "Designed to process patient sensor streams with zero unencrypted transit exposure",
        "Adverse event alert notification pipeline configured with sub-minute delivery",
        "Touch-optimized tablet interface ensuring zero data entry omissions",
        "Architected to comply with FDA 21 CFR Part 11 electronic records criteria"
      ],
      techStack: ["React", "FastAPI", "PostgreSQL", "TLS 1.3 Encryption", "Docker"],
      isSampleBrief: true,
    },
  ] as CaseStudy[],

  // Honest Collaboration Standards (Replacing unverified customer claims)
  engagementStandards: [
    {
      id: "standard-1",
      title: "Total Client Code & IP Ownership",
      principle: "100% Repository Transparency",
      detail: "From the first commit to final handover, all source code, architecture schemas, Dockerfiles, and CI/CD scripts belong entirely to your organization without proprietary locks.",
      highlight: "Clean Git handoff with full documentation",
    },
    {
      id: "standard-2",
      title: "Direct Architectural Access",
      principle: "Zero Intermediary Overhead",
      detail: "You communicate directly with senior engineers and systems designers executing your sprints. No account managers or delayed email chains.",
      highlight: "Weekly live demos on staging environments",
    },
    {
      id: "standard-3",
      title: "Milestone-Based Accountability",
      principle: "Predictable Scopes & Budgets",
      detail: "Every project phase is governed by clear technical deliverables and agreed acceptance tests. Sprints are fixed-fee, giving you budgetary certainty.",
      highlight: "No unexpected hourly overages",
    },
  ] as EngagementStandard[],

  faqs: [
    {
      id: "faq-1",
      question: "How does NovaEdge structure an engagement?",
      answer: "We typically operate in focused sprints. We begin with a 2-week Discovery & Architecture Sprint to audit existing systems, define technical constraints, and create blueprints. Following that, we deliver in 2-week milestone cycles with live staging previews and automated tests.",
      category: "engagement",
    },
    {
      id: "faq-2",
      question: "Can NovaEdge collaborate with our existing in-house engineering team?",
      answer: "Yes. We frequently embed alongside internal engineering teams to solve complex architecture challenges, build greenfield microservices, or modernize legacy bottlenecks while ensuring knowledge transfer throughout the project.",
      category: "engagement",
    },
    {
      id: "faq-3",
      question: "What technical stacks do you specialize in?",
      answer: "Our core expertise focuses on modern TypeScript, React, Node.js, Go, Python, PostgreSQL, Redis, Kubernetes, and major cloud providers (AWS, GCP). We emphasize robust, portable open-source technologies over unproven hype.",
      category: "technical",
    },
    {
      id: "faq-4",
      question: "What are your standard project timelines and typical investments?",
      answer: "Targeted architecture discovery sprints take 2 to 3 weeks. Full product builds and platform migrations typically span 8 to 16 weeks depending on scope. Pricing is structured as fixed-fee milestone agreements.",
      category: "pricing",
    },
    {
      id: "faq-5",
      question: "Do you provide post-launch support and SLAs?",
      answer: "Yes. Every production delivery includes a 30-day hypercare stabilization guarantee. We also offer ongoing engineering support retainers with defined response SLAs and continuous optimization.",
      category: "timeline",
    },
    {
      id: "faq-6",
      question: "How do we get started?",
      answer: "Submit our discovery inquiry form below, send an email to inquiries@novaedge.io, or reach out via our direct WhatsApp line. We respond within 24 business hours to set up an introductory consultation.",
      category: "engagement",
    },
  ] as FAQItem[],

  socialLinks: [
    { name: "LinkedIn", href: "https://linkedin.com", label: "NovaEdge on LinkedIn" },
    { name: "GitHub", href: "https://github.com", label: "NovaEdge on GitHub" },
    { name: "X (Twitter)", href: "https://x.com", label: "NovaEdge on X" },
  ],
};
