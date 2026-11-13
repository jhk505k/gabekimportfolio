#!/usr/bin/env python3
"""Generate Gabe Kim's resume in EN/KO/ZH as PDF + DOCX.
EN PDF is the user's uploaded file (used as-is). This script regenerates
EN/KO/ZH DOCX and KO/ZH PDF from structured content. Run after content edits."""
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from docx import Document
from docx.shared import Pt, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH

OUT = "/app/frontend/public"
ACCENT = HexColor("#FF5E1A")
DARK = HexColor("#111111")
GREY = HexColor("#444444")

# ---- fonts for KO/ZH PDF ----
FONT_REG = FONT_BOLD = "Helvetica"
def reg_fonts():
    global FONT_REG, FONT_BOLD
    cands = [
        ("/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc", "WQY", 0),
        ("/usr/share/fonts/truetype/noto/NotoSansCJK-Regular.ttc", "NotoCJK", 0),
        ("/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc", "NotoCJK", 0),
        ("/usr/share/fonts/noto-cjk/NotoSansCJK-Regular.ttc", "NotoCJK", 0),
        ("/usr/share/fonts/truetype/nanum/NanumGothic.ttf", "Nanum", None),
        ("/usr/share/fonts/opentype/ipafont-gothic/ipagp.ttf", "IPAG", None),
        ("/usr/share/fonts/truetype/fonts-japanese-gothic.ttf", "IPAG", None),
    ]
    for path, name, idx in cands:
        if os.path.exists(path):
            try:
                if idx is not None:
                    pdfmetrics.registerFont(TTFont(name, path, subfontIndex=idx))
                else:
                    pdfmetrics.registerFont(TTFont(name, path))
                FONT_REG = FONT_BOLD = name
                print("Using font:", name, path)
                return
            except Exception as e:
                print("font fail", path, e)
                continue
    # fallback: DejaVu (covers Latin; CJK may be boxes if no CJK font present)
    dv = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    if os.path.exists(dv):
        pdfmetrics.registerFont(TTFont("DejaVu", dv))
        FONT_REG = FONT_BOLD = "DejaVu"

# ---------------- Content ----------------
HEADER = {
    "en": {"name": "GABE KIM", "title": "Full Stack Java Developer & Founder",
           "contact": "Columbus, GA & Atlanta, GA | 706-304-1620 | jhk505ko@gmail.com | jhk505@gatech.edu",
           "links": "gabekimportfolio.pages.dev | linkedin.com/in/ji-kim-5179495 | github.com/jhk505k"},
    "ko": {"name": "GABE KIM", "title": "풀스택 자바 개발자 & 창업자",
           "contact": "Columbus, GA & Atlanta, GA | 706-304-1620 | jhk505ko@gmail.com | jhk505@gatech.edu",
           "links": "gabekimportfolio.pages.dev | linkedin.com/in/ji-kim-5179495 | github.com/jhk505k"},
    "zh": {"name": "GABE KIM", "title": "全栈 Java 开发工程师 & 创始人",
           "contact": "Columbus, GA & Atlanta, GA | 706-304-1620 | jhk505ko@gmail.com | jhk505@gatech.edu",
           "links": "gabekimportfolio.pages.dev | linkedin.com/in/ji-kim-5179495 | github.com/jhk505k"},
}

SUMMARY = {
    "en": "Results-driven Full Stack Java Developer and Founder with 9+ years of experience designing, developing, and modernizing enterprise software across telecommunications, healthcare, IoT, AI, blockchain, and cloud environments. Proven ability to architect cloud-native applications, automate CI/CD pipelines, modernize legacy systems, and deliver scalable custom software solutions.",
    "ko": "통신, 헬스케어, IoT, AI, 블록체인, 클라우드 환경 전반에서 엔터프라이즈 소프트웨어를 설계·개발·현대화한 9년 이상의 경력을 보유한 성과 중심의 풀스택 자바 개발자이자 창업자입니다. 클라우드 네이티브 애플리케이션 설계, CI/CD 파이프라인 자동화, 레거시 시스템 현대화, 확장 가능한 맞춤형 소프트웨어 솔루션 제공 역량이 입증되었습니다.",
    "zh": "注重结果的全栈 Java 开发工程师兼创始人，拥有 9 年以上在电信、医疗、物联网、人工智能、区块链和云环境中设计、开发和现代化企业级软件的经验。在云原生应用架构、CI/CD 流水线自动化、遗留系统现代化和交付可扩展定制软件解决方案方面经验丰富。",
}

