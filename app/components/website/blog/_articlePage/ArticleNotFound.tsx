import { easeOut, motion } from "framer-motion";
import {
  FiSearch,
  FiHome,
  FiBookOpen,
  FiFileText,
  FiHelpCircle,
  FiTrendingUp,
  FiChevronRight,
  FiAlertCircle,
} from "react-icons/fi";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useLocale } from "@/app/hooks/useLocale";

export default function ArticleNotFound() {
  const locale = useLocale();
  const t = useTranslation("articleNotFound");
  const isRTL = locale === "ar";

  const latestArticles = [
    { id: 1, title: "كيفية تحسين محركات البحث", category: "تقنية" },
    { id: 2, title: "دليل التسويق الرقمي الشامل", category: "تسويق" },
    { id: 3, title: "أساسيات تطوير الويب الحديث", category: "برمجة" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 ${isRTL ? "rtl" : "ltr"}`}
    >
      <motion.div
        className="max-w-4xl w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12 lg:p-16">
            <motion.div
              className="flex justify-center mb-8"
              variants={itemVariants}
            >
              <motion.div
                className="relative"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <div className="w-32 h-32 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                  <FiBookOpen className="w-16 h-16 text-primary" />
                </div>
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <FiAlertCircle className="w-8 h-8 text-primary" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Error Title */}
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent"
              variants={itemVariants}
            >
              {t.title}
            </motion.h1>

            {/* Error Description */}
            <motion.p
              className="text-gray-600 text-lg text-center mb-12 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              {t.description}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              variants={itemVariants}
            >
              <motion.button
                className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiHome className="w-5 h-5" />
                <span>{t.backToHome}</span>
              </motion.button>

              <motion.button
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary border-2 border-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiSearch className="w-5 h-5" />
                <span>{t.searchArticles}</span>
              </motion.button>
            </motion.div>

            {/* Suggestions Section */}
            <motion.div
              className="border-t border-gray-100 pt-8"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <FiTrendingUp className="w-5 h-5 text-primary" />
                {t.latestArticles}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {latestArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    className="group bg-gray-50 rounded-xl p-5 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <FiFileText className="w-5 h-5 group-hover:text-white" />
                      <span className="text-sm text-gray-500 group-hover:text-white/80">
                        {article.category}
                      </span>
                    </div>
                    <h4 className="font-semibold mb-2 group-hover:text-white">
                      {article.title}
                    </h4>
                    <div className="flex items-center text-primary group-hover:text-white mt-3">
                      <span className="text-sm">{t.contactSupport}</span>
                      <FiChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Support Section */}
            <motion.div
              className="mt-8 flex items-center justify-center gap-2 text-gray-500"
              variants={itemVariants}
            >
              <FiHelpCircle className="w-5 h-5 text-primary" />
              <span>{t.contactSupport}</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
