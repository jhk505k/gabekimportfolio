export const HERO_IMAGE = "https://images.pexels.com/photos/37730212/pexels-photo-37730212.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

export const LINKS = {
  linkedin: "https://www.linkedin.com/in/ji-kim-5179495",
  github: "https://github.com/jhk505k",
  email: "jhk505k@gmail.com",
  phone: "(706) 304-1620",
  location: "Columbus, GA",
  resume: "/Gabe_Kim_Resume.pdf",
};

export const SUMMARY =
  "Results-driven Full Stack Java Developer with 8+ years of experience designing, developing, and modernizing enterprise software across telecommunications, healthcare, IoT, AI, blockchain, and cloud environments. Proven ability to modernize legacy systems, build scalable cloud-native applications, automate deployments, and deliver reliable software in Agile environments.";

export const MARQUEE_ITEMS = [
  "Java 17", "Spring Boot", "Microservices", "AWS", "React", "Distributed Systems",
  "Python", "Kafka", "Docker", "Kubernetes", "PostgreSQL", "CI/CD", "gRPC", "TensorFlow",
];

export const SKILLS = [
  { category: "Backend", items: ["Java", "Spring Boot", "Hibernate JPA", "MyBatis", "Python (Django & Spark)", "C / C++"] },
  { category: "Frontend", items: ["React", "Angular (TypeScript)", "JSP", "JavaScript", "jQuery"] },
  { category: "Databases", items: ["MySQL / MariaDB", "PostgreSQL", "Oracle DB", "MS-SQL", "MongoDB", "Redis"] },
  { category: "DevOps & Cloud", items: ["AWS (EC2, RDS, S3, EKS, Route53)", "Docker", "Kubernetes + ArgoCD", "Jenkins", "GitHub Actions"] },
  { category: "Data Engineering", items: ["Kafka", "Hadoop", "Spark", "Hive", "Apache Nifi", "Streamsets"] },
  { category: "Infrastructure", items: ["Tomcat", "Oracle WebLogic", "Cisco Networks (CCNP)", "VMware Harbor", "Linux"] },
];

export const EXPERIENCE = [
  {
    period: "2023 — 2024",
    role: "Java Software Developer",
    company: "Compax Digital",
    type: "Contract",
    location: "Seoul, South Korea",
    bullets: [
      "Integrated enterprise BSS platforms with LG U+ Nerget and StarHub telecommunication systems using Java Spring (JSF & Hibernate JPA) and PostgreSQL.",
      "Managed AWS cloud infrastructure including EC2, RDS, VPC, Route 53, and EKS Kubernetes clusters (GitHub Actions & ArgoCD) supporting production applications.",
      "Configured and maintained Cisco ISR routers, Catalyst switches, and ASA firewalls.",
      "Collaborated with cross-functional teams to deliver enterprise system integrations on schedule.",
    ],
  },
  {
    period: "2023",
    role: "Software Architect",
    company: "CK&B",
    type: "Fixed-term Freelance",
    location: "Seoul, South Korea",
    bullets: [
      "Designed backend architecture for the HiddenTag Global platform serving authentication, community, review, and marketplace services.",
      "Developed RESTful APIs and database architecture using Spring Boot, Hibernate JPA, MyBatis, and MySQL.",
      "Migrated application deployment from traditional Tomcat servers to Docker-based containerized infrastructure on AWS.",
      "Successfully supported the production launch of the HiddenTag Global platform.",
    ],
  },
  {
    period: "2022 — 2023",
    role: "Application Architect",
    company: "LG CNS",
    type: "Contract",
    location: "Seoul, South Korea",
    bullets: [
      "Modernized the SEHATI Bahrain National Health Insurance System on AWS: JDK 7 → 8, Tomcat 7 → 9, Oracle RDS 12c → 19c.",
      "Built CI/CD pipelines and automated deployments in a GitOps / ArgoCD Kubernetes system for the Next Generation GS Postbox system.",
      "Automated deployments with Jenkins for the LG U+ Digital Catalog system on the Adobe AEM framework via custom Maven profiles.",
      "Managed and deployed interface services (MCI / FEP / EAI service mesh) for Shinhan Bank's The Next Project.",
      "Developed Java Batch services in MyBatis for the next-generation Korean social security information system.",
    ],
  },
  {
    period: "2021 — 2022",
    role: "Software Developer",
    company: "BFLabs",
    type: "Contract",
    location: "Seoul, South Korea",
    bullets: [
      "Developed an integrated REST API gateway server in Java Spring for the Middleblock blockchain platform (Hyperledger Indy, Aries & Fabric).",
      "Designed and implemented the big data warehouse infrastructure and monitoring platform for the Yeosu Data Flagship project using Hadoop, Spark, Hive, Django, and React.",
    ],
  },
  {
    period: "2020 — 2021",
    role: "Software Developer",
    company: "SIOT InfoTech",
    type: "Contract",
    location: "Seoul, South Korea",
    bullets: [
      "Migrated the main Sensor Gateway backend from Go to Java Spring (TCP/IP socket, gRPC, REST API) and implemented Kafka-based data pipelines.",
      "Upgraded Kafka pipelines with Apache Nifi and Streamsets; built the Goseong & Sacheon tourist sensor IoT dashboard (React, Java Spring, MariaDB).",
      "Managed Docker-based AWS production environments supporting multiple customer applications.",
    ],
  },
  {
    period: "2019 — 2020",
    role: "Software Developer",
    company: "MasonIntelligence",
    type: "Startup Contract",
    location: "Seoul, South Korea",
    bullets: [
      "Modernized the M-STT (Speech-to-Text) application with Spring Boot and a customized JSP frontend.",
      "Containerized Deepgram AI applications (M-STT, M-BOT, M-MIC) for on-premises deployments with Docker Compose and a private VMware Harbor registry.",
    ],
  },
  {
    period: "2018 — 2019",
    role: "AI Software Developer",
    company: "MICUBE Solution",
    type: "Contract",
    location: "Seoul, South Korea",
    bullets: [
      "Developed the MICUBE AI Visualization Tool dashboard for a KISA government project using Java Spring, Angular, and Python.",
      "Built predictive equipment maintenance applications for Daeduk Electronics with a TensorFlow RMSE model on vibration sensor data.",
      "Developed a computer-vision rock detection application for Hyundai Chungju Biocenter using TensorFlow Mask R-CNN.",
      "Managed Hadoop, Kafka, Ambari, and Linux server infrastructure.",
    ],
  },
];

