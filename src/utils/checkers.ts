import fs from "fs"

export function isSvelteKit(): boolean{
  if (!fs.existsSync('package.json')) return false;

  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  return packageJson.devDependencies && packageJson.devDependencies['@sveltejs/kit'];
}

export function detectPackageManager() {
  if (fs.existsSync("./yarn.lock")) {
    return "yarn";
  } else if (fs.existsSync("./package-lock.json")) {
    return "npm";
  } else if (fs.existsSync("./pnpm-lock.yaml")) {
    return "pnpm";
  } else {
    return null; // O manejar de alguna otra manera
  }
}