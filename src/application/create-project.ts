import path from "node:path";
import type { CreateProjectResult, ProjectConfig } from "../domain/project.js";
import {
  copyTemplate,
  ensureTargetIsAvailable,
  materializeProject,
  removeGeneratedDirectory,
} from "../infrastructure/file-system.js";
import { installCommand, runCommand } from "../infrastructure/process.js";

export interface CreateProjectOptions {
  config: ProjectConfig;
  templateRoot: string;
}

export async function createProject({
  config,
  templateRoot,
}: CreateProjectOptions): Promise<CreateProjectResult> {
  const createdTarget = await ensureTargetIsAvailable(config.targetDirectory);
  const warnings: string[] = [];

  try {
    await copyTemplate(path.join(templateRoot, "shared"), config.targetDirectory);
    if (config.mode === "preset") {
      await copyTemplate(path.join(templateRoot, "preset"), config.targetDirectory);
    }
    await materializeProject(config.targetDirectory, config.name);
  } catch (error) {
    if (createdTarget) await removeGeneratedDirectory(config.targetDirectory);
    throw error;
  }

  let installSucceeded: boolean | undefined;
  if (config.mode === "preset" && config.installDependencies && config.packageManager) {
    installSucceeded = await runCommand(
      config.packageManager,
      installCommand(config.packageManager),
      config.targetDirectory,
    );
    if (!installSucceeded) {
      warnings.push(`依赖安装失败，请进入项目后运行 ${config.packageManager} install`);
    }
  }

  let gitSucceeded: boolean | undefined;
  if (config.initializeGit) {
    gitSucceeded = await runCommand("git", ["init"], config.targetDirectory, false);
    if (!gitSucceeded) warnings.push("Git 初始化失败，可稍后手动运行 git init");
  }

  const result: CreateProjectResult = { targetDirectory: config.targetDirectory, warnings };
  if (installSucceeded !== undefined) result.installSucceeded = installSucceeded;
  if (gitSucceeded !== undefined) result.gitSucceeded = gitSucceeded;
  return result;
}
