export function getTestimonials(locale: "en" | "ar") {
  return [
    {
      id: 1,
      name: locale === "ar" ? "أحمد محمد" : "Ahmed Mohamed",
      position: locale === "ar" ? "مدير تقني" : "CTO",
      company: locale === "ar" ? "شركة التقنية المتقدمة" : "Advanced Tech Co.",
      content:
        locale === "ar"
          ? "تجربة رائعة مع فريق سند. لقد قاموا بتطوير موقعنا بمهنية عالية وفي الوقت المحدد. النتائج فاقت توقعاتنا."
          : "An amazing experience with the Sanad team. They developed our website with high professionalism and on time. The results exceeded our expectations.",
      rating: 5,
      avatar: "AM",
    },
    {
      id: 2,
      name: locale === "ar" ? "فاطمة علي" : "Fatima Ali",
      position: locale === "ar" ? "مديرة مشروع" : "Project Manager",
      company: locale === "ar" ? "مؤسسة الابتكار" : "Innovation Foundation",
      content:
        locale === "ar"
          ? "خدمة عملاء ممتازة ودعم فني متواصل. التطبيق الذي طوروه لنا ساعد في زيادة كفاءة العمل بشكل كبير."
          : "Excellent customer service and continuous technical support. The application they developed for us helped significantly increase work efficiency.",
      rating: 5,
      avatar: "FA",
    },
    {
      id: 3,
      name: locale === "ar" ? "محمد حسن" : "Mohammed Hassan",
      position: locale === "ar" ? "رئيس قسم التسويق" : "Head of Marketing",
      company:
        locale === "ar" ? "شركة النهضة الرقمية" : "Digital Renaissance Co.",
      content:
        locale === "ar"
          ? "فريق محترف ومتخصص. ساعدونا في تحويل أفكارنا إلى واقع رقمي متميز. أنصح بهم بشدة."
          : "A professional and specialized team. They helped us turn our ideas into an outstanding digital reality. I highly recommend them.",
      rating: 5,
      avatar: "MH",
    },
    {
      id: 4,
      name: locale === "ar" ? "سارة أحمد" : "Sara Ahmed",
      position: locale === "ar" ? "مديرة عامة" : "General Manager",
      company: locale === "ar" ? "مجموعة الإبداع" : "Al-Ibdaa Group",
      content:
        locale === "ar"
          ? "تعاون مثمر وحلول مبتكرة. لقد حققنا نموًا ملحوظًا في أعمالنا بفضل الحلول التقنية التي قدموها."
          : "Fruitful collaboration and innovative solutions. We achieved remarkable growth in our business thanks to the technical solutions they provided.",
      rating: 4,
      avatar: "SA",
    },
    {
      id: 5,
      name: locale === "ar" ? "عمر خالد" : "Omar Khaled",
      position: locale === "ar" ? "مؤسس الشركة" : "Company Founder",
      company: locale === "ar" ? "ستارت أب تك" : "Startup Tech",
      content:
        locale === "ar"
          ? "شراكة ناجحة من البداية. فهموا احتياجاتنا بسرعة وقدموا حلولاً عملية وفعالة."
          : "A successful partnership from the start. They quickly understood our needs and delivered practical, effective solutions.",
      rating: 5,
      avatar: "OK",
    },
  ];
}
