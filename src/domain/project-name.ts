const NPM_NAME_PATTERN =
  /^(?:@[a-z0-9][a-z0-9._~-]*\/[a-z0-9][a-z0-9._~-]*|[a-z0-9][a-z0-9._~-]*)$/;

export function validateProjectName(name: string): string | undefined {
  const normalizedName = name.trim();
  if (!normalizedName) return "项目名不能为空";
  if (normalizedName.length > 214) return "项目名不能超过 214 个字符";
  if (normalizedName === "." || normalizedName === "..") return "项目名不能是 . 或 ..";
  if (normalizedName.includes("/") || normalizedName.includes("\\")) {
    return "项目名不能包含路径分隔符";
  }
  if (!NPM_NAME_PATTERN.test(normalizedName)) {
    return "请使用小写字母、数字、连字符、下划线或点号，且必须以字母或数字开头";
  }
  return undefined;
}

export function normalizeProjectName(name: string): string {
  return name.trim();
}
