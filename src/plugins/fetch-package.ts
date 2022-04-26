import esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';
import { escapedCss } from '../utils';

const fileCache = localForage.createInstance({
  name: 'file-cache',
  storeName: 'npm-packages'
});

export const fetchPackage = (userCode: string): esbuild.Plugin => ({
  name: 'fetch-package',
  setup(build) {
    build.onLoad({ filter: /.*/, namespace: 'a' }, async (args) => {
      const cache = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
      if (cache) {
        return cache;
      }
    });

    build.onLoad({ filter: /^index\.js$/, namespace: 'a' }, async () => {
      return {
        loader: 'jsx',
        contents: userCode
      };
    });

    build.onLoad({ filter: /.css$/, namespace: 'a' }, async (args) => {
      const { data, request } = await axios.get(args.path);

      const contents = `
        const styleElement = document.createElement('style');
        styleElement.innerText = 
        '${escapedCss(data)}';                
        document.head.appendChild(styleElement);`;

      const result: esbuild.OnLoadResult = {
        loader: 'jsx',
        contents,
        resolveDir: new URL('./', request.responseURL).pathname
      };

      fileCache.setItem(args.path, result);

      return result;
    });

    build.onLoad({ filter: /.*/, namespace: 'a' }, async (args) => {
      try {
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
    });
  }
});
