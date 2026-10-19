import { afterEach, expect, test } from "bun:test";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { runInNewContext } from "node:vm";
import { redirectWithParams, redirectWithParamsScript } from "./redirect-with-params";

const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");

afterEach(() => {
  if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow);
  else Reflect.deleteProperty(globalThis, "window");
});

function redirect(search, destination) {
  const location = { search, href: "" };
  Object.defineProperty(globalThis, "window", { configurable: true, value: { location } });
  redirectWithParams(destination);
  return location.href;
}

test("without current parameters the destination remains unchanged", () => {
  expect(redirect("", "https://checkout.example/pay?id=123")).toBe("https://checkout.example/pay?id=123");
});

test("UTM, fbclid, gclid and arbitrary parameters are appended intact", () => {
  const search = "?utm_source=meta&utm_campaign=Banho%20Premium&fbclid=fb%2B123&gclid=gc%2F456&custom=a+b&custom=c&empty=";
  expect(redirect(search, "https://checkout.example/pay/123")).toBe("https://checkout.example/pay/123" + search);
});

test("existing destination parameters are retained before all current parameters", () => {
  expect(redirect("?utm_source=meta&fbclid=123&gclid=456", "https://checkout.example/pay?id=123"))
    .toBe("https://checkout.example/pay?id=123&utm_source=meta&fbclid=123&gclid=456");
});

test("home navigation also retains the entire query string", () => {
  expect(redirect("?utm_source=meta&fbclid=123&gclid=456", "/"))
    .toBe("/?utm_source=meta&fbclid=123&gclid=456");
});

test("the global head function preserves raw parameters across consecutive pages", () => {
  const search = "?utm_source=meta&fbclid=fb%2B123&gclid=gc%2F456&custom=a+b&custom=c&empty=";
  const browser = { location: { search, href: "" } };
  runInNewContext(redirectWithParamsScript, { window: browser });
  browser.redirectWithParams("https://checkout.example/pay/123");
  expect(browser.location.href).toBe("https://checkout.example/pay/123" + search);
  browser.redirectWithParams("https://checkout.example/next?step=2");
  expect(browser.location.href).toBe("https://checkout.example/next?step=2&" + search.substring(1));
});

test("all application navigation writes stay inside the canonical redirect function", () => {
  function files(directory) {
    return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? files(path) : [path];
    });
  }
  const sourceFiles = files(join(import.meta.dir, "..")).filter(path => /\.(ts|tsx|js)$/.test(path) && !path.includes(".test.") && !path.endsWith("routeTree.gen.ts"));
  for (const path of sourceFiles) {
    const source = readFileSync(path, "utf8");
    if (path.endsWith("/redirect-with-params.ts")) {
      const functionBody = source.slice(source.indexOf("export function redirectWithParams"), source.indexOf("declare global"));
      expect(functionBody.match(/location\.href\s*=/g)?.length).toBe(3);
      expect(source.slice(source.indexOf("declare global"))).not.toMatch(/location\.href\s*=/);
      continue;
    }
    expect(source).not.toMatch(/\blocation\s*(?:\.\s*href)?\s*=(?!=)|\blocation\s*\.\s*(?:assign|replace|reload)\s*\(|window\s*\.\s*open\s*\(/);
    expect(source).not.toMatch(/import\s*\{[^}]*\bredirectWithParams\b[^}]*\}\s*from/);
  }
});