const routeLabels: Record<string, string> = {
  dashboard: "Overview",
  projects: "Projects",
  "projects/add": "Add New Project",
  services: "Services",
  "services/add": "Add New Service",
  users: "Users",
  "users/add": "Add New User",
  payments: "Payments & Billing",
  blog: "Blog",
  "blog/add": "Add New Post",
  contactus: "Contact Submissions",
};

export function buildBreadcrumb(pathname: string, locale: string) {
  const segments = pathname.split("/").filter(Boolean);
  const crumbLabels: { label: string; href: string }[] = [];
  let href = "";

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    // Skip local segment
    if (i === 0 && segment === locale) continue;
    href += `/${segment}`;

    // Check if this segment + next is a known compound route
    const compoundKey = `${segment}/${segments[i + 1]}`;
    if (routeLabels[compoundKey]) {
      crumbLabels.push({ label: routeLabels[compoundKey], href });
      i++; // skip next segment
      continue;
    }

    if (routeLabels[segment]) {
      crumbLabels.push({ label: routeLabels[segment], href });
    }
  }

  return crumbLabels;
}
