import Image from "next/image";
import LocaleLink from "../../global/LocaleLink";
import { formatTitle } from "@/app/helpers/formatTitle";
import { Service } from "@/app/types/service";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceSlideCard({ service }: ServiceCardProps) {
  return (
    <div className="relative cursor-pointer w-full h-[450px] overflow-hidden rounded-2xl shadow-md bg-white dark:bg-zinc-900 transition-all duration-300 group">
      <div className="h-[40%] w-full relative">
        <Image
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Service full visual"
          fill
          className="object-cover opacity-30"
        />
      </div>

      {/* Icon and text */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-6">
        <div className="w-20 h-20 rounded-full bg-white group-hover:bg-sky-500/60 group-hover:scale-[115%] duration-300 dark:bg-zinc-800 shadow-md flex items-center justify-center -mt-14">
          <Image
            src={service.coverImageUrl}
            alt={service.title}
            width={48}
            height={48}
            className="object-contain"
          />
        </div>

        <LocaleLink
          href={`/services/${formatTitle(service.title)}?serviceId=${
            service.id
          }`}
          className="text-lg font-bold mt-4 text-primary-red  group-hover:underline "
        >
          {service.title}
        </LocaleLink>

        <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2">
          {service.shortDescription}
        </p>
      </div>
    </div>
  );
}
