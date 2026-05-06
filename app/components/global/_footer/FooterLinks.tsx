import { sectionOrder } from "@/app/constants/footer";
import { Messages } from "@/app/hooks/useTranslation";
import LocaleLink from "../LocaleLink";

interface FooterLinksProps {
  t: Messages["footerLines"];
}

export default function FooterLinks({ t }: FooterLinksProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-10">
      {sectionOrder.map((sectionKey) => {
        const section = t.sections[sectionKey as keyof typeof t.sections];

        if (!section) return null;

        return (
          <div key={sectionKey}>
            <p className="text-sm font-semibold text-stone-200 uppercase tracking-wider">
              {section.title}
            </p>
            <ul className="mt-5 space-y-3">
              {Object.entries(section.links).map(([linkKey, linkText]) => (
                <li key={linkKey}>
                  <LocaleLink
                    href="#"
                    className="text-sm text-stone-400 hover:text-orange-400 transition-colors duration-200"
                  >
                    {linkText as string}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
