import { StaticServiceData } from "../types/service";

export const servicesData: StaticServiceData[] = [
  {
    id: 1,
    category: "marketing",
    title: {
      en: "Marketing Strategies",
      ar: "استراتيجيات التسويق",
    },
    smallDesc: {
      en: "Marketing strategies are a comprehensive plan that aims to identify the target audience, develop products, and choose the appropriate channels to increase brand awareness and achieve sales goals.",
      ar: "استراتيجيات التسويق هي خطة شاملة تهدف إلى تحديد الجمهور المستهدف، وتطوير المنتجات، واختيار القنوات المناسبة لزيادة الوعي بالعلامة التجارية وتحقيق أهداف المبيعات.",
    },
    description: {
      en: "We develop detailed marketing strategies tailored to your business goals, helping you effectively position your brand in the market, drive engagement, and maximize ROI.",
      ar: "نقوم بتطوير استراتيجيات تسويقية مفصلة تتماشى مع أهداف عملك، لمساعدتك في وضع علامتك التجارية بفعالية في السوق، وتعزيز التفاعل، وتحقيق أعلى عائد استثماري.",
    },
    benefits: {
      en: [
        "Targeted audience reach",
        "Increased brand visibility",
        "Improved conversion rates",
      ],
      ar: [
        "الوصول للجمهور المستهدف",
        "زيادة وضوح العلامة التجارية",
        "تحسين معدلات التحويل",
      ],
    },
    features: {
      en: [
        "Data-driven planning",
        "Multi-channel approach",
        "Customized campaigns",
      ],
      ar: ["تخطيط قائم على البيانات", "نهج متعدد القنوات", "حملات مخصصة"],
    },
    targetAudience: {
      en: "Startups, SMEs, and large enterprises",
      ar: "الشركات الناشئة، والشركات الصغيرة والمتوسطة، والمؤسسات الكبرى",
    },
    slug: "marketing-strategies",
    imgsrc: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    fullImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80",
    stats: [
      {
        label: { en: "ROI Increase", ar: "زيادة العائد" },
        value: "+340%",
        icon: "trending",
      },
      {
        label: { en: "Clients Served", ar: "عملاء تم خدمتهم" },
        value: "250+",
        icon: "users",
      },
      {
        label: { en: "Success Rate", ar: "معدل النجاح" },
        value: "98%",
        icon: "check",
      },
    ],
    processSteps: [
      {
        title: { en: "Discovery & Research", ar: "الاكتشاف والبحث" },
        description: {
          en: "We analyze your market, competitors, and target audience to identify opportunities.",
          ar: "نحلل سوقك ومنافسيك وجمهورك المستهدف لتحديد الفرص.",
        },
        icon: "search",
      },
      {
        title: { en: "Strategy Development", ar: "تطوير الاستراتيجية" },
        description: {
          en: "We craft a tailored marketing strategy aligned with your business goals.",
          ar: "نصمم استراتيجية تسويقية مخصصة تتماشى مع أهداف عملك.",
        },
        icon: "plan",
      },
      {
        title: { en: "Implementation", ar: "التنفيذ" },
        description: {
          en: "We execute the strategy across chosen channels with precision.",
          ar: "ننفذ الاستراتيجية عبر القنوات المختارة بدقة.",
        },
        icon: "launch",
      },
      {
        title: { en: "Monitor & Optimize", ar: "المراقبة والتحسين" },
        description: {
          en: "We track performance metrics and continuously optimize for better results.",
          ar: "نتتبع مقاييس الأداء ونحسن باستمرار للحصول على نتائج أفضل.",
        },
        icon: "chart",
      },
    ],
    faq: [
      {
        question: {
          en: "How long does it take to see results?",
          ar: "كم من الوقت لرؤية النتائج؟",
        },
        answer: {
          en: "Most clients see measurable results within 4-8 weeks, with significant improvements by month 3.",
          ar: "يرى معظم العملاء نتائج قابلة للقياس خلال 4-8 أسابيع، مع تحسينات كبيرة بحلول الشهر الثالث.",
        },
      },
      {
        question: {
          en: "Do you work with small businesses?",
          ar: "هل تعملون مع الشركات الصغيرة؟",
        },
        answer: {
          en: "Absolutely! We have specialized packages designed specifically for SMEs and startups.",
          ar: "بالتأكيد! لدينا حزم متخصصة مصممة خصيصًا للشركات الصغيرة والمتوسطة والشركات الناشئة.",
        },
      },
      {
        question: {
          en: "What channels do you use?",
          ar: "ما القنوات التي تستخدمونها؟",
        },
        answer: {
          en: "We use a mix of digital channels including social media, search engines, email, and content marketing based on your audience.",
          ar: "نستخدم مزيجًا من القنوات الرقمية بما في ذلك وسائل التواصل الاجتماعي ومحركات البحث والبريد الإلكتروني وتسويق المحتوى بناءً على جمهورك.",
        },
      },
    ],
    packages: [
      {
        name: { en: "Starter", ar: "المبتدئ" },
        price: { en: "$999/mo", ar: "999$/شهر" },
        features: {
          en: [
            "Market analysis",
            "Basic strategy plan",
            "2 channels management",
            "Monthly reporting",
          ],
          ar: [
            "تحليل السوق",
            "خطة استراتيجية أساسية",
            "إدارة قناتين",
            "تقرير شهري",
          ],
        },
        isPopular: false,
      },
      {
        name: { en: "Professional", ar: "الاحترافي" },
        price: { en: "$2,499/mo", ar: "2,499$/شهر" },
        features: {
          en: [
            "Everything in Starter",
            "Advanced strategy",
            "5 channels management",
            "Weekly reporting",
            "A/B testing",
          ],
          ar: [
            "كل شيء في المبتدئ",
            "استراتيجية متقدمة",
            "إدارة 5 قنوات",
            "تقرير أسبوعي",
            "اختبار A/B",
          ],
        },
        isPopular: true,
      },
      {
        name: { en: "Enterprise", ar: "المؤسسات" },
        price: { en: "Custom", ar: "مخصص" },
        features: {
          en: [
            "Everything in Professional",
            "Dedicated team",
            "Unlimited channels",
            "Real-time dashboard",
            "Priority support",
          ],
          ar: [
            "كل شيء في الاحترافي",
            "فريق مخصص",
            "قنوات غير محدودة",
            "لوحة تحكم فورية",
            "دعم أولوية",
          ],
        },
        isPopular: false,
      },
    ],
  },
  {
    id: 2,
    category: "development",
    title: {
      en: "Web Development",
      ar: "تطوير المواقع الإلكترونية",
    },
    smallDesc: {
      en: "Professional web development services that create responsive, fast, and user-friendly websites tailored to your business needs and modern web standards.",
      ar: "خدمات تطوير المواقع الإلكترونية المهنية التي تنشئ مواقع ويب سريعة الاستجابة وسهلة الاستخدام ومصممة وفقاً لاحتياجات عملك ومعايير الويب الحديثة.",
    },
    description: {
      en: "Our expert developers create stunning, functional websites using the latest technologies. From simple landing pages to complex web applications, we deliver solutions that drive results.",
      ar: "يقوم مطورونا الخبراء بإنشاء مواقع ويب مذهلة وعملية باستخدام أحدث التقنيات. من صفحات الهبوط البسيطة إلى تطبيقات الويب المعقدة، نقدم حلولاً تحقق النتائج.",
    },
    benefits: {
      en: [
        "Responsive design",
        "SEO optimization",
        "Fast loading speed",
        "Cross-browser compatibility",
      ],
      ar: [
        "تصميم متجاوب",
        "تحسين محركات البحث",
        "سرعة تحميل عالية",
        "التوافق مع جميع المتصفحات",
      ],
    },
    features: {
      en: [
        "Modern frameworks",
        "Mobile-first approach",
        "Security integration",
        "Performance optimization",
      ],
      ar: ["أطر عمل حديثة", "نهج الهاتف أولاً", "تكامل الأمان", "تحسين الأداء"],
    },
    targetAudience: {
      en: "Businesses of all sizes, entrepreneurs, organizations",
      ar: "الشركات من جميع الأحجام، رجال الأعمال، المنظمات",
    },
    slug: "web-development",
    imgsrc: "https://cdn-icons-png.flaticon.com/512/1006/1006363.png",
    fullImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
    stats: [
      {
        label: { en: "Projects Delivered", ar: "مشاريع تم تسليمها" },
        value: "500+",
        icon: "code",
      },
      {
        label: { en: "Avg. Load Time", ar: "متوسط وقت التحميل" },
        value: "<2s",
        icon: "zap",
      },
      {
        label: { en: "Client Satisfaction", ar: "رضا العملاء" },
        value: "99%",
        icon: "star",
      },
    ],
    processSteps: [
      {
        title: { en: "Requirements Gathering", ar: "جمع المتطلبات" },
        description: {
          en: "We understand your needs, target audience, and project goals in detail.",
          ar: "نفهم احتياجاتك وجمهورك المستهدف وأهداف المشروع بالتفصيل.",
        },
        icon: "clipboard",
      },
      {
        title: { en: "Design & Prototype", ar: "التصميم والنموذج الأولي" },
        description: {
          en: "We create wireframes and interactive prototypes for your approval.",
          ar: "ننشئ إطارات سلكية ونماذج تفاعلية لموافقتك.",
        },
        icon: "design",
      },
      {
        title: { en: "Development", ar: "التطوير" },
        description: {
          en: "Our developers build your site using modern frameworks and best practices.",
          ar: "يبني مطورونا موقعك باستخدام أطر عمل حديثة وأفضل الممارسات.",
        },
        icon: "code",
      },
      {
        title: { en: "Testing & Launch", ar: "الاختبار والإطلاق" },
        description: {
          en: "Rigorous testing across devices followed by a smooth deployment.",
          ar: "اختبار شامل عبر الأجهزة يليه نشر سلس.",
        },
        icon: "rocket",
      },
    ],
    faq: [
      {
        question: {
          en: "How long does a typical project take?",
          ar: "كم يستغرق المشروع النموذجي؟",
        },
        answer: {
          en: "A standard website takes 4-6 weeks, while complex web applications may take 3-6 months.",
          ar: "يستغرق الموقع القياسي 4-6 أسابيع، بينما قد تستغرق تطبيقات الويب المعقدة 3-6 أشهر.",
        },
      },
      {
        question: {
          en: "Do you provide ongoing support?",
          ar: "هل تقدمون دعمًا مستمرًا؟",
        },
        answer: {
          en: "Yes, we offer maintenance packages including updates, security patches, and performance monitoring.",
          ar: "نعم، نقدم حزم صيانة تشمل التحديثات وتصحيحات الأمان ومراقبة الأداء.",
        },
      },
      {
        question: {
          en: "Can you redesign my existing website?",
          ar: "هل يمكنكم إعادة تصميم موقعي الحالي؟",
        },
        answer: {
          en: "Absolutely! We specialize in modernizing outdated websites while preserving your SEO rankings.",
          ar: "بالتأكيد! نحن متخصصون في تحديث المواقع القديمة مع الحفاظ على تصنيفات تحسين محركات البحث.",
        },
      },
    ],
    packages: [
      {
        name: { en: "Landing Page", ar: "صفحة هبوط" },
        price: { en: "$1,499", ar: "1,499$" },
        features: {
          en: [
            "Single page design",
            "Responsive layout",
            "Contact form",
            "Basic SEO",
            "1 month support",
          ],
          ar: [
            "تصميم صفحة واحدة",
            "تصميم متجاوب",
            "نموذج اتصال",
            "SEO أساسي",
            "شهر دعم",
          ],
        },
        isPopular: false,
      },
      {
        name: { en: "Business Website", ar: "موقع الأعمال" },
        price: { en: "$4,999", ar: "4,999$" },
        features: {
          en: [
            "Up to 10 pages",
            "CMS integration",
            "Advanced SEO",
            "Analytics setup",
            "3 months support",
          ],
          ar: [
            "حتى 10 صفحات",
            "تكامل CMS",
            "SEO متقدم",
            "إعداد التحليلات",
            "3 أشهر دعم",
          ],
        },
        isPopular: true,
      },
      {
        name: { en: "Web Application", ar: "تطبيق ويب" },
        price: { en: "Custom", ar: "مخصص" },
        features: {
          en: [
            "Custom functionality",
            "Database design",
            "API integration",
            "User authentication",
            "6 months support",
          ],
          ar: [
            "وظائف مخصصة",
            "تصميم قاعدة البيانات",
            "تكامل API",
            "مصادقة المستخدم",
            "6 أشهر دعم",
          ],
        },
        isPopular: false,
      },
    ],
  },
  {
    id: 3,
    category: "development",
    title: {
      en: "Mobile App Development",
      ar: "تطوير تطبيقات الهاتف المحمول",
    },
    smallDesc: {
      en: "Custom mobile application development for iOS and Android platforms, delivering engaging user experiences and robust functionality for your business needs.",
      ar: "تطوير تطبيقات الهاتف المحمول المخصصة لمنصات iOS و Android، وتقديم تجارب مستخدم جذابة ووظائف قوية لاحتياجات عملك.",
    },
    description: {
      en: "Transform your ideas into powerful mobile applications. We specialize in native and cross-platform development, ensuring your app performs excellently across all devices.",
      ar: "حوّل أفكارك إلى تطبيقات هاتف محمول قوية. نحن متخصصون في التطوير الأصلي ومتعدد المنصات، مما يضمن أداء تطبيقك بشكل ممتاز عبر جميع الأجهزة.",
    },
    benefits: {
      en: [
        "Native performance",
        "Intuitive UI/UX",
        "Offline functionality",
        "App store optimization",
      ],
      ar: [
        "أداء أصلي",
        "واجهة وتجربة مستخدم بديهية",
        "وظائف غير متصلة",
        "تحسين متجر التطبيقات",
      ],
    },
    features: {
      en: [
        "Cross-platform compatibility",
        "Real-time synchronization",
        "Push notifications",
        "In-app purchases",
      ],
      ar: [
        "التوافق متعدد المنصات",
        "المزامنة في الوقت الفعلي",
        "الإشعارات الفورية",
        "المشتريات داخل التطبيق",
      ],
    },
    targetAudience: {
      en: "Startups, tech companies, retail businesses",
      ar: "الشركات الناشئة، شركات التكنولوجيا، أعمال التجزئة",
    },
    slug: "mobile-app-development",
    imgsrc: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
    fullImage:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    stats: [
      {
        label: { en: "Apps Launched", ar: "تطبيقات تم إطلاقها" },
        value: "150+",
        icon: "phone",
      },
      {
        label: { en: "Avg. Rating", ar: "متوسط التقييم" },
        value: "4.8★",
        icon: "star",
      },
      {
        label: { en: "Downloads", ar: "تنزيلات" },
        value: "2M+",
        icon: "download",
      },
    ],
    processSteps: [
      {
        title: { en: "Concept & Planning", ar: "المفهوم والتخطيط" },
        description: {
          en: "We define app features, user flows, and technical requirements.",
          ar: "نحدد ميزات التطبيق وتدفقات المستخدم والمتطلبات التقنية.",
        },
        icon: "idea",
      },
      {
        title: { en: "UI/UX Design", ar: "تصميم واجهة المستخدم" },
        description: {
          en: "We design intuitive interfaces with interactive prototypes.",
          ar: "نصمم واجهات بديهية مع نماذج تفاعلية.",
        },
        icon: "design",
      },
      {
        title: { en: "Development", ar: "التطوير" },
        description: {
          en: "Native or cross-platform development with clean code.",
          ar: "تطوير أصلي أو متعدد المنصات بكود نظيف.",
        },
        icon: "code",
      },
      {
        title: { en: "Testing & Deployment", ar: "الاختبار والنشر" },
        description: {
          en: "Rigorous QA testing and app store submission.",
          ar: "اختبار QA شامل وتقديم لمتاجر التطبيقات.",
        },
        icon: "launch",
      },
    ],
    faq: [
      {
        question: {
          en: "iOS, Android, or both?",
          ar: "iOS أم Android أم كلاهما؟",
        },
        answer: {
          en: "We develop for both platforms using React Native or Flutter for cross-platform efficiency.",
          ar: "نطور لكلا المنصتين باستخدام React Native أو Flutter للكفاءة متعددة المنصات.",
        },
      },
      {
        question: { en: "How much does an app cost?", ar: "كم تكلفة التطبيق؟" },
        answer: {
          en: "Costs vary based on complexity. Simple apps start at $5K, while complex ones can range $20K-$100K+.",
          ar: "تختلف التكاليف بناءً على التعقيد. تبدأ التطبيقات البسيطة من 5 آلاف دولار، بينما تتراوح المعقدة بين 20-100 ألف دولار+.",
        },
      },
    ],
    packages: [
      {
        name: { en: "MVP", ar: "الحد الأدنى" },
        price: { en: "$5,999", ar: "5,999$" },
        features: {
          en: [
            "Core features only",
            "Single platform",
            "Basic UI",
            "App store submission",
          ],
          ar: [
            "الميزات الأساسية فقط",
            "منصة واحدة",
            "واجهة أساسية",
            "تقديم لمتجر التطبيقات",
          ],
        },
        isPopular: false,
      },
      {
        name: { en: "Full App", ar: "تطبيق كامل" },
        price: { en: "$14,999", ar: "14,999$" },
        features: {
          en: [
            "All features",
            "Both platforms",
            "Premium UI/UX",
            "Push notifications",
            "Analytics",
          ],
          ar: [
            "جميع الميزات",
            "كلا المنصتين",
            "واجهة متميزة",
            "إشعارات فورية",
            "تحليلات",
          ],
        },
        isPopular: true,
      },
      {
        name: { en: "Enterprise", ar: "المؤسسات" },
        price: { en: "Custom", ar: "مخصص" },
        features: {
          en: [
            "Custom architecture",
            "Backend development",
            "API integration",
            "Ongoing maintenance",
          ],
          ar: ["بنية مخصصة", "تطوير الخادم", "تكامل API", "صيانة مستمرة"],
        },
        isPopular: false,
      },
    ],
  },
  {
    id: 4,
    category: "marketing",
    title: {
      en: "Digital Marketing",
      ar: "التسويق الرقمي",
    },
    smallDesc: {
      en: "Comprehensive digital marketing solutions including social media management, content creation, PPC advertising, and analytics to grow your online presence effectively.",
      ar: "حلول التسويق الرقمي الشاملة بما في ذلك إدارة وسائل التواصل الاجتماعي، وإنشاء المحتوى، والإعلان بالدفع بالنقرة، والتحليلات لتنمية تواجدك عبر الإنترنت بفعالية.",
    },
    description: {
      en: "Boost your brand's digital footprint with our comprehensive marketing services. We create data-driven campaigns that engage your audience and drive measurable results.",
      ar: "عزز البصمة الرقمية لعلامتك التجارية مع خدماتنا التسويقية الشاملة. نحن ننشئ حملات قائمة على البيانات تشرك جمهورك وتحقق نتائج قابلة للقياس.",
    },
    benefits: {
      en: [
        "Increased online visibility",
        "Higher engagement rates",
        "Better ROI tracking",
        "Brand awareness growth",
      ],
      ar: [
        "زيادة الرؤية عبر الإنترنت",
        "معدلات مشاركة أعلى",
        "تتبع أفضل لعائد الاستثمار",
        "نمو الوعي بالعلامة التجارية",
      ],
    },
    features: {
      en: [
        "Social media campaigns",
        "Content marketing",
        "Email automation",
        "Performance analytics",
      ],
      ar: [
        "حملات وسائل التواصل الاجتماعي",
        "تسويق المحتوى",
        "أتمتة البريد الإلكتروني",
        "تحليلات الأداء",
      ],
    },
    targetAudience: {
      en: "E-commerce businesses, service providers, B2B companies",
      ar: "أعمال التجارة الإلكترونية، مقدمي الخدمات، شركات B2B",
    },
    slug: "digital-marketing",
    imgsrc: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png",
    fullImage:
      "https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=2006&q=80",
    stats: [
      {
        label: { en: "Campaigns Run", ar: "حملات تم تشغيلها" },
        value: "1,200+",
        icon: "campaign",
      },
      {
        label: { en: "Avg. ROAS", ar: "متوسط العائد" },
        value: "4.5x",
        icon: "chart",
      },
      {
        label: { en: "Leads Generated", ar: "عملاء محتملين" },
        value: "50K+",
        icon: "users",
      },
    ],
    processSteps: [
      {
        title: { en: "Audit & Analysis", ar: "التدقيق والتحليل" },
        description: {
          en: "We audit your current digital presence and identify growth opportunities.",
          ar: "ندقق حضورك الرقمي الحالي ونحدد فرص النمو.",
        },
        icon: "search",
      },
      {
        title: { en: "Campaign Strategy", ar: "استراتيجية الحملة" },
        description: {
          en: "We design multi-channel campaigns targeting your ideal customers.",
          ar: "نصمم حملات متعددة القنوات تستهدف عملاءك المثاليين.",
        },
        icon: "plan",
      },
      {
        title: { en: "Execute & Manage", ar: "التنفيذ والإدارة" },
        description: {
          en: "We launch and manage campaigns with daily optimization.",
          ar: "نطلق وندير الحملات مع تحسين يومي.",
        },
        icon: "launch",
      },
      {
        title: { en: "Report & Scale", ar: "التقرير والتوسع" },
        description: {
          en: "Detailed performance reports and scaling successful campaigns.",
          ar: "تقارير أداء مفصلة وتوسيع الحملات الناجحة.",
        },
        icon: "scale",
      },
    ],
    faq: [
      {
        question: {
          en: "What's your minimum budget?",
          ar: "ما هو الحد الأدنى للميزانية؟",
        },
        answer: {
          en: "We work with budgets starting from $1,000/month for ad spend plus our management fee.",
          ar: "نعمل مع ميزانيات تبدأ من 1,000$/شهر للإنفاق الإعلاني بالإضافة إلى رسوم الإدارة.",
        },
      },
      {
        question: {
          en: "How do you measure success?",
          ar: "كيف تقيسون النجاح؟",
        },
        answer: {
          en: "We track KPIs like CTR, CPA, ROAS, and conversion rates with transparent reporting.",
          ar: "نتتبع مؤشرات الأداء مثل CTR و CPA و ROAS ومعدلات التحويل بتقارير شفافة.",
        },
      },
    ],
    packages: [
      {
        name: { en: "Growth", ar: "النمو" },
        price: { en: "$1,499/mo", ar: "1,499$/شهر" },
        features: {
          en: [
            "2 channels",
            "Basic campaigns",
            "Monthly reports",
            "Ad budget management",
          ],
          ar: [
            "قناتين",
            "حملات أساسية",
            "تقارير شهرية",
            "إدارة ميزانية الإعلانات",
          ],
        },
        isPopular: false,
      },
      {
        name: { en: "Scale", ar: "التوسع" },
        price: { en: "$3,499/mo", ar: "3,499$/شهر" },
        features: {
          en: [
            "5 channels",
            "Advanced campaigns",
            "Weekly reports",
            "A/B testing",
            "Retargeting",
          ],
          ar: [
            "5 قنوات",
            "حملات متقدمة",
            "تقارير أسبوعية",
            "اختبار A/B",
            "إعادة الاستهداف",
          ],
        },
        isPopular: true,
      },
      {
        name: { en: "Dominate", ar: "الهيمنة" },
        price: { en: "$6,999/mo", ar: "6,999$/شهر" },
        features: {
          en: [
            "Unlimited channels",
            "Full-funnel strategy",
            "Daily optimization",
            "Dedicated manager",
            "Custom dashboards",
          ],
          ar: [
            "قنوات غير محدودة",
            "استراتيجية كاملة",
            "تحسين يومي",
            "مدير مخصص",
            "لوحات تحكم مخصصة",
          ],
        },
        isPopular: false,
      },
    ],
  },
  {
    id: 5,
    category: "design",
    title: {
      en: "Brand Identity Design",
      ar: "تصميم الهوية التجارية",
    },
    smallDesc: {
      en: "Creative brand identity design services that establish a memorable visual presence for your business, including logo design, color schemes, and brand guidelines.",
      ar: "خدمات تصميم الهوية التجارية الإبداعية التي تؤسس حضوراً بصرياً لا يُنسى لعملك، بما في ذلك تصميم الشعار، وأنظمة الألوان، ودلائل العلامة التجارية.",
    },
    description: {
      en: "Craft a distinctive brand identity that resonates with your target audience. Our designers create cohesive visual systems that communicate your brand's values and personality.",
      ar: "صمم هوية تجارية مميزة تتردد صداها مع جمهورك المستهدف. يقوم مصممونا بإنشاء أنظمة بصرية متماسكة تنقل قيم علامتك التجارية وشخصيتها.",
    },
    benefits: {
      en: [
        "Professional brand image",
        "Consistent visual identity",
        "Memorable brand recognition",
        "Market differentiation",
      ],
      ar: [
        "صورة علامة تجارية احترافية",
        "هوية بصرية متسقة",
        "تميز العلامة التجارية الذي لا يُنسى",
        "التمايز في السوق",
      ],
    },
    features: {
      en: [
        "Logo design",
        "Brand guidelines",
        "Typography selection",
        "Color palette creation",
      ],
      ar: [
        "تصميم الشعار",
        "دلائل العلامة التجارية",
        "اختيار الخط",
        "إنشاء لوحة الألوان",
      ],
    },
    targetAudience: {
      en: "New businesses, rebranding companies, creative agencies",
      ar: "الأعمال الجديدة، الشركات التي تعيد تسمية علامتها التجارية، الوكالات الإبداعية",
    },
    slug: "brand-identity-design",
    imgsrc: "https://cdn-icons-png.flaticon.com/512/3076/3076395.png",
    fullImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80",
    stats: [
      {
        label: { en: "Brands Created", ar: "علامات تجارية تم إنشاؤها" },
        value: "300+",
        icon: "palette",
      },
      {
        label: { en: "Brand Recognition", ar: "الاعتراف بالعلامة" },
        value: "+85%",
        icon: "trending",
      },
      {
        label: { en: "Client Retention", ar: "الاحتفاظ بالعملاء" },
        value: "96%",
        icon: "heart",
      },
    ],
    processSteps: [
      {
        title: { en: "Brand Discovery", ar: "اكتشاف العلامة التجارية" },
        description: {
          en: "We research your values, audience, and market position to define your brand essence.",
          ar: "نبحث عن قيمك وجمهورك وموقعك في السوق لتحديد جوهر علامتك التجارية.",
        },
        icon: "search",
      },
      {
        title: { en: "Concept Development", ar: "تطوير المفهوم" },
        description: {
          en: "We create multiple logo concepts and visual directions for your review.",
          ar: "ننشئ مفاهيم شعار متعددة واتجاهات بصرية لمراجعتك.",
        },
        icon: "idea",
      },
      {
        title: { en: "Design Refinement", ar: "تحسين التصميم" },
        description: {
          en: "We refine the chosen direction with typography, colors, and brand elements.",
          ar: "نحسن الاتجاه المختار بالخطوط والألوان وعناصر العلامة التجارية.",
        },
        icon: "design",
      },
      {
        title: { en: "Brand Guidelines", ar: "دلائل العلامة التجارية" },
        description: {
          en: "We deliver comprehensive brand guidelines for consistent application.",
          ar: "نقدم دلائل شاملة للعلامة التجارية للتطبيق المتسق.",
        },
        icon: "book",
      },
    ],
    faq: [
      {
        question: {
          en: "How long does brand identity design take?",
          ar: "كم يستغرق تصميم الهوية التجارية؟",
        },
        answer: {
          en: "A complete brand identity typically takes 4-8 weeks from discovery to final delivery.",
          ar: "تستغرق الهوية التجارية الكاملة عادةً من 4-8 أسابيع من الاكتشاف إلى التسليم النهائي.",
        },
      },
      {
        question: {
          en: "How many logo concepts will I receive?",
          ar: "كم مفهوم شعار سأحصل عليه؟",
        },
        answer: {
          en: "We present 3-5 initial concepts, then refine your favorite through 3 revision rounds.",
          ar: "نقدم 3-5 مفاهيم أولية، ثم نحسن المفضلة لديك عبر 3 جولات مراجعة.",
        },
      },
      {
        question: {
          en: "Do you provide brand guidelines?",
          ar: "هل تقدمون دلائل للعلامة التجارية؟",
        },
        answer: {
          en: "Yes, every brand identity package includes comprehensive brand guidelines in PDF format.",
          ar: "نعم، تتضمن كل حزمة هوية تجارية دلائل شاملة بصيغة PDF.",
        },
      },
    ],
    packages: [
      {
        name: { en: "Logo Essentials", ar: "أساسيات الشعار" },
        price: { en: "$1,999", ar: "1,999$" },
        features: {
          en: [
            "3 logo concepts",
            "3 revision rounds",
            "Final files (AI, PNG, SVG)",
            "Basic color palette",
          ],
          ar: [
            "3 مفاهيم شعار",
            "3 جولات مراجعة",
            "ملفات نهائية",
            "لوحة ألوان أساسية",
          ],
        },
        isPopular: false,
      },
      {
        name: { en: "Brand Identity", ar: "الهوية التجارية" },
        price: { en: "$4,999", ar: "4,999$" },
        features: {
          en: [
            "5 logo concepts",
            "Unlimited revisions",
            "Full brand guidelines",
            "Business card design",
            "Social media kit",
            "Typography system",
          ],
          ar: [
            "5 مفاهيم شعار",
            "مراجعات غير محدودة",
            "دلائل شاملة",
            "تصميم بطاقة عمل",
            "مجموعة وسائل التواصل",
            "نظام الخطوط",
          ],
        },
        isPopular: true,
      },
      {
        name: { en: "Complete Branding", ar: "العلامة التجارية الكاملة" },
        price: { en: "$9,999", ar: "9,999$" },
        features: {
          en: [
            "Everything in Brand Identity",
            "Stationery design",
            "Packaging design",
            "Brand strategy document",
            "Brand launch support",
          ],
          ar: [
            "كل شيء في الهوية التجارية",
            "تصميم القرطاسية",
            "تصميم التغليف",
            "وثيقة استراتيجية العلامة",
            "دعم إطلاق العلامة",
          ],
        },
        isPopular: false,
      },
    ],
  },
  {
    id: 6,
    category: "development",
    title: {
      en: "E-commerce Solutions",
      ar: "حلول التجارة الإلكترونية",
    },
    smallDesc: {
      en: "Complete e-commerce platform development with secure payment integration, inventory management, and user-friendly shopping experiences to boost online sales.",
      ar: "تطوير منصة التجارة الإلكترونية الكاملة مع تكامل الدفع الآمن، وإدارة المخزون، وتجارب التسوق سهلة الاستخدام لتعزيز المبيعات عبر الإنترنت.",
    },
    description: {
      en: "Launch your online store with our comprehensive e-commerce solutions. We build scalable platforms that handle everything from product catalogs to payment processing.",
      ar: "أطلق متجرك عبر الإنترنت مع حلول التجارة الإلكترونية الشاملة. نحن نبني منصات قابلة للتوسع تتعامل مع كل شيء من كتالوجات المنتجات إلى معالجة المدفوعات.",
    },
    benefits: {
      en: [
        "Secure transactions",
        "Mobile optimization",
        "Inventory tracking",
        "Multi-payment options",
      ],
      ar: [
        "معاملات آمنة",
        "تحسين للهاتف المحمول",
        "تتبع المخزون",
        "خيارات الدفع المتعددة",
      ],
    },
    features: {
      en: [
        "Shopping cart functionality",
        "Order management",
        "Customer accounts",
        "Analytics dashboard",
      ],
      ar: [
        "وظائف عربة التسوق",
        "إدارة الطلبات",
        "حسابات العملاء",
        "لوحة تحكم التحليلات",
      ],
    },
    targetAudience: {
      en: "Retailers, wholesalers, product manufacturers",
      ar: "تجار التجزئة، تجار الجملة، مصنعي المنتجات",
    },
    slug: "ecommerce-solutions",
    imgsrc: "https://cdn-icons-png.flaticon.com/512/2331/2331970.png",
    fullImage:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    stats: [
      {
        label: { en: "Stores Launched", ar: "متاجر تم إطلاقها" },
        value: "200+",
        icon: "store",
      },
      {
        label: { en: "Avg. Sales Increase", ar: "متوسط زيادة المبيعات" },
        value: "+150%",
        icon: "trending",
      },
      {
        label: { en: "Uptime Guarantee", ar: "ضمان وقت التشغيل" },
        value: "99.9%",
        icon: "shield",
      },
    ],
    processSteps: [
      {
        title: { en: "Platform Selection", ar: "اختيار المنصة" },
        description: {
          en: "We evaluate your needs and recommend the best e-commerce platform.",
          ar: "نقيّم احتياجاتك ونوصي بأفضل منصة تجارة إلكترونية.",
        },
        icon: "search",
      },
      {
        title: { en: "Store Design", ar: "تصميم المتجر" },
        description: {
          en: "We design a user-friendly storefront optimized for conversions.",
          ar: "نصمم واجهة متجر سهلة الاستخدام ومحسّنة للتحويلات.",
        },
        icon: "design",
      },
      {
        title: { en: "Integration & Setup", ar: "التكامل والإعداد" },
        description: {
          en: "We integrate payments, shipping, inventory, and analytics tools.",
          ar: "نكامل أدوات الدفع والشحن والمخزون والتحليلات.",
        },
        icon: "code",
      },
      {
        title: { en: "Launch & Optimize", ar: "الإطلاق والتحسين" },
        description: {
          en: "We launch your store and continuously optimize for better performance.",
          ar: "نطلق متجرك ونحسّن الأداء باستمرار.",
        },
        icon: "rocket",
      },
    ],
    faq: [
      {
        question: {
          en: "Which e-commerce platform do you use?",
          ar: "أي منصة تجارة إلكترونية تستخدمون؟",
        },
        answer: {
          en: "We work with Shopify, WooCommerce, Magento, and custom solutions based on your needs.",
          ar: "نعمل مع Shopify و WooCommerce و Magento وحلول مخصصة بناءً على احتياجاتك.",
        },
      },
      {
        question: {
          en: "Can you migrate my existing store?",
          ar: "هل يمكنكم ترحيل متجري الحالي؟",
        },
        answer: {
          en: "Yes, we handle complete store migrations with zero downtime and data integrity.",
          ar: "نعم، نتعامل مع ترحيل المتاجر الكاملة بدون توقف ومع سلامة البيانات.",
        },
      },
      {
        question: {
          en: "Do you support multiple payment gateways?",
          ar: "هل تدعمون بوابات دفع متعددة؟",
        },
        answer: {
          en: "Absolutely. We integrate Stripe, PayPal, local gateways, and custom payment solutions.",
          ar: "بالتأكيد. نكامل Stripe و PayPal والبوابات المحلية وحلول الدفع المخصصة.",
        },
      },
    ],
    packages: [
      {
        name: { en: "Starter Store", ar: "المتجر المبتدئ" },
        price: { en: "$3,999", ar: "3,999$" },
        features: {
          en: [
            "Up to 50 products",
            "Payment integration",
            "Mobile responsive",
            "Basic analytics",
          ],
          ar: [
            "حتى 50 منتج",
            "تكامل الدفع",
            "متجاوب مع الهاتف",
            "تحليلات أساسية",
          ],
        },
        isPopular: false,
      },
      {
        name: { en: "Growth Store", ar: "متجر النمو" },
        price: { en: "$8,999", ar: "8,999$" },
        features: {
          en: [
            "Unlimited products",
            "Multi-payment gateways",
            "Inventory management",
            "Email automation",
            "Advanced analytics",
          ],
          ar: [
            "منتجات غير محدودة",
            "بوابات دفع متعددة",
            "إدارة المخزون",
            "أتمتة البريد",
            "تحليلات متقدمة",
          ],
        },
        isPopular: true,
      },
      {
        name: { en: "Enterprise Store", ar: "متجر المؤسسات" },
        price: { en: "Custom", ar: "مخصص" },
        features: {
          en: [
            "Custom architecture",
            "Multi-currency support",
            "ERP integration",
            "Dedicated support",
            "Performance optimization",
          ],
          ar: [
            "بنية مخصصة",
            "دعم متعدد العملات",
            "تكامل ERP",
            "دعم مخصص",
            "تحسين الأداء",
          ],
        },
        isPopular: false,
      },
    ],
  },
  {
    id: 7,
    category: "marketing",
    title: {
      en: "SEO Services",
      ar: "خدمات تحسين محركات البحث",
    },
    smallDesc: {
      en: "Professional SEO services to improve your website's search engine rankings, increase organic traffic, and enhance online visibility through proven optimization techniques.",
      ar: "خدمات تحسين محركات البحث المهنية لتحسين ترتيب موقعك في محركات البحث، وزيادة حركة المرور العضوية، وتعزيز الرؤية عبر الإنترنت من خلال تقنيات التحسين المثبتة.",
    },
    description: {
      en: "Dominate search results with our comprehensive SEO strategies. We optimize your website's technical aspects, content, and off-page factors to achieve higher rankings.",
      ar: "هيمن على نتائج البحث مع استراتيجيات تحسين محركات البحث الشاملة. نحن نحسن الجوانب التقنية لموقعك والمحتوى والعوامل خارج الصفحة لتحقيق ترتيبات أعلى.",
    },
    benefits: {
      en: [
        "Higher search rankings",
        "Increased organic traffic",
        "Better user experience",
        "Long-term results",
      ],
      ar: [
        "ترتيبات بحث أعلى",
        "زيادة حركة المرور العضوية",
        "تجربة مستخدم أفضل",
        "نتائج طويلة المدى",
      ],
    },
    features: {
      en: [
        "Keyword research",
        "On-page optimization",
        "Technical SEO",
        "Link building",
      ],
      ar: [
        "بحث الكلمات المفتاحية",
        "تحسين الصفحة",
        "تحسين محركات البحث التقني",
        "بناء الروابط",
      ],
    },
    targetAudience: {
      en: "Local businesses, online retailers, service companies",
      ar: "الأعمال المحلية، تجار التجزئة عبر الإنترنت، شركات الخدمات",
    },
    slug: "seo-services",
    imgsrc: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
    fullImage:
      "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
    stats: [
      {
        label: { en: "Keywords Ranked", ar: "كلمات مفتاحية في الترتيب" },
        value: "10K+",
        icon: "search",
      },
      {
        label: { en: "Traffic Increase", ar: "زيادة الزيارات" },
        value: "+250%",
        icon: "trending",
      },
      {
        label: { en: "Page One Rankings", ar: "ترتيبات الصفحة الأولى" },
        value: "85%",
        icon: "star",
      },
    ],
    processSteps: [
      {
        title: { en: "SEO Audit", ar: "تدقيق SEO" },
        description: {
          en: "We analyze your website's current SEO health and identify improvement areas.",
          ar: "نحلل صحة SEO الحالية لموقعك ونحدد مجالات التحسين.",
        },
        icon: "search",
      },
      {
        title: { en: "Keyword Strategy", ar: "استراتيجية الكلمات المفتاحية" },
        description: {
          en: "We research and select high-value keywords for your target market.",
          ar: "نبحث ونختار كلمات مفتاحية عالية القيمة لسوقك المستهدف.",
        },
        icon: "plan",
      },
      {
        title: { en: "On-Page & Off-Page", ar: "التحسين الداخلي والخارجي" },
        description: {
          en: "We optimize your content and build authoritative backlinks.",
          ar: "نحسن محتواك ونبني روابط خلفية موثوقة.",
        },
        icon: "code",
      },
      {
        title: { en: "Track & Report", ar: "التتبع والتقارير" },
        description: {
          en: "We monitor rankings, traffic, and provide monthly performance reports.",
          ar: "نراقب الترتيب والزيارات ونقدم تقارير أداء شهرية.",
        },
        icon: "chart",
      },
    ],
    faq: [
      {
        question: {
          en: "How long until I see SEO results?",
          ar: "متى سأرى نتائج SEO؟",
        },
        answer: {
          en: "Typically 3-6 months for noticeable improvements, with continued growth over time.",
          ar: "عادةً من 3-6 أشهر لتحسينات ملحوظة، مع نمو مستمر مع الوقت.",
        },
      },
      {
        question: {
          en: "Do you guarantee first page rankings?",
          ar: "هل تضمنون ترتيبات الصفحة الأولى؟",
        },
        answer: {
          en: "While no one can guarantee specific rankings, our proven methods consistently deliver results.",
          ar: "بينما لا يمكن لأحد ضمان ترتيبات محددة، فإن أساليبنا المثبتة تحقق نتائج باستمرار.",
        },
      },
      {
        question: {
          en: "Is SEO better than paid ads?",
          ar: "هل SEO أفضل من الإعلانات المدفوعة؟",
        },
        answer: {
          en: "SEO provides long-term organic traffic at lower cost, while ads give immediate results. We recommend both.",
          ar: "يوفر SEO زيارات عضوية طويلة المدى بتكلفة أقل، بينما الإعلانات تعطي نتائج فورية. نوصي بكليهما.",
        },
      },
    ],
    packages: [
      {
        name: { en: "Basic SEO", ar: "SEO أساسي" },
        price: { en: "$799/mo", ar: "799$/شهر" },
        features: {
          en: [
            "10 keywords",
            "On-page optimization",
            "Monthly report",
            "Technical fixes",
          ],
          ar: [
            "10 كلمات مفتاحية",
            "تحسين الصفحة",
            "تقرير شهري",
            "إصلاحات تقنية",
          ],
        },
        isPopular: false,
      },
      {
        name: { en: "Advanced SEO", ar: "SEO متقدم" },
        price: { en: "$1,999/mo", ar: "1,999$/شهر" },
        features: {
          en: [
            "30 keywords",
            "Content optimization",
            "Link building",
            "Competitor analysis",
            "Bi-weekly reports",
          ],
          ar: [
            "30 كلمة مفتاحية",
            "تحسين المحتوى",
            "بناء الروابط",
            "تحليل المنافسين",
            "تقارير نصف شهرية",
          ],
        },
        isPopular: true,
      },
      {
        name: { en: "Enterprise SEO", ar: "SEO المؤسسات" },
        price: { en: "$3,999/mo", ar: "3,999$/شهر" },
        features: {
          en: [
            "Unlimited keywords",
            "Full site optimization",
            "Premium link building",
            "Dedicated SEO manager",
            "Weekly reports",
          ],
          ar: [
            "كلمات مفتاحية غير محدودة",
            "تحسين الموقع الكامل",
            "بناء روابط متميز",
            "مدير SEO مخصص",
            "تقارير أسبوعية",
          ],
        },
        isPopular: false,
      },
    ],
  },
  {
    id: 8,
    category: "design",
    title: {
      en: "UI/UX Design",
      ar: "تصميم واجهة وتجربة المستخدم",
    },
    smallDesc: {
      en: "User-centered design services that create intuitive interfaces and exceptional user experiences, focusing on usability, accessibility, and visual appeal.",
      ar: "خدمات التصميم المتمركزة حول المستخدم التي تنشئ واجهات بديهية وتجارب مستخدم استثنائية، مع التركيز على سهولة الاستخدام وإمكانية الوصول والجاذبية البصرية.",
    },
    description: {
      en: "Design interfaces that users love to interact with. Our UX/UI experts create wireframes, prototypes, and final designs that prioritize user satisfaction and business goals.",
      ar: "صمم واجهات يحب المستخدمون التفاعل معها. يقوم خبراء UX/UI لدينا بإنشاء إطارات سلكية ونماذج أولية وتصميمات نهائية تعطي الأولوية لرضا المستخدم وأهداف العمل.",
    },
    benefits: {
      en: [
        "Improved user satisfaction",
        "Higher conversion rates",
        "Reduced bounce rates",
        "Enhanced usability",
      ],
      ar: [
        "تحسين رضا المستخدم",
        "معدلات تحويل أعلى",
        "تقليل معدلات الارتداد",
        "تحسين سهولة الاستخدام",
      ],
    },
    features: {
      en: ["User research", "Wireframing", "Prototyping", "Usability testing"],
      ar: [
        "بحث المستخدم",
        "الإطار السلكي",
        "النماذج الأولية",
        "اختبار سهولة الاستخدام",
      ],
    },
    targetAudience: {
      en: "SaaS companies, mobile app developers, web platforms",
      ar: "شركات SaaS، مطوري تطبيقات الهاتف المحمول، منصات الويب",
    },
    slug: "ui-ux-design",
    imgsrc: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
    fullImage:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    stats: [
      {
        label: { en: "Projects Designed", ar: "مشاريع تم تصميمها" },
        value: "400+",
        icon: "design",
      },
      {
        label: { en: "User Satisfaction", ar: "رضا المستخدم" },
        value: "97%",
        icon: "heart",
      },
      {
        label: { en: "Conversion Lift", ar: "زيادة التحويلات" },
        value: "+65%",
        icon: "trending",
      },
    ],
    processSteps: [
      {
        title: { en: "User Research", ar: "بحث المستخدم" },
        description: {
          en: "We study your users' behaviors, needs, and pain points through interviews and testing.",
          ar: "ندرس سلوكيات واحتياجات ونقاط ألم المستخدمين من خلال المقابلات والاختبارات.",
        },
        icon: "search",
      },
      {
        title: { en: "Wireframing", ar: "الإطار السلكي" },
        description: {
          en: "We create low-fidelity wireframes to map out user flows and layouts.",
          ar: "ننشئ إطارات سلكية منخفضة الدقة لرسم تدفقات المستخدم والتخطيطات.",
        },
        icon: "layout",
      },
      {
        title: { en: "Prototyping", ar: "النماذج الأولية" },
        description: {
          en: "We build interactive prototypes for usability testing and stakeholder review.",
          ar: "نبني نماذج تفاعلية لاختبار سهولة الاستخدام ومراجعة أصحاب المصلحة.",
        },
        icon: "prototype",
      },
      {
        title: { en: "Final Design & Handoff", ar: "التصميم النهائي والتسليم" },
        description: {
          en: "We deliver polished designs with detailed specifications for development.",
          ar: "نقدم تصاميم نهائية مع مواصفات مفصلة للتطوير.",
        },
        icon: "handoff",
      },
    ],
    faq: [
      {
        question: {
          en: "What tools do you use for design?",
          ar: "ما الأدوات التي تستخدمونها للتصميم؟",
        },
        answer: {
          en: "We primarily use Figma for design and prototyping, along with user research tools like Hotjar and Maze.",
          ar: "نستخدم بشكل أساسي Figma للتصميم والنماذج، بالإضافة إلى أدوات بحث المستخدم مثل Hotjar و Maze.",
        },
      },
      {
        question: {
          en: "Do you conduct user testing?",
          ar: "هل تجريون اختبار المستخدم؟",
        },
        answer: {
          en: "Yes, we conduct usability testing at multiple stages to ensure the design meets user needs.",
          ar: "نعم، نجري اختبارات سهولة الاستخدام في مراحل متعددة لضمان تلبية التصميم لاحتياجات المستخدم.",
        },
      },
      {
        question: {
          en: "Can you redesign an existing product?",
          ar: "هل يمكنكم إعادة تصميم منتج موجود؟",
        },
        answer: {
          en: "Absolutely. We specialize in UX audits and redesigns that improve metrics while maintaining user familiarity.",
          ar: "بالتأكيد. نحن متخصصون في تدقيق UX وإعادة التصميم التي تحسن المقاييس مع الحفاظ على ألفة المستخدم.",
        },
      },
    ],
    packages: [
      {
        name: { en: "UX Audit", ar: "تدقيق UX" },
        price: { en: "$2,499", ar: "2,499$" },
        features: {
          en: [
            "Heuristic evaluation",
            "User flow analysis",
            "Competitor benchmarking",
            "Recommendations report",
          ],
          ar: [
            "تقييم إرشادي",
            "تحليل تدفق المستخدم",
            "مقارنة المنافسين",
            "تقرير التوصيات",
          ],
        },
        isPopular: false,
      },
      {
        name: { en: "Full UX/UI Design", ar: "تصميم UX/UI كامل" },
        price: { en: "$7,999", ar: "7,999$" },
        features: {
          en: [
            "User research",
            "Wireframes & prototypes",
            "Visual design system",
            "Usability testing",
            "Developer handoff",
          ],
          ar: [
            "بحث المستخدم",
            "إطارات ونماذج أولية",
            "نظام تصميم بصري",
            "اختبار سهولة الاستخدام",
            "تسليم للمطورين",
          ],
        },
        isPopular: true,
      },
      {
        name: { en: "Design System", ar: "نظام التصميم" },
        price: { en: "$12,999", ar: "12,999$" },
        features: {
          en: [
            "Complete component library",
            "Design tokens",
            "Documentation",
            "Figma + code components",
            "Training session",
          ],
          ar: [
            "مكتبة مكونات كاملة",
            "رموز التصميم",
            "توثيق",
            "مكونات Figma + كود",
            "جلسة تدريبية",
          ],
        },
        isPopular: false,
      },
    ],
  },
  {
    id: 9,
    category: "marketing",
    title: {
      en: "Content Writing",
      ar: "كتابة المحتوى",
    },
    smallDesc: {
      en: "Professional content writing services that engage your audience, improve SEO rankings, and communicate your brand message effectively across all digital platforms.",
      ar: "خدمات كتابة المحتوى المهنية التي تشرك جمهورك، وتحسن ترتيبات تحسين محركات البحث، وتنقل رسالة علامتك التجارية بفعالية عبر جميع المنصات الرقمية.",
    },
    description: {
      en: "Tell your story with compelling content that converts. Our writers create blog posts, web copy, social media content, and marketing materials that resonate with your audience.",
      ar: "احك قصتك بمحتوى مقنع يحول. يقوم كتابنا بإنشاء منشورات المدونة، ونسخ الويب، ومحتوى وسائل التواصل الاجتماعي، والمواد التسويقية التي تتردد صداها مع جمهورك.",
    },
    benefits: {
      en: [
        "SEO-optimized content",
        "Brand voice consistency",
        "Audience engagement",
        "Increased conversions",
      ],
      ar: [
        "محتوى محسن لمحركات البحث",
        "اتساق صوت العلامة التجارية",
        "مشاركة الجمهور",
        "زيادة التحويلات",
      ],
    },
    features: {
      en: [
        "Blog writing",
        "Web copywriting",
        "Social media content",
        "Email campaigns",
      ],
      ar: [
        "كتابة المدونة",
        "كتابة نسخ الويب",
        "محتوى وسائل التواصل الاجتماعي",
        "حملات البريد الإلكتروني",
      ],
    },
    targetAudience: {
      en: "Content marketers, bloggers, business owners",
      ar: "مسوقي المحتوى، المدونون، أصحاب الأعمال",
    },
    slug: "content-writing",
    imgsrc: "https://cdn-icons-png.flaticon.com/512/2921/2921222.png",
    fullImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80",
    stats: [
      {
        label: { en: "Articles Written", ar: "مقالات مكتوبة" },
        value: "5,000+",
        icon: "edit",
      },
      {
        label: { en: "Avg. Word Count", ar: "متوسط عدد الكلمات" },
        value: "2M+",
        icon: "file",
      },
      {
        label: { en: "Client Satisfaction", ar: "رضا العملاء" },
        value: "98%",
        icon: "star",
      },
    ],
    processSteps: [
      {
        title: { en: "Content Brief", ar: "ملخص المحتوى" },
        description: {
          en: "We define topics, target keywords, tone, and objectives for each piece.",
          ar: "نحدد الموضوعات والكلمات المفتاحية المستهدفة والنبرة والأهداف لكل قطعة.",
        },
        icon: "clipboard",
      },
      {
        title: { en: "Research & Outline", ar: "البحث والمخطط" },
        description: {
          en: "We conduct thorough research and create detailed content outlines.",
          ar: "نجري بحثًا شاملًا وننشئ مخططات محتوى مفصلة.",
        },
        icon: "search",
      },
      {
        title: { en: "Writing & Editing", ar: "الكتابة والتحرير" },
        description: {
          en: "Our writers create compelling content that goes through rigorous editing.",
          ar: "ينشئ كتابنا محتوى مقنعًا يمر بتحرير دقيق.",
        },
        icon: "edit",
      },
      {
        title: { en: "Review & Publish", ar: "المراجعة والنشر" },
        description: {
          en: "Final review with client feedback integration and publishing support.",
          ar: "مراجعة نهائية مع دمج ملاحظات العميل ودعم النشر.",
        },
        icon: "check",
      },
    ],
    faq: [
      {
        question: {
          en: "What types of content do you write?",
          ar: "ما أنواع المحتوى الذي تكتبونه؟",
        },
        answer: {
          en: "We write blog posts, website copy, whitepapers, case studies, social media posts, and email campaigns.",
          ar: "نكتب منشورات مدونة، ونسخ مواقع، وأوراق بيضاء، ودراسات حالة، ومنشورات تواصل اجتماعي، وحملات بريد إلكتروني.",
        },
      },
      {
        question: {
          en: "Is the content SEO-optimized?",
          ar: "هل المحتوى محسّن لمحركات البحث؟",
        },
        answer: {
          en: "Yes, all content is optimized for search engines while maintaining readability and engagement.",
          ar: "نعم، كل المحتوى محسّن لمحركات البحث مع الحفاظ على القراءة والتفاعل.",
        },
      },
      {
        question: {
          en: "How many revisions are included?",
          ar: "كم جولة مراجعة مشمولة؟",
        },
        answer: {
          en: "Each piece includes 2 revision rounds. Additional revisions can be arranged if needed.",
          ar: "كل قطعة تتضمن جولتي مراجعة. يمكن ترتيب جولات إضافية إذا لزم الأمر.",
        },
      },
    ],
    packages: [
      {
        name: { en: "Starter", ar: "المبتدئ" },
        price: { en: "$599/mo", ar: "599$/شهر" },
        features: {
          en: [
            "4 blog posts",
            "SEO optimization",
            "Basic research",
            "1 revision round",
          ],
          ar: ["4 مقالات مدونة", "تحسين SEO", "بحث أساسي", "جولة مراجعة واحدة"],
        },
        isPopular: false,
      },
      {
        name: { en: "Professional", ar: "الاحترافي" },
        price: { en: "$1,499/mo", ar: "1,499$/شهر" },
        features: {
          en: [
            "8 blog posts",
            "Website copy",
            "SEO optimization",
            "Content calendar",
            "2 revision rounds",
          ],
          ar: [
            "8 مقالات مدونة",
            "نسخ الموقع",
            "تحسين SEO",
            "تقويم المحتوى",
            "جولتي مراجعة",
          ],
        },
        isPopular: true,
      },
      {
        name: { en: "Enterprise", ar: "المؤسسات" },
        price: { en: "$2,999/mo", ar: "2,999$/شهر" },
        features: {
          en: [
            "16+ articles",
            "Whitepapers & case studies",
            "Dedicated writer",
            "Content strategy",
            "Unlimited revisions",
          ],
          ar: [
            "16+ مقال",
            "أوراق بيضاء ودراسات حالة",
            "كاتب مخصص",
            "استراتيجية المحتوى",
            "مراجعات غير محدودة",
          ],
        },
        isPopular: false,
      },
    ],
  },
  {
    id: 10,
    category: "marketing",
    title: {
      en: "Social Media Management",
      ar: "إدارة وسائل التواصل الاجتماعي",
    },
    smallDesc: {
      en: "Comprehensive social media management services including content creation, community engagement, advertising campaigns, and performance analytics across all major platforms.",
      ar: "خدمات إدارة وسائل التواصل الاجتماعي الشاملة بما في ذلك إنشاء المحتوى، ومشاركة المجتمع، والحملات الإعلانية، وتحليلات الأداء عبر جميع المنصات الرئيسية.",
    },
    description: {
      en: "Build a strong social media presence with our expert management services. We create engaging content, manage communities, and run targeted campaigns that grow your following.",
      ar: "بناء حضور قوي لوسائل التواصل الاجتماعي مع خدمات الإدارة الخبيرة لدينا. نحن ننشئ محتوى جذاب، وندير المجتمعات، وننفذ حملات مستهدفة تنمي متابعيك.",
    },
    benefits: {
      en: [
        "Increased brand awareness",
        "Higher engagement rates",
        "Community growth",
        "Lead generation",
      ],
      ar: [
        "زيادة الوعي بالعلامة التجارية",
        "معدلات مشاركة أعلى",
        "نمو المجتمع",
        "توليد العملاء المحتملين",
      ],
    },
    features: {
      en: [
        "Content scheduling",
        "Community management",
        "Paid advertising",
        "Analytics reporting",
      ],
      ar: [
        "جدولة المحتوى",
        "إدارة المجتمع",
        "الإعلانات المدفوعة",
        "تقارير التحليلات",
      ],
    },
    targetAudience: {
      en: "Small businesses, influencers, e-commerce brands",
      ar: "الشركات الصغيرة، المؤثرون، علامات التجارة الإلكترونية",
    },
    slug: "social-media-management",
    imgsrc: "https://cdn-icons-png.flaticon.com/512/3059/3059997.png",
    fullImage:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
    stats: [
      {
        label: { en: "Accounts Managed", ar: "حسابات تم إدارتها" },
        value: "500+",
        icon: "users",
      },
      {
        label: { en: "Avg. Engagement", ar: "متوسط التفاعل" },
        value: "+180%",
        icon: "trending",
      },
      {
        label: { en: "Followers Gained", ar: "متابعين مكتسبين" },
        value: "1M+",
        icon: "heart",
      },
    ],
    processSteps: [
      {
        title: { en: "Social Audit", ar: "تدقيق التواصل الاجتماعي" },
        description: {
          en: "We analyze your current social presence and identify growth opportunities.",
          ar: "نحلل حضورك الحالي على التواصل الاجتماعي ونحدد فرص النمو.",
        },
        icon: "search",
      },
      {
        title: { en: "Content Strategy", ar: "استراتيجية المحتوى" },
        description: {
          en: "We develop a content calendar tailored to your audience and goals.",
          ar: "نطور تقويم محتوى مصمم لجمهورك وأهدافك.",
        },
        icon: "plan",
      },
      {
        title: { en: "Create & Schedule", ar: "الإنشاء والجدولة" },
        description: {
          en: "We create engaging content and schedule posts for optimal timing.",
          ar: "ننشئ محتوى جذابًا ونجدول المنشورات للتوقيت الأمثل.",
        },
        icon: "edit",
      },
      {
        title: { en: "Engage & Analyze", ar: "التفاعل والتحليل" },
        description: {
          en: "We manage community engagement and provide detailed analytics reports.",
          ar: "ندير تفاعل المجتمع ونقدم تقارير تحليلات مفصلة.",
        },
        icon: "chart",
      },
    ],
    faq: [
      {
        question: {
          en: "Which platforms do you manage?",
          ar: "ما المنصات التي تديرونها؟",
        },
        answer: {
          en: "We manage Instagram, Facebook, Twitter/X, LinkedIn, TikTok, and YouTube.",
          ar: "ندير Instagram و Facebook و Twitter/X و LinkedIn و TikTok و YouTube.",
        },
      },
      {
        question: { en: "How often will you post?", ar: "كم مرة ستنشرون؟" },
        answer: {
          en: "Posting frequency depends on your package, ranging from 3 posts/week to daily posting.",
          ar: "يعتمد تكرار النشر على حزمتك، من 3 منشورات/أسبوع إلى النشر اليومي.",
        },
      },
      {
        question: {
          en: "Do you handle paid social ads?",
          ar: "هل تتعاملون مع الإعلانات المدفوعة؟",
        },
        answer: {
          en: "Yes, we create and manage paid campaigns across all major social platforms.",
          ar: "نعم، ننشئ وندير حملات مدفوعة عبر جميع المنصات الاجتماعية الرئيسية.",
        },
      },
    ],
    packages: [
      {
        name: { en: "Essentials", ar: "الأساسيات" },
        price: { en: "$999/mo", ar: "999$/شهر" },
        features: {
          en: [
            "2 platforms",
            "12 posts/month",
            "Community management",
            "Monthly report",
          ],
          ar: ["منصتين", "12 منشور/شهر", "إدارة المجتمع", "تقرير شهري"],
        },
        isPopular: false,
      },
      {
        name: { en: "Growth", ar: "النمو" },
        price: { en: "$2,499/mo", ar: "2,499$/شهر" },
        features: {
          en: [
            "4 platforms",
            "20 posts/month",
            "Stories & reels",
            "Community management",
            "Ad campaigns",
            "Bi-weekly reports",
          ],
          ar: [
            "4 منصات",
            "20 منشور/شهر",
            "ستوريز وريلز",
            "إدارة المجتمع",
            "حملات إعلانية",
            "تقارير نصف شهرية",
          ],
        },
        isPopular: true,
      },
      {
        name: { en: "Premium", ar: "المتميز" },
        price: { en: "$4,999/mo", ar: "4,999$/شهر" },
        features: {
          en: [
            "All platforms",
            "Daily posting",
            "Video production",
            "Influencer outreach",
            "Dedicated manager",
            "Weekly reports",
          ],
          ar: [
            "جميع المنصات",
            "نشر يومي",
            "إنتاج الفيديو",
            "التواصل مع المؤثرين",
            "مدير مخصص",
            "تقارير أسبوعية",
          ],
        },
        isPopular: false,
      },
    ],
  },
  {
    id: 11,
    category: "design",
    title: {
      en: "Graphic Design",
      ar: "التصميم الجرافيكي",
    },
    smallDesc: {
      en: "Creative graphic design services for print and digital media, including brochures, banners, infographics, and marketing materials that capture attention and communicate effectively.",
      ar: "خدمات التصميم الجرافيكي الإبداعية للوسائط المطبوعة والرقمية، بما في ذلك الكتيبات واللافتات والرسوم البيانية والمواد التسويقية التي تجذب الانتباه وتتواصل بفعالية.",
    },
    description: {
      en: "Transform your ideas into stunning visual designs. Our graphic designers create impactful visuals that strengthen your brand identity and communicate your message clearly.",
      ar: "حوّل أفكارك إلى تصميمات بصرية مذهلة. يقوم مصممو الجرافيك لدينا بإنشاء مواد بصرية مؤثرة تعزز هوية علامتك التجارية وتنقل رسالتك بوضوح.",
    },
    benefits: {
      en: [
        "Professional visual identity",
        "Brand consistency",
        "Effective communication",
        "Enhanced marketing materials",
      ],
      ar: [
        "هوية بصرية احترافية",
        "اتساق العلامة التجارية",
        "تواصل فعال",
        "تحسين المواد التسويقية",
      ],
    },
    features: {
      en: [
        "Print design",
        "Digital graphics",
        "Infographic creation",
        "Marketing collateral",
      ],
      ar: [
        "تصميم الطباعة",
        "الرسوم الرقمية",
        "إنشاء الرسوم البيانية",
        "المواد التسويقية الداعمة",
      ],
    },
    targetAudience: {
      en: "Marketing teams, event organizers, publishing companies",
      ar: "فرق التسويق، منظمي الأحداث، شركات النشر",
    },
    slug: "graphic-design",
    imgsrc: "https://cdn-icons-png.flaticon.com/512/3076/3076395.png",
    fullImage:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    stats: [
      {
        label: { en: "Designs Delivered", ar: "تصاميم تم تسليمها" },
        value: "2,500+",
        icon: "palette",
      },
      {
        label: { en: "Client Satisfaction", ar: "رضا العملاء" },
        value: "97%",
        icon: "star",
      },
      {
        label: { en: "Avg. Turnaround", ar: "متوسط وقت التسليم" },
        value: "48h",
        icon: "clock",
      },
    ],
    processSteps: [
      {
        title: { en: "Brief & Requirements", ar: "الملخص والمتطلبات" },
        description: {
          en: "We gather your design requirements, target audience, and creative direction.",
          ar: "نجمع متطلبات التصميم والجمهور المستهدف والاتجاه الإبداعي.",
        },
        icon: "clipboard",
      },
      {
        title: { en: "Concept Creation", ar: "إنشاء المفهوم" },
        description: {
          en: "Our designers create initial concepts based on your brief and brand guidelines.",
          ar: "ينشئ مصممونا مفاهيم أولية بناءً على ملخصك ودلائل علامتك التجارية.",
        },
        icon: "idea",
      },
      {
        title: { en: "Refinement", ar: "التحسين" },
        description: {
          en: "We refine the selected concept with your feedback until it's perfect.",
          ar: "نحسن المفهوم المختار بملاحظاتك حتى يصبح مثاليًا.",
        },
        icon: "design",
      },
      {
        title: { en: "Final Delivery", ar: "التسليم النهائي" },
        description: {
          en: "We deliver print-ready and web-optimized files in all required formats.",
          ar: "نقدم ملفات جاهزة للطباعة ومحسّنة للويب بجميع التنسيقات المطلوبة.",
        },
        icon: "download",
      },
    ],
    faq: [
      {
        question: {
          en: "What file formats do you deliver?",
          ar: "ما تنسيقات الملفات التي تقدمونها؟",
        },
        answer: {
          en: "We deliver AI, PSD, PDF, PNG, SVG, and JPG files based on your needs.",
          ar: "نقدم ملفات AI و PSD و PDF و PNG و SVG و JPG بناءً على احتياجاتك.",
        },
      },
      {
        question: { en: "How fast can you deliver?", ar: "ما سرعة التسليم؟" },
        answer: {
          en: "Standard delivery is 3-5 business days. Rush delivery available within 48 hours.",
          ar: "التسليم القياسي 3-5 أيام عمل. يتوفر التسليم السريع خلال 48 ساعة.",
        },
      },
      {
        question: {
          en: "Do you offer unlimited revisions?",
          ar: "هل تقدمون مراجعات غير محدودة؟",
        },
        answer: {
          en: "Our premium packages include unlimited revisions. Standard packages include 3 rounds.",
          ar: "حزمنا المتميزة تتضمن مراجعات غير محدودة. الحزم القياسية تتضمن 3 جولات.",
        },
      },
    ],
    packages: [
      {
        name: { en: "Basic", ar: "الأساسي" },
        price: { en: "$499", ar: "499$" },
        features: {
          en: [
            "2 design concepts",
            "3 revision rounds",
            "Print-ready files",
            "Source files",
          ],
          ar: [
            "2 مفهوم تصميم",
            "3 جولات مراجعة",
            "ملفات جاهزة للطباعة",
            "ملفات المصدر",
          ],
        },
        isPopular: false,
      },
      {
        name: { en: "Professional", ar: "الاحترافي" },
        price: { en: "$999", ar: "999$" },
        features: {
          en: [
            "4 design concepts",
            "5 revision rounds",
            "All file formats",
            "Social media variants",
            "Priority support",
          ],
          ar: [
            "4 مفاهيم تصميم",
            "5 جولات مراجعة",
            "جميع التنسيقات",
            "متغيرات التواصل الاجتماعي",
            "دعم أولوية",
          ],
        },
        isPopular: true,
      },
      {
        name: { en: "Unlimited", ar: "غير محدود" },
        price: { en: "$2,499/mo", ar: "2,499$/شهر" },
        features: {
          en: [
            "Unlimited designs",
            "Unlimited revisions",
            "Dedicated designer",
            "Same-day delivery",
            "Brand consistency",
          ],
          ar: [
            "تصاميم غير محدودة",
            "مراجعات غير محدودة",
            "مصمم مخصص",
            "تسليم في نفس اليوم",
            "اتساق العلامة التجارية",
          ],
        },
        isPopular: false,
      },
    ],
  },
  {
    id: 12,
    category: "development",
    title: {
      en: "Cloud Solutions",
      ar: "الحلول السحابية",
    },
    smallDesc: {
      en: "Comprehensive cloud computing solutions including migration, infrastructure setup, security implementation, and ongoing management for scalable business operations.",
      ar: "حلول الحوسبة السحابية الشاملة بما في ذلك الترحيل، وإعداد البنية التحتية، وتنفيذ الأمان، والإدارة المستمرة لعمليات الأعمال القابلة للتوسع.",
    },
    description: {
      en: "Modernize your IT infrastructure with our cloud solutions. We help businesses migrate to the cloud, optimize costs, and ensure secure, scalable operations.",
      ar: "حدّث البنية التحتية لتكنولوجيا المعلومات الخاصة بك مع حلولنا السحابية. نحن نساعد الشركات على الانتقال إلى السحابة، وتحسين التكاليف، وضمان العمليات الآمنة والقابلة للتوسع.",
    },
    benefits: {
      en: [
        "Cost reduction",
        "Scalability",
        "Enhanced security",
        "Improved accessibility",
      ],
      ar: [
        "تقليل التكلفة",
        "قابلية التوسع",
        "أمان محسّن",
        "تحسين إمكانية الوصول",
      ],
    },
    features: {
      en: [
        "Cloud migration",
        "Infrastructure management",
        "Security monitoring",
        "Backup solutions",
      ],
      ar: [
        "الترحيل السحابي",
        "إدارة البنية التحتية",
        "مراقبة الأمان",
        "حلول النسخ الاحتياطي",
      ],
    },
    targetAudience: {
      en: "Enterprises, growing businesses, IT departments",
      ar: "المؤسسات، الشركات النامية، أقسام تكنولوجيا المعلومات",
    },
    slug: "cloud-solutions",
    imgsrc: "https://cdn-icons-png.flaticon.com/512/2282/2282188.png",
    fullImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
    stats: [
      {
        label: { en: "Migrations Completed", ar: "ترحيلات مكتملة" },
        value: "150+",
        icon: "cloud",
      },
      {
        label: { en: "Cost Savings", ar: "توفير التكلفة" },
        value: "-40%",
        icon: "trending",
      },
      {
        label: { en: "Uptime SLA", ar: "اتفاقية وقت التشغيل" },
        value: "99.99%",
        icon: "shield",
      },
    ],
    processSteps: [
      {
        title: { en: "Assessment", ar: "التقييم" },
        description: {
          en: "We evaluate your current infrastructure and cloud readiness.",
          ar: "نقيّم بنيتك التحتية الحالية واستعدادك للسحابة.",
        },
        icon: "search",
      },
      {
        title: { en: "Architecture Design", ar: "تصميم البنية" },
        description: {
          en: "We design a scalable, secure cloud architecture tailored to your needs.",
          ar: "نصمم بنية سحابية قابلة للتوسع وآمنة مصممة لاحتياجاتك.",
        },
        icon: "plan",
      },
      {
        title: { en: "Migration", ar: "الترحيل" },
        description: {
          en: "We execute a seamless migration with zero downtime and data integrity.",
          ar: "ننفذ ترحيلاً سلسًا بدون توقف ومع سلامة البيانات.",
        },
        icon: "cloud",
      },
      {
        title: { en: "Optimization & Monitoring", ar: "التحسين والمراقبة" },
        description: {
          en: "We optimize costs and set up 24/7 monitoring and alerts.",
          ar: "نحسن التكاليف ونعد مراقبة وتنبيهات على مدار الساعة.",
        },
        icon: "chart",
      },
    ],
    faq: [
      {
        question: {
          en: "Which cloud providers do you support?",
          ar: "ما مزودي السحابة الذين تدعمونهم؟",
        },
        answer: {
          en: "We support AWS, Azure, Google Cloud, and hybrid cloud environments.",
          ar: "ندعم AWS و Azure و Google Cloud وبيئات السحابة الهجينة.",
        },
      },
      {
        question: {
          en: "Will there be downtime during migration?",
          ar: "هل سيكون هناك توقف أثناء الترحيل؟",
        },
        answer: {
          en: "We use phased migration strategies to ensure zero or minimal downtime.",
          ar: "نستخدم استراتيجيات ترحيل مرحلية لضمان انعدام أو تقليل وقت التوقف.",
        },
      },
      {
        question: {
          en: "How much can cloud save us?",
          ar: "كم يمكن أن توفر لنا السحابة؟",
        },
        answer: {
          en: "Most clients see 30-50% cost reduction after proper cloud optimization.",
          ar: "يرى معظم العملاء تخفيضًا في التكلفة بنسبة 30-50% بعد التحسين السحابي المناسب.",
        },
      },
    ],
    packages: [
      {
        name: { en: "Cloud Starter", ar: "السحابة المبتدئة" },
        price: { en: "$2,999", ar: "2,999$" },
        features: {
          en: [
            "Single cloud setup",
            "Basic migration",
            "Security configuration",
            "30-day monitoring",
          ],
          ar: [
            "إعداد سحابة واحدة",
            "ترحيل أساسي",
            "تكوين الأمان",
            "مراقبة 30 يوم",
          ],
        },
        isPopular: false,
      },
      {
        name: { en: "Cloud Pro", ar: "السحابة الاحترافية" },
        price: { en: "$7,999", ar: "7,999$" },
        features: {
          en: [
            "Multi-cloud architecture",
            "Full migration",
            "Auto-scaling setup",
            "Cost optimization",
            "90-day monitoring",
          ],
          ar: [
            "بنية سحابة متعددة",
            "ترحيل كامل",
            "إعداد التوسع التلقائي",
            "تحسين التكلفة",
            "مراقبة 90 يوم",
          ],
        },
        isPopular: true,
      },
      {
        name: { en: "Cloud Enterprise", ar: "السحابة للمؤسسات" },
        price: { en: "Custom", ar: "مخصص" },
        features: {
          en: [
            "Hybrid cloud design",
            "Zero-downtime migration",
            "Disaster recovery",
            "24/7 managed services",
            "Dedicated team",
          ],
          ar: [
            "تصميم سحابة هجينة",
            "ترحيل بدون توقف",
            "استعادة الكوارث",
            "خدمات مُدارة 24/7",
            "فريق مخصص",
          ],
        },
        isPopular: false,
      },
    ],
  },
  {
    id: 13,
    category: "data-security",
    title: {
      en: "Data Analytics",
      ar: "تحليل البيانات",
    },
    smallDesc: {
      en: "Advanced data analytics services that transform raw data into actionable insights, helping businesses make informed decisions through comprehensive reporting and visualization.",
      ar: "خدمات تحليل البيانات المتقدمة التي تحول البيانات الخام إلى رؤى قابلة للتنفيذ، مما يساعد الشركات على اتخاذ قرارات مدروسة من خلال التقارير الشاملة والتصور.",
    },
    description: {
      en: "Unlock the power of your data with our analytics solutions. We help you collect, process, and analyze data to identify trends, optimize operations, and drive growth.",
      ar: "اكتشف قوة بياناتك مع حلول التحليلات لدينا. نحن نساعدك في جمع ومعالجة وتحليل البيانات لتحديد الاتجاهات وتحسين العمليات ودفع النمو.",
    },
    benefits: {
      en: [
        "Data-driven decisions",
        "Performance insights",
        "Trend identification",
        "ROI optimization",
      ],
      ar: [
        "قرارات قائمة على البيانات",
        "رؤى الأداء",
        "تحديد الاتجاهات",
        "تحسين العائد على الاستثمار",
      ],
    },
    features: {
      en: [
        "Data visualization",
        "Predictive modeling",
        "Custom dashboards",
        "Automated reporting",
      ],
      ar: [
        "تصور البيانات",
        "النمذجة التنبؤية",
        "لوحات التحكم المخصصة",
        "التقارير الآلية",
      ],
    },
    targetAudience: {
      en: "Data-driven companies, research organizations, marketing teams",
      ar: "الشركات القائمة على البيانات، منظمات البحث، فرق التسويق",
    },
    slug: "data-analytics",
    imgsrc: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png",
    fullImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    stats: [
      {
        label: { en: "Dashboards Built", ar: "لوحات تحكم تم بناؤها" },
        value: "350+",
        icon: "chart",
      },
      {
        label: { en: "Data Processed", ar: "بيانات تم معالجتها" },
        value: "50TB+",
        icon: "database",
      },
      {
        label: { en: "Decision Accuracy", ar: "دقة القرارات" },
        value: "+75%",
        icon: "target",
      },
    ],
    processSteps: [
      {
        title: { en: "Data Assessment", ar: "تقييم البيانات" },
        description: {
          en: "We audit your data sources, quality, and existing analytics infrastructure.",
          ar: "ندقق مصادر بياناتك وجودتها وبنية التحليلات الحالية.",
        },
        icon: "search",
      },
      {
        title: { en: "Data Pipeline Design", ar: "تصميم خط البيانات" },
        description: {
          en: "We design efficient data pipelines for collection, cleaning, and storage.",
          ar: "نصمم خطوط بيانات فعالة للجمع والتنظيف والتخزين.",
        },
        icon: "pipeline",
      },
      {
        title: { en: "Dashboard Development", ar: "تطوير لوحة التحكم" },
        description: {
          en: "We build interactive dashboards with actionable visualizations.",
          ar: "نبني لوحات تحكم تفاعلية مع تصورات قابلة للتنفيذ.",
        },
        icon: "design",
      },
      {
        title: { en: "Insights & Optimization", ar: "الرؤى والتحسين" },
        description: {
          en: "We deliver insights and continuously optimize models for accuracy.",
          ar: "نقدم رؤى ونحسن النماذج باستمرار للدقة.",
        },
        icon: "chart",
      },
    ],
    faq: [
      {
        question: {
          en: "What tools do you use for analytics?",
          ar: "ما الأدوات التي تستخدمونها للتحليلات؟",
        },
        answer: {
          en: "We use Power BI, Tableau, Google Analytics, Python, and custom solutions.",
          ar: "نستخدم Power BI و Tableau و Google Analytics و Python وحلول مخصصة.",
        },
      },
      {
        question: {
          en: "Can you work with our existing data?",
          ar: "هل يمكنكم العمل مع بياناتنا الحالية؟",
        },
        answer: {
          en: "Yes, we integrate with your existing databases, CRMs, and data warehouses.",
          ar: "نعم، نكامل مع قواعد البيانات وأنظمة إدارة العملاء ومستودعات البيانات الحالية.",
        },
      },
      {
        question: {
          en: "How long to build a dashboard?",
          ar: "كم يستغرق بناء لوحة تحكم؟",
        },
        answer: {
          en: "Simple dashboards take 1-2 weeks, while complex ones may take 4-6 weeks.",
          ar: "لوحات التحكم البسيطة تستغرق 1-2 أسبوع، بينما المعقدة قد تستغرق 4-6 أسابيع.",
        },
      },
    ],
    packages: [
      {
        name: { en: "Basic Analytics", ar: "التحليلات الأساسية" },
        price: { en: "$1,999", ar: "1,999$" },
        features: {
          en: [
            "Data audit",
            "1 dashboard",
            "Basic visualizations",
            "Monthly report",
          ],
          ar: [
            "تدقيق البيانات",
            "لوحة تحكم واحدة",
            "تصورات أساسية",
            "تقرير شهري",
          ],
        },
        isPopular: false,
      },
      {
        name: { en: "Advanced Analytics", ar: "التحليلات المتقدمة" },
        price: { en: "$5,999", ar: "5,999$" },
        features: {
          en: [
            "Data pipeline setup",
            "3 dashboards",
            "Predictive models",
            "Automated reports",
            "Training session",
          ],
          ar: [
            "إعداد خط البيانات",
            "3 لوحات تحكم",
            "نماذج تنبؤية",
            "تقارير آلية",
            "جلسة تدريبية",
          ],
        },
        isPopular: true,
      },
      {
        name: { en: "Enterprise Analytics", ar: "التحليلات للمؤسسات" },
        price: { en: "Custom", ar: "مخصص" },
        features: {
          en: [
            "Custom data warehouse",
            "Unlimited dashboards",
            "ML models",
            "Real-time analytics",
            "Dedicated analyst",
          ],
          ar: [
            "مستودع بيانات مخصص",
            "لوحات تحكم غير محدودة",
            "نماذج تعلم آلي",
            "تحليلات فورية",
            "محلل مخصص",
          ],
        },
        isPopular: false,
      },
    ],
  },
  {
    id: 14,
    category: "data-security",
    title: {
      en: "Cybersecurity Services",
      ar: "خدمات الأمن السيبراني",
    },
    smallDesc: {
      en: "Comprehensive cybersecurity solutions including threat assessment, security audits, penetration testing, and ongoing monitoring to protect your digital assets.",
      ar: "حلول الأمن السيبراني الشاملة بما في ذلك تقييم التهديدات، وتدقيق الأمان، واختبار الاختراق، والمراقبة المستمرة لحماية أصولك الرقمية.",
    },
    description: {
      en: "Protect your business from cyber threats with our comprehensive security services. We implement robust security measures and provide ongoing monitoring to keep your data safe.",
      ar: "احم عملك من التهديدات السيبرانية مع خدمات الأمان الشاملة لدينا. نحن ننفذ تدابير أمنية قوية ونوفر مراقبة مستمرة للحفاظ على أمان بياناتك.",
    },
    benefits: {
      en: [
        "Enhanced security posture",
        "Compliance assurance",
        "Risk mitigation",
        "24/7 monitoring",
      ],
      ar: [
        "تعزيز الوضع الأمني",
        "ضمان الامتثال",
        "تخفيف المخاطر",
        "مراقبة على مدار الساعة",
      ],
    },
    features: {
      en: [
        "Security audits",
        "Penetration testing",
        "Incident response",
        "Security training",
      ],
      ar: [
        "تدقيق الأمان",
        "اختبار الاختراق",
        "الاستجابة للحوادث",
        "التدريب الأمني",
      ],
    },
    targetAudience: {
      en: "Financial institutions, healthcare providers, government agencies",
      ar: "المؤسسات المالية، مقدمي الرعاية الصحية، الوكالات الحكومية",
    },
    slug: "cybersecurity-services",
    imgsrc: "https://cdn-icons-png.flaticon.com/512/2092/2092063.png",
    fullImage:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    stats: [
      {
        label: { en: "Threats Blocked", ar: "تهديدات تم حظرها" },
        value: "10K+",
        icon: "shield",
      },
      {
        label: { en: "Audits Completed", ar: "تدقيقات مكتملة" },
        value: "200+",
        icon: "check",
      },
      {
        label: { en: "Response Time", ar: "وقت الاستجابة" },
        value: "<15min",
        icon: "clock",
      },
    ],
    processSteps: [
      {
        title: { en: "Security Assessment", ar: "تقييم الأمان" },
        description: {
          en: "We evaluate your current security posture and identify vulnerabilities.",
          ar: "نقيّم وضعك الأمني الحالي ونحدد نقاط الضعف.",
        },
        icon: "search",
      },
      {
        title: { en: "Penetration Testing", ar: "اختبار الاختراق" },
        description: {
          en: "We simulate real-world attacks to test your defenses.",
          ar: "نحاكي هجمات واقعية لاختبار دفاعاتك.",
        },
        icon: "shield",
      },
      {
        title: { en: "Implementation", ar: "التنفيذ" },
        description: {
          en: "We deploy security measures, firewalls, and monitoring systems.",
          ar: "ننفذ تدابير أمنية وجدران حماية وأنظمة مراقبة.",
        },
        icon: "code",
      },
      {
        title: { en: "Monitor & Respond", ar: "المراقبة والاستجابة" },
        description: {
          en: "We provide 24/7 monitoring and rapid incident response.",
          ar: "نوفر مراقبة على مدار الساعة واستجابة سريعة للحوادث.",
        },
        icon: "alert",
      },
    ],
    faq: [
      {
        question: {
          en: "How often should we do penetration testing?",
          ar: "كم مرة يجب إجراء اختبار الاختراق؟",
        },
        answer: {
          en: "We recommend at least annually, or after any major system changes.",
          ar: "نوصي بحد أدنى سنويًا، أو بعد أي تغييرات كبيرة في النظام.",
        },
      },
      {
        question: {
          en: "Do you offer compliance support?",
          ar: "هل تقدمون دعم الامتثال؟",
        },
        answer: {
          en: "Yes, we help with GDPR, ISO 27001, SOC 2, and industry-specific compliance.",
          ar: "نعم، نساعد مع GDPR و ISO 27001 و SOC 2 والامتثال الخاص بالصناعة.",
        },
      },
      {
        question: {
          en: "What happens if we get breached?",
          ar: "ماذا يحدث إذا تم اختراقنا؟",
        },
        answer: {
          en: "Our incident response team activates immediately to contain, investigate, and recover.",
          ar: "يتم تفعيل فريق الاستجابة للحوادث فورًا للاحتواء والتحقيق والاستعادة.",
        },
      },
    ],
    packages: [
      {
        name: { en: "Security Audit", ar: "تدقيق الأمان" },
        price: { en: "$3,999", ar: "3,999$" },
        features: {
          en: [
            "Vulnerability scan",
            "Security report",
            "Remediation plan",
            "Follow-up review",
          ],
          ar: ["فحص الثغرات", "تقرير أمني", "خطة معالجة", "مراجعة متابعة"],
        },
        isPopular: false,
      },
      {
        name: { en: "Protection", ar: "الحماية" },
        price: { en: "$7,999/mo", ar: "7,999$/شهر" },
        features: {
          en: [
            "Penetration testing",
            "Firewall setup",
            "24/7 monitoring",
            "Incident response",
            "Monthly reports",
          ],
          ar: [
            "اختبار الاختراق",
            "إعداد جدار الحماية",
            "مراقبة 24/7",
            "استجابة للحوادث",
            "تقارير شهرية",
          ],
        },
        isPopular: true,
      },
      {
        name: { en: "Fortress", ar: "القلعة" },
        price: { en: "Custom", ar: "مخصص" },
        features: {
          en: [
            "Full security suite",
            "Red team exercises",
            "Compliance management",
            "Dedicated SOC team",
            "Executive briefings",
          ],
          ar: [
            "مجموعة أمنية كاملة",
            "تمارين الفريق الأحمر",
            "إدارة الامتثال",
            "فريق SOC مخصص",
            "إحاطات تنفيذية",
          ],
        },
        isPopular: false,
      },
    ],
  },
  {
    id: 15,
    title: {
      en: "Business Consulting",
      ar: "الاستشارات التجارية",
    },
    smallDesc: {
      en: "Strategic business consulting services that help organizations improve operations, increase efficiency, and achieve sustainable growth through expert guidance and analysis.",
      ar: "خدمات الاستشارات التجارية الاستراتيجية التي تساعد المنظمات على تحسين العمليات، وزيادة الكفاءة، وتحقيق النمو المستدام من خلال التوجيه والتحليل الخبير.",
    },
    description: {
      en: "Transform your business with our strategic consulting services. We analyze your operations, identify opportunities, and develop actionable strategies for sustainable growth.",
      ar: "حوّل عملك مع خدمات الاستشارات الاستراتيجية لدينا. نحن نحلل عملياتك، ونحدد الفرص، ونطور استراتيجيات قابلة للتنفيذ للنمو المستدام.",
    },
    benefits: {
      en: [
        "Strategic planning",
        "Operational efficiency",
        "Market expansion",
        "Competitive advantage",
      ],
      ar: [
        "التخطيط الاستراتيجي",
        "الكفاءة التشغيلية",
        "التوسع في السوق",
        "الميزة التنافسية",
      ],
    },
    features: {
      en: [
        "Business analysis",
        "Strategy development",
        "Process optimization",
        "Change management",
      ],
      ar: [
        "تحليل الأعمال",
        "تطوير الاستراتيجية",
        "تحسين العمليات",
        "إدارة التغيير",
      ],
    },
    targetAudience: {
      en: "SMEs, startups, established corporations",
      ar: "الشركات الصغيرة والمتوسطة، الشركات الناشئة، الشركات الراسخة",
    },
    slug: "business-consulting",
    imgsrc: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    fullImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    stats: [
      {
        label: { en: "Businesses Transformed", ar: "شركات تم تحويلها" },
        value: "180+",
        icon: "building",
      },
      {
        label: { en: "Revenue Growth", ar: "نمو الإيرادات" },
        value: "+120%",
        icon: "trending",
      },
      {
        label: { en: "Client Retention", ar: "الاحتفاظ بالعملاء" },
        value: "95%",
        icon: "heart",
      },
    ],
    processSteps: [
      {
        title: { en: "Business Analysis", ar: "تحليل الأعمال" },
        description: {
          en: "We analyze your current operations, market position, and growth potential.",
          ar: "نحلل عملياتك الحالية وموقعك في السوق وإمكانيات النمو.",
        },
        icon: "search",
      },
      {
        title: { en: "Strategy Development", ar: "تطوير الاستراتيجية" },
        description: {
          en: "We create a tailored strategy with clear milestones and KPIs.",
          ar: "ننشئ استراتيجية مخصصة مع معالم ومؤشرات أداء واضحة.",
        },
        icon: "plan",
      },
      {
        title: { en: "Implementation Support", ar: "دعم التنفيذ" },
        description: {
          en: "We guide your team through execution with hands-on support.",
          ar: "نرشد فريقك خلال التنفيذ بدعم عملي.",
        },
        icon: "launch",
      },
      {
        title: { en: "Review & Scale", ar: "المراجعة والتوسع" },
        description: {
          en: "We review results, optimize strategies, and plan for scaling.",
          ar: "نراجع النتائج ونحسن الاستراتيجيات ونخطط للتوسع.",
        },
        icon: "scale",
      },
    ],
    faq: [
      {
        question: {
          en: "What industries do you consult for?",
          ar: "ما الصناعات التي تستشيرون لها؟",
        },
        answer: {
          en: "We work across technology, retail, healthcare, finance, and manufacturing sectors.",
          ar: "نعمل عبر قطاعات التكنولوجيا والتجزئة والرعاية الصحية والمالية والتصنيع.",
        },
      },
      {
        question: {
          en: "How long does a consulting engagement last?",
          ar: "كم تستغرق فترة الاستشارة؟",
        },
        answer: {
          en: "Typically 3-6 months for strategy projects, with ongoing advisory available.",
          ar: "عادةً 3-6 أشهر لمشاريع الاستراتيجية، مع استشارات مستمرة متاحة.",
        },
      },
      {
        question: {
          en: "Do you work with startups?",
          ar: "هل تعملون مع الشركات الناشئة؟",
        },
        answer: {
          en: "Yes, we have specialized programs for early-stage and growth-stage startups.",
          ar: "نعم، لدينا برامج متخصصة للشركات الناشئة في مراحلها المبكرة والنمو.",
        },
      },
    ],
    packages: [
      {
        name: { en: "Advisory", ar: "الاستشارة" },
        price: { en: "$2,999/mo", ar: "2,999$/شهر" },
        features: {
          en: [
            "Monthly strategy sessions",
            "Market analysis",
            "Growth roadmap",
            "Email support",
          ],
          ar: [
            "جلسات استراتيجية شهرية",
            "تحليل السوق",
            "خريطة طريق النمو",
            "دعم بالبريد",
          ],
        },
        isPopular: false,
      },
      {
        name: { en: "Strategic", ar: "الاستراتيجي" },
        price: { en: "$6,999/mo", ar: "6,999$/شهر" },
        features: {
          en: [
            "Weekly sessions",
            "Full business audit",
            "Competitive analysis",
            "Implementation support",
            "Priority access",
          ],
          ar: [
            "جلسات أسبوعية",
            "تدقيق أعمال كامل",
            "تحليل تنافسي",
            "دعم التنفيذ",
            "وصول أولوية",
          ],
        },
        isPopular: true,
      },
      {
        name: { en: "Transformation", ar: "التحول" },
        price: { en: "Custom", ar: "مخصص" },
        features: {
          en: [
            "Dedicated consultant",
            "Full transformation plan",
            "Team training",
            "Board presentations",
            "Ongoing advisory",
          ],
          ar: [
            "مستشار مخصص",
            "خطة تحول كاملة",
            "تدريب الفريق",
            "عروض مجلس الإدارة",
            "استشارات مستمرة",
          ],
        },
        isPopular: false,
      },
    ],
  },
  {
    id: 16,
    title: {
      en: "Video Production",
      ar: "إنتاج الفيديو",
    },
    smallDesc: {
      en: "Professional video production services including corporate videos, promotional content, training materials, and social media videos that engage audiences and drive results.",
      ar: "خدمات إنتاج الفيديو المهنية بما في ذلك الفيديوهات المؤسسية، والمحتوى الترويجي، ومواد التدريب، وفيديوهات وسائل التواصل الاجتماعي التي تشرك الجماهير وتحقق النتائج.",
    },
    description: {
      en: "Bring your stories to life with our professional video production services. From concept to final edit, we create compelling videos that captivate your audience.",
      ar: "أحي قصصك مع خدمات إنتاج الفيديو المهنية لدينا. من المفهوم إلى التحرير النهائي، نحن ننشئ فيديوهات مقنعة تسحر جمهورك.",
    },
    benefits: {
      en: [
        "High-quality production",
        "Engaging storytelling",
        "Multi-platform optimization",
        "Professional equipment",
      ],
      ar: [
        "إنتاج عالي الجودة",
        "سرد جذاب",
        "تحسين متعدد المنصات",
        "معدات احترافية",
      ],
    },
    features: {
      en: ["Scriptwriting", "Filming", "Video editing", "Post-production"],
      ar: ["كتابة السيناريو", "التصوير", "تحرير الفيديو", "ما بعد الإنتاج"],
    },
    targetAudience: {
      en: "Marketing agencies, educational institutions, entertainment companies",
      ar: "وكالات التسويق، المؤسسات التعليمية، شركات الترفيه",
    },
    slug: "video-production",
    imgsrc: "https://cdn-icons-png.flaticon.com/512/1179/1179069.png",
    fullImage:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
    stats: [
      {
        label: { en: "Videos Produced", ar: "فيديوهات تم إنتاجها" },
        value: "800+",
        icon: "video",
      },
      {
        label: { en: "Total Views", ar: "مشاهدات إجمالية" },
        value: "50M+",
        icon: "eye",
      },
      {
        label: { en: "Client Satisfaction", ar: "رضا العملاء" },
        value: "98%",
        icon: "star",
      },
    ],
    processSteps: [
      {
        title: { en: "Concept & Script", ar: "المفهوم والسيناريو" },
        description: {
          en: "We develop creative concepts and write compelling scripts for your video.",
          ar: "نطور مفاهيم إبداعية ونكتب سيناريوهات مقنعة لفيديوك.",
        },
        icon: "edit",
      },
      {
        title: { en: "Pre-Production", ar: "ما قبل الإنتاج" },
        description: {
          en: "We plan locations, casting, equipment, and shooting schedules.",
          ar: "نخطط للمواقع والاختيار والمعدات وجداول التصوير.",
        },
        icon: "plan",
      },
      {
        title: { en: "Production", ar: "الإنتاج" },
        description: {
          en: "Our crew captures high-quality footage with professional equipment.",
          ar: "يصور فريقنا لقطات عالية الجودة بمعدات احترافية.",
        },
        icon: "camera",
      },
      {
        title: { en: "Post-Production", ar: "ما بعد الإنتاج" },
        description: {
          en: "We edit, color grade, add effects, and deliver the final video.",
          ar: "نحرر ونصحح الألوان ونضيف المؤثرات ونقدم الفيديو النهائي.",
        },
        icon: "film",
      },
    ],
    faq: [
      {
        question: {
          en: "What types of videos do you produce?",
          ar: "ما أنواع الفيديوهات التي تنتجونها؟",
        },
        answer: {
          en: "We produce corporate videos, commercials, product demos, testimonials, and social media content.",
          ar: "ننتج فيديوهات مؤسسية وإعلانات وعروض منتجات وشهادات عملاء ومحتوى تواصل اجتماعي.",
        },
      },
      {
        question: {
          en: "How long does production take?",
          ar: "كم يستغرق الإنتاج؟",
        },
        answer: {
          en: "A typical project takes 2-4 weeks from concept to final delivery.",
          ar: "المشروع النموذجي يستغرق 2-4 أسابيع من المفهوم إلى التسليم النهائي.",
        },
      },
      {
        question: {
          en: "Do you handle voiceovers and music?",
          ar: "هل تتعاملون مع التعليق الصوتي والموسيقى؟",
        },
        answer: {
          en: "Yes, we provide professional voiceover talent and licensed music for all projects.",
          ar: "نعم، نوفر مواهب تعليق صوتي احترافية وموسيقى مرخصة لجميع المشاريع.",
        },
      },
    ],
    packages: [
      {
        name: { en: "Social Video", ar: "فيديو التواصل الاجتماعي" },
        price: { en: "$1,499", ar: "1,499$" },
        features: {
          en: [
            "30-60 second video",
            "Script writing",
            "Professional editing",
            "2 revision rounds",
          ],
          ar: [
            "فيديو 30-60 ثانية",
            "كتابة السيناريو",
            "تحرير احترافي",
            "جولتي مراجعة",
          ],
        },
        isPopular: false,
      },
      {
        name: { en: "Corporate Video", ar: "فيديو مؤسسي" },
        price: { en: "$4,999", ar: "4,999$" },
        features: {
          en: [
            "2-3 minute video",
            "Full production crew",
            "Script & storyboard",
            "Color grading",
            "Background music",
            "3 revision rounds",
          ],
          ar: [
            "فيديو 2-3 دقائق",
            "فريق إنتاج كامل",
            "سيناريو وقصة مصورة",
            "تصحيح الألوان",
            "موسيقى خلفية",
            "3 جولات مراجعة",
          ],
        },
        isPopular: true,
      },
      {
        name: { en: "Premium Production", ar: "الإنتاج المتميز" },
        price: { en: "$12,999", ar: "12,999$" },
        features: {
          en: [
            "5+ minute video",
            "Multi-location shoot",
            "Drone footage",
            "Motion graphics",
            "Voiceover talent",
            "Unlimited revisions",
          ],
          ar: [
            "فيديو 5+ دقائق",
            "تصوير متعدد المواقع",
            "لقطات جوية",
            "رسوم متحركة",
            "مواهب صوتية",
            "مراجعات غير محدودة",
          ],
        },
        isPopular: false,
      },
    ],
  },
  {
    id: 17,
    title: {
      en: "IT Support",
      ar: "الدعم التقني",
    },
    smallDesc: {
      en: "Comprehensive IT support services including helpdesk support, system maintenance, troubleshooting, and technical assistance to keep your technology running smoothly.",
      ar: "خدمات الدعم التقني الشاملة بما في ذلك دعم مكتب المساعدة، وصيانة النظام، واستكشاف الأخطاء وإصلاحها، والمساعدة التقنية للحفاظ على تشغيل تقنيتك بسلاسة.",
    },
    description: {
      en: "Keep your technology running smoothly with our comprehensive IT support services. We provide 24/7 support, proactive maintenance, and expert troubleshooting.",
      ar: "حافظ على تشغيل تقنيتك بسلاسة مع خدمات الدعم التقني الشاملة لدينا. نحن نقدم الدعم على مدار الساعة، والصيانة الاستباقية، واستكشاف الأخطاء وإصلاحها بخبرة.",
    },
    benefits: {
      en: [
        "Minimized downtime",
        "Improved productivity",
        "Cost-effective solutions",
        "Expert assistance",
      ],
      ar: [
        "تقليل وقت التوقف",
        "تحسين الإنتاجية",
        "حلول فعالة من حيث التكلفة",
        "المساعدة الخبيرة",
      ],
    },
    features: {
      en: [
        "24/7 helpdesk",
        "Remote support",
        "System monitoring",
        "Hardware maintenance",
      ],
      ar: [
        "مكتب المساعدة على مدار الساعة",
        "الدعم عن بُعد",
        "مراقبة النظام",
        "صيانة الأجهزة",
      ],
    },
    targetAudience: {
      en: "Small businesses, remote teams, growing companies",
      ar: "الشركات الصغيرة، الفرق البعيدة، الشركات النامية",
    },
    slug: "it-support",
    imgsrc: "https://cdn-icons-png.flaticon.com/512/1705/1705312.png",
    fullImage:
      "https://images.unsplash.com/photo-1581092786450-7d5e2e9a1a6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    stats: [
      {
        label: { en: "Tickets Resolved", ar: "تذاكر تم حلها" },
        value: "25K+",
        icon: "check",
      },
      {
        label: { en: "Avg. Response Time", ar: "متوسط وقت الاستجابة" },
        value: "<5min",
        icon: "clock",
      },
      {
        label: { en: "Satisfaction Rate", ar: "معدل الرضا" },
        value: "99%",
        icon: "star",
      },
    ],
    processSteps: [
      {
        title: { en: "Onboarding", ar: "التأهيل" },
        description: {
          en: "We audit your IT environment and set up support channels and tools.",
          ar: "ندقق بيئة تكنولوجيا المعلومات الخاصة بك ونعد قنوات وأدوات الدعم.",
        },
        icon: "search",
      },
      {
        title: { en: "Monitoring Setup", ar: "إعداد المراقبة" },
        description: {
          en: "We deploy monitoring agents to proactively detect and prevent issues.",
          ar: "ننشر وكلاء مراقبة للكشف عن المشكلات ومنعها بشكل استباقي.",
        },
        icon: "monitor",
      },
      {
        title: { en: "Support Activation", ar: "تفعيل الدعم" },
        description: {
          en: "Your team gains access to our helpdesk with guaranteed response times.",
          ar: "يحصل فريقك على الوصول إلى مكتب المساعدة مع أوقات استجابة مضمونة.",
        },
        icon: "launch",
      },
      {
        title: { en: "Continuous Improvement", ar: "التحسين المستمر" },
        description: {
          en: "We review tickets, optimize systems, and provide monthly health reports.",
          ar: "نراجع التذاكر ونحسن الأنظمة ونقدم تقارير صحية شهرية.",
        },
        icon: "chart",
      },
    ],
    faq: [
      {
        question: {
          en: "What are your support hours?",
          ar: "ما هي ساعات الدعم؟",
        },
        answer: {
          en: "We offer business hours (8am-6pm) and 24/7 support plans based on your needs.",
          ar: "نقدم دعم ساعات العمل (8 صباحًا - 6 مساءً) وخطط دعم على مدار الساعة بناءً على احتياجاتك.",
        },
      },
      {
        question: {
          en: "Do you support remote workers?",
          ar: "هل تدعمون العاملين عن بُعد؟",
        },
        answer: {
          en: "Yes, we provide full remote support for distributed teams and home offices.",
          ar: "نعم، نوفر دعمًا كاملاً عن بُعد للفرق الموزعة والمكاتب المنزلية.",
        },
      },
      {
        question: {
          en: "How do I submit a support ticket?",
          ar: "كيف أقدم تذكرة دعم؟",
        },
        answer: {
          en: "Through our portal, email, phone, or chat — whichever is most convenient for you.",
          ar: "من خلال بوابتنا أو البريد الإلكتروني أو الهاتف أو الدردشة — أيهما أكثر راحة لك.",
        },
      },
    ],
    packages: [
      {
        name: { en: "Basic Support", ar: "الدعم الأساسي" },
        price: { en: "$499/mo", ar: "499$/شهر" },
        features: {
          en: [
            "Business hours support",
            "Remote assistance",
            "Email & phone",
            "Monthly report",
          ],
          ar: ["دعم ساعات العمل", "مساعدة عن بُعد", "بريد وهاتف", "تقرير شهري"],
        },
        isPopular: false,
      },
      {
        name: { en: "Pro Support", ar: "الدعم الاحترافي" },
        price: { en: "$1,499/mo", ar: "1,499$/شهر" },
        features: {
          en: [
            "Extended hours",
            "Remote & on-site",
            "Priority response",
            "Proactive monitoring",
            "Quarterly reviews",
          ],
          ar: [
            "ساعات ممتدة",
            "عن بُعد وفي الموقع",
            "استجابة أولوية",
            "مراقبة استباقية",
            "مراجعات ربع سنوية",
          ],
        },
        isPopular: true,
      },
      {
        name: { en: "Enterprise IT", ar: "تكنولوجيا المعلومات للمؤسسات" },
        price: { en: "$3,999/mo", ar: "3,999$/شهر" },
        features: {
          en: [
            "24/7 support",
            "Dedicated technician",
            "On-site visits",
            "Infrastructure management",
            "Custom SLA",
          ],
          ar: [
            "دعم 24/7",
            "فني مخصص",
            "زيارات موقع",
            "إدارة البنية التحتية",
            "اتفاقية خدمة مخصصة",
          ],
        },
        isPopular: false,
      },
    ],
  },
  {
    id: 18,
    title: {
      en: "Digital Transformation",
      ar: "التحول الرقمي",
    },
    smallDesc: {
      en: "Comprehensive digital transformation services that modernize business processes, integrate new technologies, and create digital-first strategies for competitive advantage.",
      ar: "خدمات التحول الرقمي الشاملة التي تحدث عمليات الأعمال، وتدمج التقنيات الجديدة، وتنشئ استراتيجيات رقمية أولاً للميزة التنافسية.",
    },
    description: {
      en: "Navigate the digital age with our transformation services. We help businesses adopt new technologies, optimize processes, and create digital-first strategies for the future.",
      ar: "تنقل في العصر الرقمي مع خدمات التحول لدينا. نحن نساعد الشركات على تبني التقنيات الجديدة، وتحسين العمليات، وإنشاء استراتيجيات رقمية أولاً للمستقبل.",
    },
    benefits: {
      en: [
        "Process automation",
        "Improved efficiency",
        "Digital innovation",
        "Future readiness",
      ],
      ar: [
        "أتمتة العمليات",
        "تحسين الكفاءة",
        "الابتكار الرقمي",
        "الاستعداد للمستقبل",
      ],
    },
    features: {
      en: [
        "Technology assessment",
        "Process digitization",
        "System integration",
        "Change management",
      ],
      ar: [
        "تقييم التكنولوجيا",
        "رقمنة العمليات",
        "تكامل النظام",
        "إدارة التغيير",
      ],
    },
    targetAudience: {
      en: "Traditional businesses, government agencies, healthcare organizations",
      ar: "الشركات التقليدية، الوكالات الحكومية، منظمات الرعاية الصحية",
    },
    slug: "digital-transformation",
    imgsrc: "https://cdn-icons-png.flaticon.com/512/3135/3135783.png",
    fullImage:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
    stats: [
      {
        label: { en: "Transformations Led", ar: "تحولات تم قيادتها" },
        value: "100+",
        icon: "transform",
      },
      {
        label: { en: "Efficiency Gain", ar: "زيادة الكفاءة" },
        value: "+60%",
        icon: "trending",
      },
      {
        label: { en: "Digital Adoption", ar: "التبني الرقمي" },
        value: "92%",
        icon: "users",
      },
    ],
    processSteps: [
      {
        title: { en: "Digital Assessment", ar: "التقييم الرقمي" },
        description: {
          en: "We evaluate your current digital maturity and identify transformation opportunities.",
          ar: "نقيّم نضجك الرقمي الحالي ونحدد فرص التحول.",
        },
        icon: "search",
      },
      {
        title: { en: "Roadmap Creation", ar: "إنشاء خريطة الطريق" },
        description: {
          en: "We create a phased digital transformation roadmap with clear milestones.",
          ar: "ننشئ خريطة طريق للتحول الرقمي على مراحل مع معالم واضحة.",
        },
        icon: "plan",
      },
      {
        title: { en: "Technology Implementation", ar: "تنفيذ التكنولوجيا" },
        description: {
          en: "We implement new technologies and integrate them with existing systems.",
          ar: "ننفذ تقنيات جديدة ونكاملها مع الأنظمة الحالية.",
        },
        icon: "code",
      },
      {
        title: { en: "Adoption & Scale", ar: "التبني والتوسع" },
        description: {
          en: "We train your team, measure adoption, and scale successful initiatives.",
          ar: "ندرب فريقك ونقيس التبني ونوسع المبادرات الناجحة.",
        },
        icon: "scale",
      },
    ],
    faq: [
      {
        question: {
          en: "Where do we start with digital transformation?",
          ar: "من أين نبدأ بالتحول الرقمي؟",
        },
        answer: {
          en: "We start with a comprehensive assessment to identify your biggest opportunities and quick wins.",
          ar: "نبدأ بتقييم شامل لتحديد أكبر فرصك والانتصارات السريعة.",
        },
      },
      {
        question: {
          en: "How long does transformation take?",
          ar: "كم يستغرق التحول؟",
        },
        answer: {
          en: "Full transformation typically takes 6-18 months depending on organization size and complexity.",
          ar: "التحول الكامل يستغرق عادةً 6-18 شهرًا اعتمادًا على حجم المنظمة وتعقيدها.",
        },
      },
      {
        question: {
          en: "How do you handle resistance to change?",
          ar: "كيف تتعاملون مع مقاومة التغيير؟",
        },
        answer: {
          en: "We use proven change management frameworks and involve stakeholders at every step.",
          ar: "نستخدم أطر إدارة التغيير المثبتة ونشرك أصحاب المصلحة في كل خطوة.",
        },
      },
    ],
    packages: [
      {
        name: { en: "Assessment", ar: "التقييم" },
        price: { en: "$4,999", ar: "4,999$" },
        features: {
          en: [
            "Digital maturity audit",
            "Gap analysis",
            "Transformation roadmap",
            "Executive presentation",
          ],
          ar: [
            "تدقيق النضج الرقمي",
            "تحليل الفجوات",
            "خريطة طريق التحول",
            "عرض تنفيذي",
          ],
        },
        isPopular: false,
      },
      {
        name: { en: "Implementation", ar: "التنفيذ" },
        price: { en: "$14,999", ar: "14,999$" },
        features: {
          en: [
            "Full assessment",
            "Technology selection",
            "Implementation support",
            "Change management",
            "Team training",
          ],
          ar: [
            "تقييم كامل",
            "اختيار التكنولوجيا",
            "دعم التنفيذ",
            "إدارة التغيير",
            "تدريب الفريق",
          ],
        },
        isPopular: true,
      },
      {
        name: { en: "Full Transformation", ar: "التحول الكامل" },
        price: { en: "Custom", ar: "مخصص" },
        features: {
          en: [
            "End-to-end transformation",
            "Dedicated team",
            "Custom integrations",
            "Ongoing optimization",
            "Executive coaching",
          ],
          ar: [
            "تحول شامل",
            "فريق مخصص",
            "تكاملات مخصصة",
            "تحسين مستمر",
            "تدريب تنفيذي",
          ],
        },
        isPopular: false,
      },
    ],
  },
  {
    id: 19,
    title: {
      en: "Automation Solutions",
      ar: "حلول الأتمتة",
    },
    smallDesc: {
      en: "Business process automation solutions that streamline operations, reduce manual tasks, and increase efficiency through intelligent workflow design and implementation.",
      ar: "حلول أتمتة العمليات التجارية التي تبسط العمليات، وتقلل المهام اليدوية، وتزيد الكفاءة من خلال تصميم وتنفيذ سير العمل الذكي.",
    },
    description: {
      en: "Streamline your operations with our automation solutions. We identify repetitive tasks, design efficient workflows, and implement systems that save time and reduce errors.",
      ar: "بسّط عملياتك مع حلول الأتمتة لدينا. نحن نحدد المهام المتكررة، ونصمم سير عمل فعال، وننفذ أنظمة توفر الوقت وتقلل الأخطاء.",
    },
    benefits: {
      en: [
        "Increased efficiency",
        "Cost reduction",
        "Error minimization",
        "Scalable processes",
      ],
      ar: [
        "زيادة الكفاءة",
        "تقليل التكلفة",
        "تقليل الأخطاء",
        "عمليات قابلة للتوسع",
      ],
    },
    features: {
      en: [
        "Workflow automation",
        "Process optimization",
        "Integration services",
        "Custom development",
      ],
      ar: [
        "أتمتة سير العمل",
        "تحسين العمليات",
        "خدمات التكامل",
        "التطوير المخصص",
      ],
    },
    targetAudience: {
      en: "Manufacturing companies, service providers, administrative departments",
      ar: "شركات التصنيع، مقدمي الخدمات، الأقسام الإدارية",
    },
    slug: "automation-solutions",
    imgsrc: "https://cdn-icons-png.flaticon.com/512/3135/3135783.png",
    fullImage:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    stats: [
      {
        label: { en: "Processes Automated", ar: "عمليات تم أتمتتها" },
        value: "600+",
        icon: "automation",
      },
      {
        label: { en: "Hours Saved/Month", ar: "ساعات محفوظة/شهر" },
        value: "15K+",
        icon: "clock",
      },
      {
        label: { en: "Error Reduction", ar: "تقليل الأخطاء" },
        value: "-90%",
        icon: "shield",
      },
    ],
    processSteps: [
      {
        title: { en: "Process Discovery", ar: "اكتشاف العمليات" },
        description: {
          en: "We map your current workflows and identify automation opportunities.",
          ar: "نرسم سير العمل الحالي ونحدد فرص الأتمتة.",
        },
        icon: "search",
      },
      {
        title: { en: "Solution Design", ar: "تصميم الحل" },
        description: {
          en: "We design automated workflows tailored to your business processes.",
          ar: "نصمم سير عمل آلي مصمم لعمليات أعمالك.",
        },
        icon: "plan",
      },
      {
        title: { en: "Development & Testing", ar: "التطوير والاختبار" },
        description: {
          en: "We build and rigorously test automation solutions before deployment.",
          ar: "نبني ونختبر بدقة حلول الأتمتة قبل النشر.",
        },
        icon: "code",
      },
      {
        title: { en: "Deploy & Monitor", ar: "النشر والمراقبة" },
        description: {
          en: "We deploy automations and monitor performance for continuous optimization.",
          ar: "ننشر الأتمتة ونراقب الأداء للتحسين المستمر.",
        },
        icon: "rocket",
      },
    ],
    faq: [
      {
        question: {
          en: "What processes can be automated?",
          ar: "ما العمليات التي يمكن أتمتتها؟",
        },
        answer: {
          en: "Almost any repetitive, rule-based process — from data entry to approvals and reporting.",
          ar: "تقريبًا أي عملية متكررة قائمة على القواعد — من إدخال البيانات إلى الموافقات والتقارير.",
        },
      },
      {
        question: {
          en: "Do you use RPA or custom solutions?",
          ar: "هل تستخدمون RPA أم حلول مخصصة؟",
        },
        answer: {
          en: "We use both — RPA tools like UiPath for standard tasks and custom solutions for complex workflows.",
          ar: "نستخدم كليهما — أدوات RPA مثل UiPath للمهام القياسية وحلول مخصصة لسير العمل المعقد.",
        },
      },
      {
        question: {
          en: "How quickly can we see ROI?",
          ar: "ما سرعة رؤية العائد على الاستثمار؟",
        },
        answer: {
          en: "Most clients see ROI within 2-4 months of deployment through time and cost savings.",
          ar: "يرى معظم العملاء العائد خلال 2-4 أشهر من النشر من خلال توفير الوقت والتكلفة.",
        },
      },
    ],
    packages: [
      {
        name: { en: "Starter Automation", ar: "الأتمتة المبتدئة" },
        price: { en: "$3,499", ar: "3,499$" },
        features: {
          en: [
            "3 workflows automated",
            "Basic integrations",
            "Documentation",
            "30-day support",
          ],
          ar: ["3 سير عمل مؤتمت", "تكاملات أساسية", "توثيق", "30 يوم دعم"],
        },
        isPopular: false,
      },
      {
        name: { en: "Business Automation", ar: "أتمتة الأعمال" },
        price: { en: "$8,999", ar: "8,999$" },
        features: {
          en: [
            "10 workflows automated",
            "Advanced integrations",
            "Custom dashboards",
            "Team training",
            "90-day support",
          ],
          ar: [
            "10 سير عمل مؤتمت",
            "تكاملات متقدمة",
            "لوحات تحكم مخصصة",
            "تدريب الفريق",
            "90 يوم دعم",
          ],
        },
        isPopular: true,
      },
      {
        name: { en: "Enterprise Automation", ar: "أتمتة المؤسسات" },
        price: { en: "Custom", ar: "مخصص" },
        features: {
          en: [
            "Unlimited workflows",
            "AI-powered automation",
            "Full system integration",
            "Dedicated team",
            "Ongoing optimization",
          ],
          ar: [
            "سير عمل غير محدود",
            "أتمتة بالذكاء الاصطناعي",
            "تكامل كامل للنظام",
            "فريق مخصص",
            "تحسين مستمر",
          ],
        },
        isPopular: false,
      },
    ],
  },
  {
    id: 20,
    title: {
      en: "Training and Development",
      ar: "التدريب والتطوير",
    },
    smallDesc: {
      en: "Professional training and development programs designed to enhance team skills, improve performance, and foster continuous learning in technology and business practices.",
      ar: "برامج التدريب والتطوير المهنية المصممة لتعزيز مهارات الفريق، وتحسين الأداء، وتعزيز التعلم المستمر في التكنولوجيا والممارسات التجارية.",
    },
    description: {
      en: "Invest in your team's growth with our comprehensive training programs. We offer customized courses, workshops, and certification programs to enhance skills and productivity.",
      ar: "استثمر في نمو فريقك مع برامج التدريب الشاملة لدينا. نحن نقدم دورات مخصصة وورش عمل وبرامج شهادات لتعزيز المهارات والإنتاجية.",
    },
    benefits: {
      en: [
        "Skill enhancement",
        "Improved performance",
        "Career development",
        "Knowledge retention",
      ],
      ar: [
        "تعزيز المهارات",
        "تحسين الأداء",
        "تطوير الوظيفة",
        "الاحتفاظ بالمعرفة",
      ],
    },
    features: {
      en: [
        "Custom curricula",
        "Hands-on workshops",
        "Certification programs",
        "Progress tracking",
      ],
      ar: ["مناهج مخصصة", "ورش عمل عملية", "برامج الشهادات", "تتبع التقدم"],
    },
    targetAudience: {
      en: "HR departments, educational institutions, professional teams",
      ar: "أقسام الموارد البشرية، المؤسسات التعليمية، الفرق المهنية",
    },
    slug: "training-development",
    imgsrc: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    fullImage:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    stats: [
      {
        label: { en: "Professionals Trained", ar: "محترفين تم تدريبهم" },
        value: "5,000+",
        icon: "users",
      },
      {
        label: { en: "Courses Delivered", ar: "دورات تم تقديمها" },
        value: "300+",
        icon: "book",
      },
      {
        label: { en: "Certification Rate", ar: "معدل الشهادات" },
        value: "94%",
        icon: "award",
      },
    ],
    processSteps: [
      {
        title: { en: "Skills Assessment", ar: "تقييم المهارات" },
        description: {
          en: "We assess your team's current skills and identify training needs.",
          ar: "نقيّم مهارات فريقك الحالية ونحدد احتياجات التدريب.",
        },
        icon: "search",
      },
      {
        title: { en: "Curriculum Design", ar: "تصميم المنهج" },
        description: {
          en: "We create customized learning paths aligned with your goals.",
          ar: "ننشئ مسارات تعلم مخصصة تتماشى مع أهدافك.",
        },
        icon: "plan",
      },
      {
        title: { en: "Delivery", ar: "التقديم" },
        description: {
          en: "We deliver engaging training through workshops, online courses, and mentoring.",
          ar: "نقدم تدريبًا جذابًا من خلال ورش العمل والدورات الإلكترونية والإرشاد.",
        },
        icon: "presentation",
      },
      {
        title: { en: "Evaluation & Growth", ar: "التقييم والنمو" },
        description: {
          en: "We measure learning outcomes and plan continuous development paths.",
          ar: "نقيس نتائج التعلم ونخطط مسارات تطوير مستمرة.",
        },
        icon: "chart",
      },
    ],
    faq: [
      {
        question: {
          en: "What training formats do you offer?",
          ar: "ما تنسيقات التدريب التي تقدمونها؟",
        },
        answer: {
          en: "We offer in-person workshops, virtual training, self-paced online courses, and blended learning.",
          ar: "نقدم ورش عمل حضورية وتدريب افتراضي ودورات ذاتية عبر الإنترنت وتعلم مدمج.",
        },
      },
      {
        question: {
          en: "Do you provide certifications?",
          ar: "هل تقدمون شهادات؟",
        },
        answer: {
          en: "Yes, we offer industry-recognized certifications upon successful course completion.",
          ar: "نعم، نقدم شهادات معترف بها في الصناعة بعد إتمام الدورة بنجاح.",
        },
      },
      {
        question: {
          en: "Can training be customized for our team?",
          ar: "هل يمكن تخصيص التدريب لفريقنا؟",
        },
        answer: {
          en: "Absolutely. All our programs are tailored to your team's skill level and business objectives.",
          ar: "بالتأكيد. جميع برامجنا مصممة لمستوى مهارات فريقك وأهداف العمل.",
        },
      },
    ],
    packages: [
      {
        name: { en: "Individual", ar: "الفردي" },
        price: { en: "$299/course", ar: "299$/دورة" },
        features: {
          en: [
            "Single course access",
            "Self-paced learning",
            "Course materials",
            "Certificate of completion",
          ],
          ar: ["الوصول لدورة واحدة", "تعلم ذاتي", "مواد الدورة", "شهادة إتمام"],
        },
        isPopular: false,
      },
      {
        name: { en: "Team", ar: "الفريق" },
        price: { en: "$4,999", ar: "4,999$" },
        features: {
          en: [
            "Up to 20 participants",
            "Custom curriculum",
            "Live workshops",
            "Progress tracking",
            "Team certificates",
          ],
          ar: [
            "حتى 20 مشارك",
            "منهج مخصص",
            "ورش عمل مباشرة",
            "تتبع التقدم",
            "شهادات الفريق",
          ],
        },
        isPopular: true,
      },
      {
        name: { en: "Enterprise Academy", ar: "أكاديمية المؤسسات" },
        price: { en: "Custom", ar: "مخصص" },
        features: {
          en: [
            "Unlimited participants",
            "Full learning platform",
            "Custom courses",
            "Dedicated instructor",
            "Annual program",
          ],
          ar: [
            "مشاركين غير محدودين",
            "منصة تعلم كاملة",
            "دورات مخصصة",
            "مدرب مخصص",
            "برنامج سنوي",
          ],
        },
        isPopular: false,
      },
    ],
  },
];
