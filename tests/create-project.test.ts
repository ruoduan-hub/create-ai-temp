import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { createProject } from "../src/application/create-project.js";

const templateRoot = fileURLToPath(new URL("../templates", import.meta.url));
const temporaryDirectories: string[] = [];

afterEach(async () => {
  const { rm } = await import("node:fs/promises");
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true })),
  );
});

describe("createProject", () => {
  it("纯净模式生成通用中文 AI 模板且不生成技术栈", async () => {
    const targetDirectory = await createTemporaryTarget("clean-app");

    await createProject({
      config: {
        name: "clean-app",
        targetDirectory,
        mode: "clean",
        installDependencies: false,
        initializeGit: false,
      },
      templateRoot,
    });

    expect(await readFile(path.join(targetDirectory, ".agent/README.md"), "utf8")).toContain(
      "AI 协作中心",
    );
    expect(
      await readFile(path.join(targetDirectory, ".agent/context/project-overview.md"), "utf8"),
    ).toContain("clean-app");
    await expect(readFile(path.join(targetDirectory, "package.json"), "utf8")).rejects.toThrow();
    await expect(
      readFile(path.join(targetDirectory, ".agent/stack/nextjs.md"), "utf8"),
    ).rejects.toThrow();
  });

  it("预设模式叠加技术栈模板和可运行工程", async () => {
    const targetDirectory = await createTemporaryTarget("preset-app");

    await createProject({
      config: {
        name: "preset-app",
        targetDirectory,
        mode: "preset",
        packageManager: "npm",
        installDependencies: false,
        initializeGit: false,
      },
      templateRoot,
    });

    const packageJson = JSON.parse(
      await readFile(path.join(targetDirectory, "package.json"), "utf8"),
    );
    expect(packageJson.name).toBe("preset-app");
    expect(packageJson.dependencies).toMatchObject({
      next: expect.any(String),
      zustand: expect.any(String),
    });
    expect(await readFile(path.join(targetDirectory, ".agent/stack/nextjs.md"), "utf8")).toContain(
      "Next.js 增量规则",
    );
    expect(await readFile(path.join(targetDirectory, ".gitignore"), "utf8")).toContain(
      "node_modules",
    );
  });

  it("拒绝覆盖非空目录", async () => {
    const parent = await makeTemporaryDirectory();
    const targetDirectory = path.join(parent, "existing");
    await mkdir(targetDirectory);
    await writeFile(path.join(targetDirectory, "important.txt"), "保留我", "utf8");

    await expect(
      createProject({
        config: {
          name: "existing",
          targetDirectory,
          mode: "clean",
          installDependencies: false,
          initializeGit: false,
        },
        templateRoot,
      }),
    ).rejects.toThrow("目标目录已存在且不为空");
    expect(await readFile(path.join(targetDirectory, "important.txt"), "utf8")).toBe("保留我");
  });
});

async function createTemporaryTarget(name: string): Promise<string> {
  return path.join(await makeTemporaryDirectory(), name);
}

async function makeTemporaryDirectory(): Promise<string> {
  const directory = await mkdtemp(path.join(os.tmpdir(), "create-ai-temp-test-"));
  temporaryDirectories.push(directory);
  return directory;
}
