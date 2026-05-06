import { Service } from "@/app/types/service";
import { formatTitle } from "./formatTitle";

export const getServiceUrl = (service: Service) => {
  if (service.slug) {
    return `/services/${service.slug}`;
  }
  return `/services/${formatTitle(service.title)}?serviceId=${service.id}`;
};
