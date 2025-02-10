export interface Project {
  title: string;
  description: string;
  landingPageUrl: string;
  screenshots: string[];
  videoUrl?: string;
  categories: string[];
  imageOpacity?: number;
  type: "web" | "mobile";
}

export interface ProjectPair {
  name: string;
  projects: Project[];
  type: "web" | "mobile";
}

export interface LandingPage {
  url: string;
  name: string;
  type: string;
  appUrl: string;
}
