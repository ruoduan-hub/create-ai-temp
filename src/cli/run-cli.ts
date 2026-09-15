import path from "node:path";
import * as p from "@clack/prompts";
import { Command, Option } from "commander";
import { createProject } from "../application/create-project.js";
import type { PackageManager, ProjectMode } from "../domain/project.js";
import { normalizeProjectName, validateProjectName } from "../domain/project-name.js";
import { detectPackageManager } from "../infrastructure/package-manager.js";

interface CliOptions {
  preset?: boolean;
  clean?: boolean;
  packageManager?: PackageManager;
  install: boolean;
  git: boolean;
}

export async function runCli(argv: readonly string[], templateRoot: string): Promise<void> {
  const program = new Command()
    .name("create-ai-temp")
    .description("创建对前端开发与 AI 协作友好的项目模板")
    .argument("[项目名]", "要创建的项目名称")
    .option("--preset", "使用 Next.js + Zustand + Biome 预设模式")
    .option("--clean", "使用不包含技术栈的纯净模式")
    .addOption(
      new Option("--pm, --package-manager <包管理器>", "指定包管理器").choices([
        "pnpm",
        "npm",
        "yarn",
        "bun",
      ]),
    )
    .option("--no-install", "跳过依赖安装")
    .option("--no-git", "跳过 Git 初始化")
    .showHelpAfterError()
    .configureOutput({
      outputError: (message, write) => write(`错误：${message}`),
    });

  program.parse([...argv], { from: "user" });
  const [rawProjectName] = program.processedArgs as [string | undefined];
  const options = program.opts<CliOptions>();

  if (options.preset && options.clean) {
    program.error("--preset 与 --clean 不能同时使用\n");
  }

  p.intro("create-ai-temp · 前端友好的 AI 项目生成器");
  try {
    const name = await resolveProjectName(rawProjectName);
    const mode = await resolveMode(options);
    const packageManager = mode === "preset" ? await resolvePackageManager(options) : undefined;
    const installDependencies =
      mode === "preset"
        ? await resolveBooleanOption(program, "install", options.install, "是否安装依赖？")
        : false;
    const initializeGit = await resolveBooleanOption(
      program,
      "git",
      options.git,
      "是否初始化 Git 仓库？",
    );
    const targetDirectory = path.resolve(process.cwd(), name);

    p.log.info(`正在创建 ${mode === "preset" ? "预设" : "纯净"}模式项目：${name}`);
    const config = {
      name,
      targetDirectory,
      mode,
      installDependencies,
      initializeGit,
      ...(packageManager ? { packageManager } : {}),
    };
    const result = await createProject({
      config,
      templateRoot,
    });

    for (const warning of result.warnings) p.log.warn(warning);
    const nextCommands = [`cd ${quotePath(name)}`];
    if (mode === "preset" && (!installDependencies || result.installSucceeded === false)) {
      nextCommands.push(`${packageManager} install`);
    }
    if (mode === "preset") nextCommands.push(`${packageManager} run dev`);
    p.note(nextCommands.join("\n"), "下一步");
    p.outro(`项目已创建：${targetDirectory}`);
  } catch (error) {
    if (error instanceof UserCancelledError) {
      p.cancel("操作已取消，未继续创建项目");
      return;
    }
    p.log.error(error instanceof Error ? error.message : "发生未知错误");
    process.exitCode = 1;
  }
}

async function resolveProjectName(rawName: string | undefined): Promise<string> {
  if (rawName) {
    const error = validateProjectName(rawName);
    if (error) throw new Error(error);
    return normalizeProjectName(rawName);
  }
  ensureInteractive("缺少项目名，请传入 create-ai-temp <项目名>");
  const answer = await p.text({
    message: "请输入项目名称",
    placeholder: "my-ai-app",
    validate: (value) => validateProjectName(value ?? ""),
  });
  return unwrapPrompt(answer);
}

async function resolveMode(options: CliOptions): Promise<ProjectMode> {
  if (options.preset) return "preset";
  if (options.clean) return "clean";
  ensureInteractive("非交互环境中必须指定 --preset 或 --clean");
  const answer = await p.select<ProjectMode>({
    message: "请选择项目模式",
    options: [
      { value: "preset", label: "预设模式", hint: "Next.js + Zustand + Biome" },
      { value: "clean", label: "纯净模式", hint: "仅生成架构和 AI 配置" },
    ],
  });
  return unwrapPrompt(answer);
}

async function resolvePackageManager(options: CliOptions): Promise<PackageManager> {
  if (options.packageManager) return options.packageManager;
  const detected = await detectPackageManager();
  if (!process.stdin.isTTY) return detected;
  const answer = await p.select<PackageManager>({
    message: "请选择包管理器",
    initialValue: detected,
    options: [
      { value: "pnpm", label: "pnpm" },
      { value: "npm", label: "npm" },
      { value: "yarn", label: "Yarn" },
      { value: "bun", label: "Bun" },
    ],
  });
  return unwrapPrompt(answer);
}

async function resolveBooleanOption(
  program: Command,
  key: "install" | "git",
  value: boolean,
  message: string,
): Promise<boolean> {
  if (program.getOptionValueSource(key) === "cli") return value;
  if (!process.stdin.isTTY) return value;
  return unwrapPrompt(await p.confirm({ message, initialValue: true }));
}

function unwrapPrompt<T>(value: T | symbol): T {
  if (p.isCancel(value)) throw new UserCancelledError();
  return value as T;
}

function ensureInteractive(message: string): void {
  if (!process.stdin.isTTY) throw new Error(message);
}

function quotePath(value: string): string {
  return /\s/.test(value) ? `"${value.replaceAll('"', '\\"')}"` : value;
}

class UserCancelledError extends Error {}
