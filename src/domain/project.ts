export const PROJECT_MODES = ["preset", "clean"] as const;
export const PACKAGE_MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const;

export type ProjectMode = (typeof PROJECT_MODES)[number];
export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

export interface ProjectConfig {
  name: string;
  targetDirectory: string;
  mode: ProjectMode;
  packageManager?: PackageManager;
  installDependencies: boolean;
  initializeGit: boolean;
}

export interface CreateProjectResult {
  targetDirectory: string;
  installSucceeded?: boolean;
  gitSucceeded?: boolean;
  warnings: string[];
}
