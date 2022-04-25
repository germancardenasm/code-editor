import esbuild from 'esbuild-wasm';
import axios from 'axios';

export const getEnvPlugin = (userCode: string): esbuild.Plugin => ({
  name: 'env',
  setup(build) {
    build.onResolve({ filter: /.*/ }, (args) => {
      console.log({ onResolveArgs: args });
      if (args.path === 'index.js') {
        return {
          path: args.path,
          namespace: 'a'
        };
      }

      if (/^.\//.test(args.path) || /^(..)\//.test(args.path)) {
        return {
          path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`)
            .href,
          namespace: 'a'
        };
      }

      return {
        path: `https://unpkg.com/${args.path}`,
        namespace: 'a'
      };
    });

    build.onLoad({ filter: /.*/, namespace: 'a' }, async (args) => {
      console.log({ onLoadArgs: args });
      if (args.path === 'index.js') {
        console.log({ userCode });
        return {
          loader: 'jsx',
          contents: userCode
        };
      } else {
        try {
          const { data, request } = await axios.get(args.path);
          console.warn({ data, request });
          return {
            loader: 'jsx',
            contents: data,
            resolveDir: new URL('./', request.responseURL).pathname
          };
        } catch (e) {
          console.log({ error: e });
        }
      }
    });
  }
});