SECTIONS = {
    "en": {"summary": "SUMMARY", "skills": "TECHNICAL SKILLS", "exp": "EXPERIENCE", "edu": "EDUCATION", "cert": "CERTIFICATIONS & LANGUAGES"},
    "ko": {"summary": "요약", "skills": "기술 스킬", "exp": "경력", "edu": "학력", "cert": "자격증 및 언어"},
    "zh": {"summary": "概述", "skills": "技术技能", "exp": "工作经历", "edu": "教育背景", "cert": "证书与语言"},
}

SKILLS = [
    ("Backend", "Java, Spring Boot, Hibernate JPA, MyBatis, Python (Django & Spark), C/C++"),
    ("Frontend", "React, Angular (TypeScript), JSP, JavaScript, jQuery"),
    ("Databases", "MySQL/MariaDB, PostgreSQL, Oracle DB, MS-SQL, MongoDB, Redis"),
    ("DevOps & Cloud", "AWS (EC2, RDS, S3, Route53, CloudFront, Lambda, EKS & ECS, Load Balancer), Cloudflare Pages/Edge, Docker, Kubernetes + ArgoCD, Jenkins, GitHub Actions"),
    ("Data Engineering", "Kafka, Hadoop, Spark, Hive, Apache Nifi, Streamsets"),
    ("Infrastructure", "Tomcat, Oracle WebLogic, Cisco Networks (CCNP), VMware Harbor, Linux"),
]

