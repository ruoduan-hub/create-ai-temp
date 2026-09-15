import { constants } from "node:fs";
import {
  access,
  cp,
  mkdir,
  readdir,
  readFile,
  rename,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

const TEXT_EXTENSIONS = new Set([
  ".css",
  ".json",
  ".jsonc",
  ".md",
  ".mdc",
  ".ts",
  ".tsx",
  ".txt",
  ".yml",
  ".yaml",
]);

export async function ensureTargetIsAvailable(targetDirectory: string): Promise<boolean> {
  try {
    const targetStat = await stat(targetDirectory);
    if (!targetStat.isDirectory()) throw new Error("目标路径已存在且不是目录");
    const entries = await readdir(targetDirectory);
    if (entries.length > 0) throw new Error("目标目录已存在且不为空，请更换项目名");
    return false;
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") return true;
    throw error;
  }
}

export async function copyTemplate(source: string, target: string): Promise<void> {
  await access(source, constants.R_OK);
  await mkdir(target, { recursive: true });
  await cp(source, target, { recursive: true, force: true });
}

export async function materializeProject(target: string, projectName: string): Promise<void> {
  await renameSpecialFiles(target);
  await replacePlaceholders(target, { __PROJECT_NAME__: projectName });
}

export async function removeGeneratedDirectory(target: string): Promise<void> {
  await rm(target, { force: true, recursive: true });
}

async function renameSpecialFiles(directory: string): Promise<void> {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const currentPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await renameSpecialFiles(currentPath);
      continue;
    }
    if (entry.name.startsWith("_dot_")) {
      await rename(currentPath, path.join(directory, `.${entry.name.slice(5)}`));
    }
  }
}

async function replacePlaceholders(
  directory: string,
  replacements: Readonly<Record<string, string>>,
): Promise<void> {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await replacePlaceholders(filePath, replacements);
      continue;
    }
    if (!TEXT_EXTENSIONS.has(path.extname(entry.name))) continue;
    const original = await readFile(filePath, "utf8");
    const updated = Object.entries(replacements).reduce(
      (content, [search, replacement]) => content.replaceAll(search, replacement),
      original,
    );
    if (updated !== original) await writeFile(filePath, updated, "utf8");
  }
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}
