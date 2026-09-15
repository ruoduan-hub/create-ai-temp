import { spawn } from "node:child_process";
import type { PackageManager } from "../domain/project.js";

export async function runCommand(
  command: string,
  args: readonly string[],
  cwd: string,
  inheritOutput = true,
): Promise<boolean> {
  return new Promise((resolve) => {
    const child = spawn(command, [...args], {
      cwd,
      shell: process.platform === "win32",
      stdio: inheritOutput ? "inherit" : "ignore",
    });
    child.once("error", () => resolve(false));
    child.once("exit", (code) => resolve(code === 0));
  });
}

export function installCommand(packageManager: PackageManager): readonly string[] {
  return packageManager === "yarn" ? [] : ["install"];
}

export async function isCommandAvailable(command: string): Promise<boolean> {
  const probe = process.platform === "win32" ? "where" : "which";
  return runCommand(probe, [command], process.cwd(), false);
}
