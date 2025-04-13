var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 51,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 101,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var links = () => [
  ...void 0 ? [{ rel: "stylesheet", href: void 0 }] : []
];
function App() {
  return /* @__PURE__ */ jsxDEV2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 20,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 21,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 22,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 23,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 19,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 26,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 27,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 25,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 18,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => CurrentConditions,
  loader: () => loader,
  meta: () => meta
});
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// app/data-access/redis-connection.ts
import { createClient } from "redis";
var url = process.env.REDIS_URL || "redis://localhost:6379", redis = await createClient({ url }).on("error", (err) => console.error("Redis client connection error", err)).connect();

// app/api-services/open-weather-service.ts
var API_KEY = process.env.WEATHER_API_KEY, BASE_URL = "https://api.openweathermap.org/data/2.5/weather", TEN_MINUTES = 1e3 * 60 * 10;
async function fetchWeatherData({
  lat,
  lon,
  units: units2
}) {
  let queryString = `lat=${lat}&lon=${lon}&units=${units2}`, cacheEntry = await redis.get(queryString);
  if (cacheEntry)
    return JSON.parse(cacheEntry);
  let data = await (await fetch(`${BASE_URL}?${queryString}&appid=${API_KEY}`)).text();
  return await redis.set(queryString, data, { PX: TEN_MINUTES }), JSON.parse(data);
}

// app/utils/text-formatting.ts
function capitalizeFirstLetter(sourceString) {
  return sourceString.charAt(0).toUpperCase() + sourceString.slice(1);
}

// app/routes/_index.tsx
import { Fragment, jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var meta = () => [
  { title: "Remix Weather" },
  {
    name: "description",
    content: "A demo web app using Remix and OpenWeather API."
  }
], location = {
  city: "Ottawa",
  postalCode: "K2G 1V8",
  // Algonquin College, Woodroffe Campus
  lat: 45.3211,
  lon: -75.7391,
  countryCode: "CA"
}, units = "metric";
async function loader() {
  let data = await fetchWeatherData({
    lat: location.lat,
    lon: location.lon,
    units
  });
  return json({ currentConditions: data });
}
function CurrentConditions() {
  let { currentConditions } = useLoaderData(), weather = currentConditions.weather[0];
  return /* @__PURE__ */ jsxDEV3(Fragment, { children: [
    /* @__PURE__ */ jsxDEV3(
      "main",
      {
        style: {
          padding: "1.5rem",
          fontFamily: "system-ui, sans-serif",
          lineHeight: "1.8"
        },
        children: [
          /* @__PURE__ */ jsxDEV3("h1", { children: "Remix Weather" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 50,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV3("p", { children: [
            "For Algonquin College, Woodroffe Campus ",
            /* @__PURE__ */ jsxDEV3("br", {}, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 52,
              columnNumber: 51
            }, this),
            /* @__PURE__ */ jsxDEV3("span", { style: { color: "hsl(220, 23%, 60%)" }, children: [
              "(LAT: ",
              location.lat,
              ", LON: ",
              location.lon,
              ")"
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 53,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 51,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV3("h2", { children: "Current Conditions" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 57,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV3(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "row",
                gap: "2rem",
                alignItems: "center"
              },
              children: [
                /* @__PURE__ */ jsxDEV3("img", { src: getWeatherIconUrl(weather.icon), alt: "" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 66,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDEV3("div", { style: { fontSize: "2rem" }, children: [
                  currentConditions.main.temp.toFixed(1),
                  "\xB0C"
                ] }, void 0, !0, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 67,
                  columnNumber: 11
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 58,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV3(
            "p",
            {
              style: {
                fontSize: "1.2rem",
                fontWeight: "400"
              },
              children: [
                capitalizeFirstLetter(weather.description),
                ". Feels like",
                " ",
                currentConditions.main.feels_like.toFixed(1),
                "\xB0C.",
                /* @__PURE__ */ jsxDEV3("br", {}, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 79,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDEV3("span", { style: { color: "hsl(220, 23%, 60%)", fontSize: "0.85rem" }, children: [
                  "updated at",
                  " ",
                  new Intl.DateTimeFormat("en-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit"
                  }).format(currentConditions.dt * 1e3)
                ] }, void 0, !0, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 80,
                  columnNumber: 11
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 71,
              columnNumber: 9
            },
            this
          )
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/_index.tsx",
        lineNumber: 43,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV3(
      "section",
      {
        style: {
          backgroundColor: "hsl(220, 54%, 96%)",
          padding: "0.5rem 1.5rem 1rem 1.5rem",
          borderRadius: "0.25rem"
        },
        children: [
          /* @__PURE__ */ jsxDEV3("h2", { children: "Raw Data" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 99,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV3("pre", { children: JSON.stringify(currentConditions, null, 2) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 100,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/_index.tsx",
        lineNumber: 92,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV3("hr", { style: { marginTop: "2rem" } }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 102,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3("p", { children: [
      "Learn how to customize this app. Read the",
      " ",
      /* @__PURE__ */ jsxDEV3("a", { target: "_blank", href: "https://remix.run/docs", rel: "noreferrer", children: "Remix Docs" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 105,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 103,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 42,
    columnNumber: 5
  }, this);
}
function getWeatherIconUrl(iconCode) {
  return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-6H3LLWGE.js", imports: ["/build/_shared/chunk-O4BRYNJ4.js", "/build/_shared/chunk-E2WQWRSX.js", "/build/_shared/chunk-XGOTYLZ5.js", "/build/_shared/chunk-UFTHTFNB.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-U4FRFQSK.js", "/build/_shared/chunk-7M6SC7J5.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-JOYBR6E6.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-JXJ6XIPH.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "31c0c048", hmr: { runtime: "/build/_shared/chunk-UFTHTFNB.js", timestamp: 1744395346051 }, url: "/build/manifest-31C0C048.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, v3_routeConfig: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