# (role, company_type, period, location, [bullets]) per language
EXPERIENCE = {
    "en": [
        ("Founder GSLab — GSLAB LLC · Self-employed", "", "2025 – Present", "Atlanta, GA · Remote", [
            "Founded GSLAB LLC to design, architect, and deploy custom web applications, cloud infrastructure, and automation systems tailored for small business owners and growing enterprises.",
            "Engineer full-stack web applications and internal business tools combining custom backend logic (Java Spring Boot, Python, PostgreSQL, REST APIs) with modern frontend frameworks and AI-assisted platforms.",
            "Architect high-availability cloud and edge deployment pipelines utilizing AWS (EC2, RDS), Cloudflare Pages/Edge, Docker, and automated CI/CD workflows.",
            "Partner directly with business owners to replace manual operational workflows with scalable, custom-built software solutions.",
        ]),
        ("Java Software Developer — Compax Digital", "", "2023 – 2024", "Seoul, South Korea", [
            "Integrated enterprise BSS platforms with LG U+ Nerget and StarHub telecommunication systems using Java Spring (JSF & Hibernate JPA) and PostgreSQL.",
            "Managed AWS cloud infrastructure including EC2, RDS, VPC, Route 53, and EKS Kubernetes clusters (GitHub Actions & ArgoCD) supporting production applications.",
            "Configured and maintained Cisco ISR routers, Catalyst switches, and ASA firewalls.",
            "Collaborated with cross-functional teams to deliver enterprise system integrations on schedule.",
        ]),
        ("Software Architect — CK&B", "", "2023", "Seoul, South Korea", [
            "Designed backend architecture for the Hidden Tag Global platform serving authentication, community, review, and marketplace services.",
            "Developed RESTful APIs and database architecture using Spring Boot, Hibernate JPA, MyBatis, and MySQL.",
            "Migrated application deployment from traditional Tomcat servers to Docker-based containerized infrastructure on AWS.",
            "Successfully supported the production launch of the Hidden Tag Global platform.",
        ]),
        ("Application Architect — LG CNS", "", "2022 – 2023", "Seoul, South Korea", [
            "Modernized the SEHATI Bahrain National Health Insurance System on AWS: JDK 7 to 8, Tomcat 7 to 9, Oracle RDS 12c to 19c.",
            "Built CI/CD pipelines and automated deployments in a GitOps / ArgoCD Kubernetes system for the Next Generation GS Postbox system.",
            "Automated deployments with Jenkins for the LG U+ Digital Catalog system on the Adobe AEM framework via custom Maven profiles.",
            "Managed and deployed interface services (MCI/FEP/EAI service mesh) for Shinhan Bank's The Next Project.",
            "Developed Java Batch services in MyBatis for the next-generation Korean social security information system.",
        ]),
        ("Software Developer — BFLabs", "", "2021 – 2022", "Seoul, South Korea", [
            "Developed an integrated REST API gateway server in Java Spring for the Middleblock blockchain platform (Hyperledger Indy, Aries & Fabric).",
            "Designed and implemented the big data warehouse infrastructure and monitoring platform for the Yeosu Data Flagship project using Hadoop, Spark, Hive, Django, and React.",
        ]),
        ("Software Developer — SIOT InfoTech", "", "2020 – 2021", "Seoul, South Korea", [
            "Migrated the main Sensor Gateway backend from Go to Java Spring (TCP/IP socket, gRPC, REST API) and implemented Kafka-based data pipelines.",
            "Upgraded Kafka pipelines with Apache Nifi and Streamsets; built the Goseong & Sacheon tourist sensor IoT dashboard (React, Java Spring, MariaDB).",
            "Managed Docker-based AWS production environments supporting multiple customer applications.",
        ]),
        ("AI Software Developer — MICUBE Solution", "", "2018 – 2019", "Seoul, South Korea", [
            "Developed the MICUBE AI Visualization Tool dashboard for a KISA government project using Java Spring, Angular, and Python.",
            "Built predictive equipment maintenance applications for Daeduk Electronics with a TensorFlow RMSE model on vibration sensor data.",
            "Developed a computer-vision rock detection application for Hyundai Chungju Biocenter using TensorFlow Mask R-CNN.",
            "Managed Hadoop, Kafka, Ambari, and Linux server infrastructure.",
        ]),
        ("Career Break — Family Care & Reskilling — Independent Study", "", "2015 – 2017", "Georgia, USA", [
            "Took a career break to care for a family member diagnosed with cancer.",
            "During this period, studied software development and network engineering, earning the Cisco CCNP certification to pursue network engineering before returning to software engineering.",
        ]),
        ("Software Developer — General Motors · Full-time", "", "2013 – 2014", "Atlanta, GA", [
            "Developed and improved the North America Order Workbench (NAOWB) — GM's car POS application for dealerships — using J2EE, JavaScript, and CSS.",
            "Completed the NAOWB Browser Agnostic project, modernizing the application to run on Chrome, Firefox and IE11 (previously IE9-only) through JSP and JavaScript improvements plus J2EE backend performance tuning.",
            "Set up, managed and deployed the NAOWB application to WebLogic test environments on SUSE Enterprise Linux; managed Oracle 11g and IBM DB2 connections, DNS / DHCP / LDAP configuration, and wrote shell scripts to automate test deployments by pulling from the Artifactory repository via cron jobs.",
            "Supported Oracle Database migration from the Ingres database.",
        ]),
        ("IT Intern - Phantom Work Research Assistant — Boeing", "", "2012", "Seattle, WA", [
            "Set up Linux test bed servers for Phantom Works network research.",
            "Supported the Common Open Research Emulator (CORE) application development project in conjunction with the NRL Networks and Communication Systems Branch.",
            "Supported initial integration of NS3 and CORE using C++, and created scripts to automate testing.",
            "Replaced CORE nodes with NS3 nodes and investigated the viability of integrating NS3 with CORE by measuring throughput, packet loss, latency, CPU and memory usage.",
        ]),
    ],
    "ko": [
        ("창업자 GSLab — GSLAB LLC · 자영업", "", "2025 – 현재", "Atlanta, GA · 원격", [
            "소기업 사업주와 성장하는 기업을 위해 맞춤형 웹 애플리케이션, 클라우드 인프라, 자동화 시스템을 설계·구축·배포하는 GSLAB LLC를 창업했습니다.",
            "커스텀 백엔드 로직(Java Spring Boot, Python, PostgreSQL, REST API)과 모던 프론트엔드 프레임워크, AI 지원 플랫폼을 결합한 풀스택 웹 애플리케이션과 내부 비즈니스 도구를 엔지니어링합니다.",
            "AWS(EC2, RDS), Cloudflare Pages/Edge, Docker, 자동화된 CI/CD 워크플로우를 활용한 고가용성 클라우드 및 엣지 배포 파이프라인을 설계합니다.",
            "사업주와 직접 협력하여 수동 운영 워크플로우를 확장 가능한 맞춤형 소프트웨어 솔루션으로 전환합니다.",
        ]),
        ("자바 소프트웨어 개발자 — Compax Digital", "", "2023 – 2024", "서울, 대한민국", [
            "Java Spring(JSF & Hibernate JPA)과 PostgreSQL을 사용하여 LG U+ Nerget 및 StarHub 통신 시스템과 엔터프라이즈 BSS 플랫폼을 통합했습니다.",
            "EC2, RDS, VPC, Route 53 및 EKS Kubernetes 클러스터(GitHub Actions & ArgoCD)를 포함한 AWS 클라우드 인프라를 운영하며 운영 환경 애플리케이션을 지원했습니다.",
            "Cisco ISR 라우터, Catalyst 스위치, ASA 방화벽을 구성하고 유지 관리했습니다.",
            "교차 기능 팀과 협업하여 엔터프라이즈 시스템 통합을 일정에 맞춰 제공했습니다.",
        ]),
        ("소프트웨어 아키텍트 — CK&B", "", "2023", "서울, 대한민국", [
            "인증, 커뮤니티, 리뷰, 마켓플레이스 서비스를 제공하는 Hidden Tag Global 플랫폼의 백엔드 아키텍처를 설계했습니다.",
            "Spring Boot, Hibernate JPA, MyBatis, MySQL을 사용하여 RESTful API와 데이터베이스 아키텍처를 개발했습니다.",
            "애플리케이션 배포를 기존 Tomcat 서버에서 AWS의 Docker 기반 컨테이너 인프라로 마이그레이션했습니다.",
            "Hidden Tag Global 플랫폼의 성공적인 운영 출시를 지원했습니다.",
        ]),
        ("애플리케이션 아키텍트 — LG CNS", "", "2022 – 2023", "서울, 대한민국", [
            "AWS에서 SEHATI 바레인 국가건강보험 시스템을 현대화: JDK 7 → 8, Tomcat 7 → 9, Oracle RDS 12c → 19c.",
            "차세대 GS Postbox 시스템을 위해 GitOps / ArgoCD Kubernetes 환경에서 CI/CD 파이프라인과 배포 자동화를 구축했습니다.",
            "Adobe AEM 프레임워크 기반 LG U+ 디지털 카탈로그 시스템에 커스텀 Maven 프로필로 Jenkins 배포 자동화를 구현했습니다.",
            "신한은행 The Next Project의 인터페이스 서비스(MCI / FEP / EAI 서비스 메시)를 관리·배포했습니다.",
            "차세대 한국 사회보장정보 시스템을 위한 MyBatis 기반 Java Batch 서비스를 개발했습니다.",
        ]),
        ("소프트웨어 개발자 — BFLabs", "", "2021 – 2022", "서울, 대한민국", [
            "Middleblock 블록체인 플랫폼(Hyperledger Indy, Aries & Fabric)을 위한 Java Spring 통합 REST API 게이트웨이 서버를 개발했습니다.",
            "Hadoop, Spark, Hive, Django, React를 사용하여 여수 데이터 플래그십 프로젝트의 빅데이터 웨어하우스 인프라와 모니터링 플랫폼을 설계·구현했습니다.",
        ]),
        ("소프트웨어 개발자 — SIOT InfoTech", "", "2020 – 2021", "서울, 대한민국", [
            "메인 센서 게이트웨이 백엔드를 Go에서 Java Spring(TCP/IP 소켓, gRPC, REST API)으로 마이그레이션하고 Kafka 기반 데이터 파이프라인을 구현했습니다.",
            "Apache Nifi와 Streamsets로 Kafka 파이프라인을 업그레이드하고, 고성 & 사천 관광 센서 IoT 대시보드(React, Java Spring, MariaDB)를 구축했습니다.",
            "여러 고객 애플리케이션을 지원하는 Docker 기반 AWS 운영 환경을 관리했습니다.",
        ]),
        ("AI 소프트웨어 개발자 — MICUBE Solution", "", "2018 – 2019", "서울, 대한민국", [
            "Java Spring, Angular, Python을 사용하여 KISA 정부 프로젝트용 MICUBE AI 시각화 도구 대시보드를 개발했습니다.",
            "진동 센서 데이터에 TensorFlow RMSE 모델을 적용해 대덕전자의 설비 예지보전 애플리케이션을 구축했습니다.",
            "TensorFlow Mask R-CNN을 사용하여 현대 충주 바이오센터의 컴퓨터 비전 암석 감지 애플리케이션을 개발했습니다.",
            "Hadoop, Kafka, Ambari, Linux 서버 인프라를 관리했습니다.",
        ]),
        ("경력 공백 — 가족 돌봄 및 재교육 — Independent Study", "", "2015 – 2017", "Georgia, USA", [
            "암 진단을 받은 가족을 돌보기 위해 경력 공백기를 가졌습니다.",
            "이 기간 동안 소프트웨어 개발과 네트워크 엔지니어링을 공부하며 Cisco CCNP 자격증을 취득하여 네트워크 엔지니어를 준비했고, 이후 소프트웨어 엔지니어링으로 복귀했습니다.",
        ]),
        ("소프트웨어 개발자 — General Motors · 정규직", "", "2013 – 2014", "Atlanta, GA", [
            "J2EE, JavaScript, CSS를 사용하여 GM의 딜러십용 자동차 POS 애플리케이션인 북미 주문 워크벤치(NAOWB)를 개발·개선했습니다.",
            "NAOWB 브라우저 독립 프로젝트를 완수하여 JSP와 JavaScript 개선 및 J2EE 백엔드 성능 향상을 통해 애플리케이션을 IE9 전용에서 Chrome, Firefox, IE11 등 모던 브라우저에서 실행되도록 현대화했습니다.",
            "SUSE Enterprise Linux 서버의 WebLogic 테스트 환경에 NAOWB 애플리케이션을 구축·관리·배포하고, Oracle 11g와 IBM DB2 데이터베이스 연결, DNS / DHCP / LDAP 구성을 관리했으며, cron job으로 Artifactory 저장소에서 빌드를 가져와 테스트 환경 배포를 자동화하는 셸 스크립트를 작성했습니다.",
            "Ingres 데이터베이스에서 Oracle 데이터베이스 마이그레이션을 지원했습니다.",
        ]),
        ("IT 인턴 - Phantom Work 리서치 어시스턴트 — Boeing", "", "2012", "Seattle, WA", [
            "Phantom Works 네트워크 연구를 위한 Linux 테스트베드 서버를 구축했습니다.",
            "NRL Networks and Communication Systems Branch와 협력하여 Common Open Research Emulator (CORE) 애플리케이션 개발 프로젝트를 지원했습니다.",
            "C++를 사용한 NS3와 CORE의 초기 통합을 지원하고 테스트를 자동화하는 스크립트를 작성했습니다.",
            "CORE 노드를 NS3 노드로 교체하고 처리량, 패킷 손실, 지연 시간, CPU 및 메모리 사용량을 측정하여 NS3와 CORE 통합의 타당성을 조사했습니다.",
        ]),
    ],
    "zh": [
        ("创始人 GSLab — GSLAB LLC · 自雇", "", "2025 – 至今", "Atlanta, GA · 远程", [
            "创立 GSLAB LLC，为小企业主和成长中的企业设计、架构和部署定制 Web 应用、云基础设施和自动化系统。",
            "工程化全栈 Web 应用和内部业务工具，将定制后端逻辑（Java Spring Boot、Python、PostgreSQL、REST API）与现代前端框架和 AI 辅助平台相结合。",
            "利用 AWS（EC2、RDS）、Cloudflare Pages/Edge、Docker 和自动化 CI/CD 工作流，构建高可用云和边缘部署流水线。",
            "与企业主直接合作，用可扩展的定制软件解决方案取代人工运营工作流。",
        ]),
        ("Java 软件开发工程师 — Compax Digital", "", "2023 – 2024", "韩国首尔", [
            "使用 Java Spring（JSF 与 Hibernate JPA）和 PostgreSQL，将企业 BSS 平台与 LG U+ Nerget 和 StarHub 电信系统集成。",
            "管理 AWS 云基础设施，包括 EC2、RDS、VPC、Route 53 以及 EKS Kubernetes 集群（GitHub Actions 与 ArgoCD），支持生产应用运行。",
            "配置并维护 Cisco ISR 路由器、Catalyst 交换机和 ASA 防火墙。",
            "与跨职能团队协作，按时交付企业系统集成项目。",
        ]),
        ("软件架构师 — CK&B", "", "2023", "韩国首尔", [
            "为提供认证、社区、评论和市场服务的 Hidden Tag Global 平台设计后端架构。",
            "使用 Spring Boot、Hibernate JPA、MyBatis 和 MySQL 开发 RESTful API 和数据库架构。",
            "将应用部署从传统 Tomcat 服务器迁移至 AWS 上的 Docker 容器化基础设施。",
            "成功支持 Hidden Tag Global 平台的生产上线。",
        ]),
        ("应用架构师 — LG CNS", "", "2022 – 2023", "韩国首尔", [
            "在 AWS 上完成 SEHATI 巴林国家健康保险系统现代化：JDK 7 → 8、Tomcat 7 → 9、Oracle RDS 12c → 19c。",
            "为新一代 GS Postbox 系统在 GitOps / ArgoCD Kubernetes 环境中构建 CI/CD 流水线和自动化部署。",
            "通过自定义 Maven 配置文件，为基于 Adobe AEM 框架的 LG U+ 数字目录系统实现 Jenkins 自动化部署。",
            "管理并部署新韩银行 The Next Project 的接口服务（MCI / FEP / EAI 服务网格）。",
            "为新一代韩国社会保障信息系统开发基于 MyBatis 的 Java Batch 服务。",
        ]),
        ("软件开发工程师 — BFLabs", "", "2021 – 2022", "韩国首尔", [
            "为 Middleblock 区块链平台（Hyperledger Indy、Aries 与 Fabric）开发 Java Spring 集成 REST API 网关服务器。",
            "使用 Hadoop、Spark、Hive、Django 和 React，设计并实现丽水数据旗舰项目的大数据仓库基础设施和监控平台。",
        ]),
        ("软件开发工程师 — SIOT InfoTech", "", "2020 – 2021", "韩国首尔", [
            "将主传感器网关后端从 Go 迁移至 Java Spring（TCP/IP socket、gRPC、REST API），并实现基于 Kafka 的数据管道。",
            "使用 Apache Nifi 和 Streamsets 升级 Kafka 管道；构建高城与泗川旅游传感器 IoT 仪表盘（React、Java Spring、MariaDB）。",
            "管理支持多个客户应用的 Docker 化 AWS 生产环境。",
        ]),
        ("AI 软件开发工程师 — MICUBE Solution", "", "2018 – 2019", "韩国首尔", [
            "使用 Java Spring、Angular 和 Python 为 KISA 政府项目开发 MICUBE AI 可视化工具仪表盘。",
            "基于振动传感器数据，使用 TensorFlow RMSE 模型为大德电子构建设备预测性维护应用。",
            "使用 TensorFlow Mask R-CNN 为现代忠州生物中心开发计算机视觉岩石检测应用。",
            "管理 Hadoop、Kafka、Ambari 和 Linux 服务器基础设施。",
        ]),
        ("职业间歇 — 照顾家人与技能提升 — Independent Study", "", "2015 – 2017", "美国佐治亚州", [
            "因家人确诊癌症而暂别职场，专心照顾家人。",
            "在此期间学习软件开发和网络工程，考取了 Cisco CCNP 认证以转向网络工程师，之后重返软件工程领域。",
        ]),
        ("软件开发工程师 — General Motors · 全职", "", "2013 – 2014", "Atlanta, GA", [
            "使用 J2EE、JavaScript 和 CSS 开发并改进通用汽车经销商汽车 POS 应用——北美订单工作台（NAOWB）。",
            "完成 NAOWB 浏览器无关化项目，通过 JSP 和 JavaScript 改进及 J2EE 后端性能调优，将应用从仅支持 IE9 现代化为可在 Chrome、Firefox 和 IE11 上运行。",
            "在 SUSE Enterprise Linux 服务器上搭建、管理并部署 NAOWB 应用至 WebLogic 测试环境；管理 Oracle 11g 和 IBM DB2 数据库连接、DNS / DHCP / LDAP 配置，并编写 shell 脚本通过 cron 作业从 Artifactory 仓库拉取构建以自动化测试环境部署。",
            "支持从 Ingres 数据库到 Oracle 数据库的迁移。",
        ]),
        ("IT 实习生 - Phantom Work 研究助理 — Boeing", "", "2012", "Seattle, WA", [
            "为 Phantom Works 网络研究搭建 Linux 测试平台服务器。",
            "与 NRL 网络与通信系统分部合作，支持 Common Open Research Emulator (CORE) 应用开发项目。",
            "使用 C++ 支持 NS3 与 CORE 的初步集成，并编写脚本实现测试自动化。",
            "将 CORE 节点替换为 NS3 节点，通过测量吞吐量、丢包率、延迟、CPU 和内存使用情况，研究 NS3 与 CORE 集成的可行性。",
        ]),
    ],
}

