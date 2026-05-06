import React from "react";
import FetchData from "@/app/helpers/FetchData";
import { HOME_ENDPOINTS } from "@/app/constants/endpoints";
import { Service } from "@/app/types/service";
import { Project } from "@/app/types/project";
import { Article } from "@/app/types/blog";
import { Category } from "@/app/types/global";

import ServicesSection from "./ServicesSection";
import PortfolioSection from "./_portfolioSection/PortfolioSection";
import BlogSection from "./_blogSection/BlogSection";

interface ApiResponse {
  services: Service[];
  categories: Category[];
  projects: Project[];
  articles: Article[];
}

async function getHomeData() {
  const data = await FetchData<ApiResponse>(HOME_ENDPOINTS.LIST_PUBLISHED);
  if (!data || typeof data !== "object") return null;
  return data as ApiResponse;
}

export async function ServicesWrapper() {
  const data = await getHomeData();
  if (!data) return null;
  return <ServicesSection services={data.services ?? []} />;
}

export async function PortfolioWrapper() {
  const data = await getHomeData();
  if (!data) return null;
  return (
    <PortfolioSection
      projects={data.projects ?? []}
      categories={data.categories ?? []}
    />
  );
}

export async function BlogWrapper() {
  const data = await getHomeData();
  if (!data) return null;
  return <BlogSection articles={data.articles ?? []} />;
}
