type Project = {
  title: string;
  description: string;
  tech: string[];
  demo: string;
  repo: string;
  images?: string[];
  details?: string;
};

declare const config: {
  site: {
    title: string;
    description: string;
    author: string;
    baseUrl: string;
  };
  theme: {
    colors: {
      background: string;
      surface: string;
      muted: string;
      primary: string;
      accent: string;
    };
    lightColors?: {
      background: string;
      surface: string;
      muted: string;
      primary: string;
      accent: string;
    };
  };
  hero: {
    name: string;
    role: string;
    tagline: string;
    ctas: { label: string; href: string }[];
    profileImage: string;
  };
  projects: Project[];
  skills: {
    frontend: string[];
    backend: string[];
    tools: string[];
  };
  about: {
    summary1: string;
    summary2: string;
    roleLine: string;
  };
  blog?: {
    enabled?: boolean;
    posts?: any[];
  };
  contact: {
    email: string;
    linkedin: string;
    github: string;
    resumeUrl: string;
  };
};

export default config;


