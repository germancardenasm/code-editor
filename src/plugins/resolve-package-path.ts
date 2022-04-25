import esbuild from 'esbuild-wasm';

export const resolvePackagePath = (): esbuild.Plugin => ({
  name: 'resolve-package-path',
  setup(build) {
    build.onResolve(
      { filter: /(^index\.js$)/},
      (args: any) => {
        return {
          path: args.path,
          namespace: 'a'
        };
      }
    );

    build.onResolve({ filter: /^\.+\//}, (args: any) => {
      return {
        path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
        namespace: 'a'
      };
    });

    build.onResolve({ filter: /.*/, namespace: 'a' }, (args: any) => {
      return {
        path: `https://unpkg.com/${args.path}`,
        namespace: 'a'
      };
    });
  }
});
