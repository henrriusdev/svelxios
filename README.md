![Svelxios logo](docs/svelxios.png)
# Svelxios: Svelte Axios Wrapper

## How to use?

Download the CLI to your **SvelteKit Project** with the package manager of your choice:

```bash
npm i svelxios
# or
yarn add svelxios
# or
pnpm add svelxios
```

**Note: After using the CLI, you can uninstall it.**

Then, execute the CLI:

```bash
npx svelxios
```

Here the CLI would install axios and write the code for the axios wrapper for sveltekit in these files:

1. `src/app.d.ts`: In the app locals for better use on the server side.
2. `src/lib/server/client.ts`: Here is the Axios Client.
3. `src/lib/utils/debugger.ts`: Axios Debuggers
4. `src/hooks.server.ts`: Here the client would be loaded to the app locals.

## And then?

Use it as a common axios client on the server side of your SvelteKit app:

```typescript
import type {PageServerLoad} from './$types';

export const load: PageServerLoad = async ({locals:{svelxios}}) => {
  const response = await svelxios.get('/your-api');
  console.log(response);
}
```

### Special notes

* You must have a .env file that has a **baseUrl** for this axios client, this is used on the creation of the client.

```typescript
import {baseUrl} from "$env/static/private";

const client = axios.create(
  baseURL: baseUrl
);
// ...
// more code

export {client}
```

* Once you has svelxios running properly, you can uninstall the CLI.

## Special thanks to:

* [4ndual](https://github.com/4ndual)
* [gracrys](https://github.com/gracrys)
* [Axios Team](https://github.com/axios/axios) (Great http client, thanks)
