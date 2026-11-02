import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/tolits-butcheron" : undefined,
  trailingSlash: isGitHubPages,
};

export default nextConfig;
