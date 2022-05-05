import esbuild from 'esbuild-wasm';
import { fetchPackage, resolvePackagePath } from '../plugins';

export const buildCode = async (userCode: string) =>
  esbuild.build({
    bundle: true,
    plugins: [resolvePackagePath(), fetchPackage(userCode)],
    entryPoints: ['index.js'],
    define: { 'process.env.NODE_ENV': '"development"', global: 'window' }
  });