export const PROJECTS = [
  {
    id: "hiddentag",
    title: "HiddenTag Global Platform",
    company: "CK&B",
    category: "Blockchain & Security",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?crop=entropy&cs=srgb&fm=jpg&q=85",
    description: "Designed backend architecture for a global authentication, community, review, and marketplace platform. Built RESTful APIs and the database layer, then migrated deployment from Tomcat to Docker-based containers on AWS for the production launch.",
    tech: ["Spring Boot", "Hibernate JPA", "MyBatis", "MySQL", "Docker", "AWS"],
  },
  {
    id: "gspostbox",
    title: "Next Generation GS Postbox System",
    company: "LG CNS",
    category: "Logistics & Cloud",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?crop=entropy&cs=srgb&fm=jpg&q=85",
    description: "Developed the CI/CD pipeline and automated deployments in a GitOps / ArgoCD Kubernetes system for the next-generation GS Postbox platform.",
    tech: ["GitOps", "ArgoCD", "Kubernetes"],
  },
  {
    id: "lguplus",
    title: "LG U+ Digital Catalog System",
    company: "LG CNS",
    category: "Telecom Systems",
    image: "https://images.pexels.com/photos/37730211/pexels-photo-37730211.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    description: "Built CI/CD pipelines and automated deployments using Jenkins for the LG U+ digital catalog system on the Adobe AEM framework, via custom Maven profiles.",
    tech: ["Jenkins", "Adobe AEM", "Maven"],
  },
  {
    id: "shinhanbank",
    title: "Shinhan Bank — The Next Project",
    company: "LG CNS",
    category: "Core Banking",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85",
    description: "Managed and deployed interface services (MCI / FEP / EAI service mesh) for Shinhan Bank's next-generation internal management system.",
    tech: ["MCI", "FEP", "EAI Service Mesh"],
  },
  {
    id: "korean-social-security",
    title: "Korean Social Security Information System",
    company: "LG CNS",
    category: "Public Sector",
    image: "https://images.unsplash.com/photo-1686061593213-98dad7c599b9?crop=entropy&cs=srgb&fm=jpg&q=85",
    description: "Developed Java Batch services in MyBatis for the next-generation Korean social security information system.",
    tech: ["Java Batch", "MyBatis"],
  },
  {
    id: "middleblock",
    title: "Middleblock Blockchain Platform",
    company: "BFLabs",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=srgb&fm=jpg&q=85",
    description: "Developed an integrated REST API gateway server in Java Spring for the Middleblock blockchain platform (Hyperledger Indy, Aries & Fabric) for easy integration with customer applications.",
    tech: ["Java Spring", "Hyperledger Indy", "Hyperledger Aries", "Hyperledger Fabric"],
  },
  {
    id: "yeosu-flagship",
    title: "Yeosu Data Flagship Project",
    company: "BFLabs",
    category: "Big Data & Smart City",
    image: "https://images.unsplash.com/photo-1760553120324-d3d2bf53852b?crop=entropy&cs=srgb&fm=jpg&q=85",
    description: "Designed and implemented the big data warehouse infrastructure and monitoring platform, collaborating with the McKinley Rice international engineering team.",
    tech: ["Hadoop", "Spark", "Hive", "Django", "React"],
  },
  {
    id: "sensor-gateway",
    title: "Sensor Gateway Backend Migration",
    company: "SIOT InfoTech",
    category: "IoT Gateway",
    image: "https://images.unsplash.com/photo-1585014165903-6d6c6ebad3e9?crop=entropy&cs=srgb&fm=jpg&q=85",
    description: "Migrated the main sensor gateway backend from Go to Java Spring (TCP/IP socket, gRPC, REST API) and implemented Kafka-based data pipelines for reliability and scalability.",
    tech: ["Go", "Java Spring", "gRPC", "TCP/IP", "Kafka"],
  },
  {
    id: "goseong-sacheon",
    title: "Goseong & Sacheon IoT Dashboard",
    company: "SIOT InfoTech",
    category: "Smart City",
    image: "https://images.unsplash.com/photo-1792328458349-f7dc2d114c82?crop=entropy&cs=srgb&fm=jpg&q=85",
    description: "Developed a tourist sensor IoT dashboard for the Goseong and Sacheon municipalities with real-time telemetry visualization.",
    tech: ["React", "Java Spring", "MariaDB"],
  },
  {
    id: "m-stt",
    title: "M-STT Speech-to-Text Platform",
    company: "MasonIntelligence",
    category: "Voice AI",
    image: "https://images.pexels.com/photos/17483874/pexels-photo-17483874.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    description: "Modernized the M-STT application with Spring Boot and containerized Deepgram AI applications (M-STT, M-BOT, M-MIC) for on-premises customer deployments with a private Harbor registry.",
    tech: ["Spring Boot", "JSP", "Docker", "Docker Compose", "VMware Harbor"],
  },
  {
    id: "micube-ai",
    title: "MICUBE AI Visualization Tool",
    company: "MICUBE Solution",
    category: "AI Analytics",
    image: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?crop=entropy&cs=srgb&fm=jpg&q=85",
    description: "Developed an AI visualization dashboard for a KISA government project with real-time analytics and charting.",
    tech: ["Java Spring", "Angular", "Python"],
  },
  {
    id: "daeduk-pd",
    title: "Daeduk Predictive Maintenance Engine",
    company: "MICUBE Solution",
    category: "Smart Factory & ML",
    image: "https://images.pexels.com/photos/14314636/pexels-photo-14314636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    description: "Built predictive equipment maintenance applications with a TensorFlow RMSE model running on vibration sensor data.",
    tech: ["Angular", "Java Spring", "TensorFlow", "RMSE Model"],
  },
  {
    id: "hyundai-cv",
    title: "Hyundai Computer Vision Rock Detection",
    company: "MICUBE Solution",
    category: "Computer Vision",
    image: "https://images.unsplash.com/photo-1793242217439-20a53fbe62b8?crop=entropy&cs=srgb&fm=jpg&q=85",
    description: "Developed a computer-vision rock detection application for the Hyundai Chungju Biocenter using a TensorFlow Mask R-CNN model.",
    tech: ["Java Spring", "Angular", "Python", "TensorFlow Mask R-CNN"],
  },
];

export const EDUCATION = [
  {
    degree: "Master of Science — Electrical & Computer Engineering",
    school: "Georgia Institute of Technology",
    location: "Atlanta, GA",
    detail: "Focus: Telecommunication and Computer Systems / Software",
  },
  {
    degree: "Bachelor of Science — Electrical Engineering",
    school: "Georgia Institute of Technology",
    location: "Atlanta, GA",
    detail: "",
  },
];

export const CERTIFICATIONS = [
  { name: "Cisco Certified Network Professional (CCNP)", year: "2015" },
  { name: "Fluent in Korean & English", year: "" },
];
