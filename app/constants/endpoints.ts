export const AUTH_ENDPOINTS = {
  LOGIN: "/api/auth/login",
  VERIFY_EMAIL: "/api/auth/verify-email",
  RESET_PASSWORD_SEND: "/api/auth/rest-password/send",
  RESET_PASSWORD_VERIFY: "/api/auth/rest-password/verify",
  RESET_PASSWORD: "/api/auth/rest-password",
  GOOGLE_LOGIN: "/api/auth/google",
  GOOGLE_CALLBACK: "/api/auth/google/callback",
  CURRENT_USER: "/api/auth/current-user",
  LOGOUT: "/api/auth/logout",
} as const;

export const USER_ENDPOINTS = {
  CREATE_USER: "/api/user",
  LIST_USERS: "/api/user",
  GET_USER: (id: string | number) => `/api/user/${id}`,
  UPDATE_USER: (id: string | number) => `/api/user/${id}`,
  DELETE_USER: (id: string | number) => `/api/user/${id}`,

  // Admin endpoints - per backend API plan
  ADMIN_LIST: "/api/user",
  ADMIN_GET: (id: string | number) => `/api/user/${id}`,
  ADMIN_CREATE: "/api/user",
  ADMIN_UPDATE: (id: string | number) => `/api/user/${id}`,
  ADMIN_DELETE: (id: string | number) => `/api/user/${id}`,
} as const;

export const CATEGORIES_ENDPOINTS = {
  GET_CATEGORIES: "/api/categories",
  GET_CATEGORY: (slug: string) => `/api/categories/${slug}`,

  // Admin endpoints - per backend API plan
  ADMIN_LIST: "/api/admin/categories",
  ADMIN_GET: (id: string | number) => `/api/admin/categories/${id}`,
  ADMIN_CREATE: "/api/admin/categories",
  ADMIN_UPDATE: (id: string | number) => `/api/admin/categories/${id}`,
  ADMIN_DELETE: (id: string | number) => `/api/admin/categories/${id}`,
} as const;

export const SERVICES_ENDPOINTS = {
  LIST_PUBLISHED: "/api/services",
  GET_BY_SLUG: (slug: string) => `/api/services/${slug}`,
  ADMIN_LIST: "/api/admin/services",
  ADMIN_CREATE: "/api/admin/services",
  ADMIN_UPDATE: (id: string) => `/api/admin/services/${id}`,
  ADMIN_DELETE: (id: string) => `/api/admin/services/${id}`,
  ADMIN_PUBLISH: (id: string) => `/api/admin/services/${id}/publish`,
  ADMIN_REORDER: "/api/admin/services/reorder",
} as const;

export const PORTFOLIO_ENDPOINTS = {
  LIST_PUBLISHED: "/api/portfolio",
  GET_BY_SLUG: (slug: string) => `/api/portfolio/${slug}`,
  ADMIN_LIST: "/api/admin/portfolio",
  ADMIN_CREATE: "/api/admin/portfolio",
  ADMIN_UPDATE: (id: string) => `/api/admin/portfolio/${id}`,
  ADMIN_DELETE: (id: string) => `/api/admin/portfolio/${id}`,
  ADMIN_PUBLISH: (id: string) => `/api/admin/portfolio/${id}/publish`,
  ADMIN_FEATURE: (id: string) => `/api/admin/portfolio/${id}/feature`,
  ADMIN_REORDER: "/api/admin/portfolio/reorder",
} as const;

export const BLOG_ENDPOINTS = {
  LIST_PUBLISHED: "/api/blog",
  CATEGORIES: "/api/categories",
  GET_BY_SLUG: (slug: string) => `/api/blog/${slug}`,
  ADMIN_LIST: "/api/admin/blog",
  ADMIN_GET: (id: string) => `/api/admin/blog/${id}`,
  ADMIN_CREATE: "/api/admin/blog",
  ADMIN_UPDATE: (id: string) => `/api/admin/blog/${id}`,
  ADMIN_DELETE: (id: string) => `/api/admin/blog/${id}`,
  ADMIN_PUBLISH: (id: string) => `/api/admin/blog/${id}/publish`,
} as const;

export const CONTACT_ENDPOINTS = {
  SUBMIT: "/api/contact",
  ADMIN_LIST: "/api/admin/contact",
  ADMIN_STATS: "/api/admin/contact/stats",
  ADMIN_GET: (id: string) => `/api/admin/contact/${id}`,
  ADMIN_MARK_READ: (id: string) => `/api/admin/contact/${id}/read`,
  ADMIN_MARK_REPLIED: (id: string) => `/api/admin/contact/${id}/reply`,
  ADMIN_DELETE: (id: string) => `/api/admin/contact/${id}`,
} as const;