EDUCATION = {
    "en": [("M.S. Electrical & Computer Engineering — Georgia Institute of Technology, Atlanta, GA", "Focus: Telecommunication and Computer Systems / Software"),
           ("B.S. Electrical Engineering — Georgia Institute of Technology, Atlanta, GA", "")],
    "ko": [("전기·컴퓨터공학 석사 — Georgia Institute of Technology, Atlanta, GA", "전공: 통신 및 컴퓨터 시스템 / 소프트웨어"),
           ("전기공학 학사 — Georgia Institute of Technology, Atlanta, GA", "")],
    "zh": [("电气与计算机工程硕士 — Georgia Institute of Technology, Atlanta, GA", "方向：电信与计算机系统 / 软件"),
           ("电气工程学士 — Georgia Institute of Technology, Atlanta, GA", "")],
}

CERTS = [
    "Microsoft Specialist: Programming in C# — Microsoft, ID 701ACF-A13055, earned May 2015",
    "Microsoft Certified Solutions Expert: Private Cloud — Microsoft, ID 35KEB5-7386CA, earned Apr 2013, inactive",
    "MCSA: Windows Server 2012 (Charter Member) — Microsoft, ID D60814-988F4Q, earned Mar 2013, inactive",
    "CCNP Routing and Switching — Cisco, ID CSCO12143672, earned Jan 2015, expired Jan 2018",
    "CCNA Routing and Switching — Cisco, ID CSCO12143672, earned Feb 2013, expired Jan 2018",
    "CompTIA Security+ ce — CompTIA, ID COMP001020382835, earned Sep 2015, expired Sep 2018",
    "CompTIA Network+ ce — CompTIA, ID COMP001020382835, earned Mar 2012, expired Mar 2015",
]
LANG_LINE = {"en": "Languages: Fluent in Korean and English",
             "ko": "언어: 한국어 및 영어 능통",
             "zh": "语言：精通韩语和英语"}

