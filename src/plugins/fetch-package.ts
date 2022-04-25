import esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'file-cache',
  storeName: 'npm-packages'
});

export const fetchPackage = (userCode: string): esbuild.Plugin => ({
  name: 'fetch-package',
  setup(build) {
    build.onLoad({ filter: /.*/, namespace: 'a' }, async (args) => {
      if (args.path === 'index.js') {
        return {
          loader: 'jsx',
          contents: userCode
        };
      } else {
        try {
          const cache = await fileCache.getItem<esbuild.OnLoadResult>(
            args.path
          );
          if (cache) {
            return cache;
          }
          const { data, request } = await axios.get(args.path);
          const result: esbuild.OnLoadResult = {
            loader: 'jsx',
            contents: data,
            resolveDir: new URL('./', request.responseURL).pathname
          };
          fileCache.setItem(args.path, result);
          return result;
        } catch (e) {
          console.log({ error: e });
        }
      }
    });
  }
});
