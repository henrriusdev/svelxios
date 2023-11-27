import fs from "fs"

export function isSvelteKit(): boolean{
  if (!fs.existsSync('package.json')) return false;

  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  return packageJson.dependencies && packageJson.dependencies['@sveltejs/kit'];
}