# ---------------- PDF builder ----------------
def build_pdf(lang):
    path = f"{OUT}/Gabe_Kim_Resume_{lang.upper()}.pdf"
    c = canvas.Canvas(path, pagesize=letter)
    W, H = letter
    M = 0.75 * inch
    y = H - M
    maxw = int((W - 2 * M) / 4.6)

    def ensure(n):
        nonlocal y
        if y < M + n:
            c.showPage(); y = H - M

    def wrap(t, font, size):
        words = t.split(" ")
        lines, cur = [], ""
        for w in words:
            trial = (cur + " " + w).strip()
            if pdfmetrics.stringWidth(trial, font, size) <= (W - 2 * M):
                cur = trial
            else:
                if cur: lines.append(cur)
                cur = w
        if cur: lines.append(cur)
        return lines or [""]

    def text(t, size, font, color, gap):
        nonlocal y
        for ln in wrap(t, font, size):
            ensure(gap)
            c.setFont(font, size); c.setFillColor(color)
            c.drawString(M, y, ln); y -= gap

    hd = HEADER[lang]; sc = SECTIONS[lang]
    text(hd["name"], 20, FONT_BOLD, ACCENT, 26)
    text(hd["title"], 11.5, FONT_BOLD, DARK, 15)
    text(hd["contact"], 8.5, FONT_REG, GREY, 12)
    text(hd["links"], 8.5, FONT_REG, GREY, 16)

    text(sc["summary"], 10.5, FONT_BOLD, ACCENT, 14)
    text(SUMMARY[lang], 9, FONT_REG, GREY, 12); y -= 6

    text(sc["skills"], 10.5, FONT_BOLD, ACCENT, 14)
    for cat, items in SKILLS:
        text(f"{cat}: {items}", 8.5, FONT_REG, GREY, 11.5)
    y -= 6

    text(sc["exp"], 10.5, FONT_BOLD, ACCENT, 14)
    for role, _t, period, loc, bullets in EXPERIENCE[lang]:
        ensure(40)
        text(f"{role}   {period}", 9.5, FONT_BOLD, DARK, 13)
        text(loc, 8, FONT_REG, GREY, 11)
        for b in bullets:
            text("• " + b, 8.5, FONT_REG, GREY, 11)
        y -= 5

    text(sc["edu"], 10.5, FONT_BOLD, ACCENT, 14)
    for deg, det in EDUCATION[lang]:
        text(deg, 9, FONT_BOLD, DARK, 12)
        if det: text(det, 8.5, FONT_REG, GREY, 11)
    y -= 5

    text(sc["cert"], 10.5, FONT_BOLD, ACCENT, 14)
    for cert in CERTS:
        text("• " + cert, 8.5, FONT_REG, GREY, 11)
    text(LANG_LINE[lang], 8.5, FONT_REG, GREY, 11)

    c.save()
    return path

