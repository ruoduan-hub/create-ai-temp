import { describe, expect, it } from "vitest";
import { normalizeProjectName, validateProjectName } from "../src/domain/project-name.js";

describe("validateProjectName", () => {
  it.each(["my-app", "app_2", "web.template"])("接受合法项目名 %s", (name) => {
    expect(validateProjectName(name)).toBeUndefined();
  });

  it.each(["", "My App", "../escape", "UPPERCASE", "."])("拒绝非法项目名 %s", (name) => {
    expect(validateProjectName(name)).toBeTypeOf("string");
  });

  it("清理项目名两端空白", () => {
    expect(normalizeProjectName("  my-app  ")).toBe("my-app");
  });
});
