import fs from "fs"

export function isSvelteKit(): boolean{
  if (!fs.existsSync('package.json')) return false;

  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  return packageJson.dependencies && packageJson.dependencies['@sveltejs/kit'];
}

export function getManager(): 'yarn' | 'npm' | 'pnpm' {
  if (fs.existsSync('yarn.lock')) return 'yarn';
  if (fs.existsSync('pnpm-lock.yml')) return 'pnpm';
  if (fs.existsSync('package-lock.json')) return 'npm';

  console.log('No package manager founded, using yarn.');
  return 'yarn';
}