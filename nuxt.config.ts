// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "pathe";
import {federation} from "@module-federation/vite";

const isProd = process.env.NODE_ENV === "production";
const port = 3001
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: false},
    srcDir: "./src",
    serverDir: resolve(__dirname, "src/server"),
    devServer: {
        port: port
    },
    dir: {
        public: resolve(__dirname, "public"),
    },

    experimental: {
        asyncEntry: true,
    },
    nitro: {
        esbuild: {
            options: {
                target: 'chrome89'
            }
        },
    },
    $production: {
        vite: {
            $client: {
                base: '/mfn',
            },
        }
    },
    vite: {
        server: {
            origin: `http://localhost:${port}`,
        },
        $client: {
            plugins: [
                federation({
                    name: 'NuxtMF',
                    filename: `${isProd ? '_nuxt/' : ''}remoteEntry.js`,
                    manifest: {
                        fileName: `${isProd ? '_nuxt/' : ''}mf-manifest.json`,
                    },
                    exposes: {
                        "./remote-app": "./src/exportTestComponent.ts",
                        "./remote-component": "./src/TestComponent.vue",
                    },
                    shared: {
                        // does not work in dev
                        // 'vue': {
                        //     requiredVersion: "^3.4.12",
                        //     singleton: false,
                        //     strictVersion: false,
                        //     version: "3.5.13"
                        // }
                    },
                }),
            ],
        },
        build: {
            target: "chrome89",
        },
    },
    app: {
        rootId: '_mfn-remote',
        buildAssetsDir: '_nuxt',
    },
})