# ---------------- DOCX builder ----------------
def build_docx(lang):
    path = f"{OUT}/Gabe_Kim_Resume_{lang.upper()}.docx"
    doc = Document()
    style = doc.styles["Normal"]
    style.font.name = "Calibri"
    style.font.size = Pt(10)

    def add(t, size=10, bold=False, color=None, space_after=4, align=None):
        p = doc.add_paragraph()
        if align: p.alignment = align
        r = p.add_run(t)
        r.bold = bold
        r.font.size = Pt(size)
        if color: r.font.color.rgb = color
        p.paragraph_format.space_after = Pt(space_after)
        return p

    hd = HEADER[lang]; sc = SECTIONS[lang]
    orange = RGBColor(0xFF, 0x5E, 0x1A)
    add(hd["name"], 20, True, orange, 2)
    add(hd["title"], 12, True, None, 2)
    add(hd["contact"], 8.5, False, None, 1)
    add(hd["links"], 8.5, False, None, 8)

    add(sc["summary"], 11, True, orange, 3)
    add(SUMMARY[lang], 9.5, False, None, 8)

    add(sc["skills"], 11, True, orange, 3)
    for cat, items in SKILLS:
        p = doc.add_paragraph()
        r1 = p.add_run(f"{cat}: "); r1.bold = True; r1.font.size = Pt(9.5)
        r2 = p.add_run(items); r2.font.size = Pt(9.5)
        p.paragraph_format.space_after = Pt(2)
    doc.add_paragraph()

    add(sc["exp"], 11, True, orange, 3)
    for role, _t, period, loc, bullets in EXPERIENCE[lang]:
        p = doc.add_paragraph()
        r1 = p.add_run(role); r1.bold = True; r1.font.size = Pt(10)
        r2 = p.add_run(f"   {period}"); r2.font.size = Pt(9)
        p.paragraph_format.space_after = Pt(1)
        add(loc, 8.5, False, None, 2)
        for b in bullets:
            bp = doc.add_paragraph(b, style="List Bullet")
            bp.paragraph_format.space_after = Pt(1)
            for r in bp.runs: r.font.size = Pt(9.5)
        doc.add_paragraph()

    add(sc["edu"], 11, True, orange, 3)
    for deg, det in EDUCATION[lang]:
        add(deg, 10, True, None, 1)
        if det: add(det, 9, False, None, 3)

    add(sc["cert"], 11, True, orange, 3)
    for cert in CERTS:
        bp = doc.add_paragraph(cert, style="List Bullet")
        bp.paragraph_format.space_after = Pt(1)
        for r in bp.runs: r.font.size = Pt(9)
    add(LANG_LINE[lang], 9.5, False, None, 0)

    doc.save(path)
    return path

if __name__ == "__main__":
    reg_fonts()
    for lang in ["en", "ko", "zh"]:
        d = build_docx(lang)
        print("docx:", os.path.basename(d), os.path.getsize(d), "bytes")
        if lang != "en":
            p = build_pdf(lang)
            print("pdf :", os.path.basename(p), os.path.getsize(p), "bytes")
    print("EN pdf = user's uploaded file (unchanged)")
