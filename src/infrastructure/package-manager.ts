import type { PackageManager } from "../domain/project.js";
import { isCommandAvailable } from "./process.js";

export async function detectPackageManager(): Promise<PackageManager> {
  const userAgent = process.env.npm_config_user_agent;
  const fromUserAgent = userAgent?.split("/")[0];
  if (isPackageManager(fromUserAgent)) return fromUserAgent;

  for (const candidate of ["pnpm", "npm", "yarn", "bun"] as const) {
    if (await isCommandAvailable(candidate)) return candidate;
  }
  return "npm";
}

export function isPackageManager(value: unknown): value is PackageManager {
  return value === "pnpm" || value === "npm" || value === "yarn" || value === "bun";
}
