export function isAllowedOrigin(request, env = process.env) {
  const value = request.headers.get('origin');
  if (!value || value === 'null') return false;
  let origin;
  try { origin = new URL(value).origin; } catch { return false; }
  // Browsers set Fetch Metadata themselves; page JavaScript cannot forge it.
  // This survives reverse proxies and a stale APP_ORIGIN after a URL change.
  const site = request.headers.get('sec-fetch-site');
  if (site === 'same-origin') return true;
  if (site === 'cross-site' || site === 'same-site') return false;
  return [new URL(request.url).origin, env.APP_ORIGIN, env.RENDER_EXTERNAL_URL]
    .filter(Boolean)
    .some(value => { try { return new URL(value).origin === origin; } catch { return false; } });
}