export const PAYMENTS_ENDPOINTS = {
  CREATE_INTENT: "/api/payments/create-intent",
  GET_BY_ID: (id: string) => `/api/payments/${id}`,
  USER_LIST: "/api/payments",
  ADMIN_LIST: "/api/admin/payments",
  ADMIN_STATS: "/api/admin/payments/stats",
  ADMIN_GET: (id: string) => `/api/admin/payments/${id}`,
  ADMIN_REFUND: (id: string) => `/api/admin/payments/${id}/refund`,
} as const;

export const CART_ENDPOINTS = {
  GET_CART: "/api/cart",
  ADD_ITEM: "/api/cart/items",
  UPDATE_ITEM: (itemId: string) => `/api/cart/items/${itemId}`,
  REMOVE_ITEM: (itemId: string) => `/api/cart/items/${itemId}`,
  CLEAR_CART: "/api/cart",
  MERGE_CART: "/api/cart/merge",
} as const;

export const STRIPE_ENDPOINTS = {
  WEBHOOK: "/api/stripe/webhook",
} as const;

export const HOME_ENDPOINTS = {
  LIST_PUBLISHED: "/api/home",
} as const;

export const ORDERS_ENDPOINTS = {
  // User endpoints
  CREATE: (serviceId: string, notes?: string) => {
    const params = new URLSearchParams();
    params.set("serviceId", serviceId);
    if (notes) params.set("notes", notes);
    return `/api/orders?${params.toString()}`;
  },
  LIST: (page?: number, limit?: number, status?: string, search?: string) => {
    const params = new URLSearchParams();
    if (page) params.set("page", String(page));
    if (limit) params.set("limit", String(limit));
    if (status && status !== "all") params.set("status", status);
    if (search) params.set("search", search);
    return `/api/orders?${params.toString()}`;
  },
  GET: (id: string) => `/api/orders/${id}`,
  PAY: (id: string) => `/api/orders/${id}/pay`,

  // Admin endpoints
  ADMIN_LIST: (
    page?: number,
    limit?: number,
    status?: string,
    userId?: number,
    serviceId?: string,
  ) => {
    const params = new URLSearchParams();
    if (page) params.set("page", String(page));
    if (limit) params.set("limit", String(limit));
    if (status) params.set("status", status);
    if (userId) params.set("userId", String(userId));
    if (serviceId) params.set("serviceId", serviceId);
    return `/api/admin/orders?${params.toString()}`;
  },
  ADMIN_GET: (id: string) => `/api/admin/orders/${id}`,
  ADMIN_UPDATE_STATUS: (id: string) => `/api/admin/orders/${id}/status`,
  ADMIN_ADD_UPDATE: (id: string) => `/api/admin/orders/${id}/updates`,
} as const;

export const NOTIFICATIONS_ENDPOINTS = {
  // User endpoints
  LIST: (page: number = 1, limit: number = 10) => {
    const params = new URLSearchParams();
    if (page) params.set("page", String(page));
    if (limit) params.set("limit", String(limit));
    return `/api/notifications?${params.toString()}`;
  },
  UNREAD_COUNT: "/api/notifications/unread-count",
  MARK_AS_READ: (id: string) => `/api/notifications/${id}/read`,
  MARK_ALL_AS_READ: "/api/notifications/read-all",
  DELETE: (id: string) => `/api/notifications/${id}`,
  PREFERENCES: "/api/notifications/preferences",

  // Admin endpoints
  ADMIN_SEND: "/api/admin/notifications/send",
  ADMIN_BROADCAST: "/api/admin/notifications/broadcast",
  ADMIN_LIST: (page?: number, limit?: number) => {
    const params = new URLSearchParams();
    if (page) params.set("page", String(page));
    if (limit) params.set("limit", String(limit));
    return `/api/admin/notifications?${params.toString()}`;
  },
  ADMIN_DELETE: (id: string) => `/api/admin/notifications/${id}`,
} as const;

export const ALL_ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  USER: USER_ENDPOINTS,
  SERVICES: SERVICES_ENDPOINTS,
  PORTFOLIO: PORTFOLIO_ENDPOINTS,
  BLOG: BLOG_ENDPOINTS,
  CONTACT: CONTACT_ENDPOINTS,
  PAYMENTS: PAYMENTS_ENDPOINTS,
  CART: CART_ENDPOINTS,
  STRIPE: STRIPE_ENDPOINTS,
  HOME: HOME_ENDPOINTS,
  ORDERS: ORDERS_ENDPOINTS,
  NOTIFICATIONS: NOTIFICATIONS_ENDPOINTS,
} as const;
