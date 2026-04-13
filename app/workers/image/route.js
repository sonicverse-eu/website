'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create((typeof Iterator === 'function' ? Iterator : Object).prototype)
    return (
      (g.next = verb(0)),
      (g['throw'] = verb(1)),
      (g['return'] = verb(2)),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.GET = GET
var cloudflare_1 = require('@opennextjs/cloudflare')
var ORIGIN_BASE_URL = new URL('https://example.com')
function getValidatedOriginUrl(source) {
  var trimmed = source.trim()
  if (!trimmed) return null
  // Only allow relative paths for origin fallback.
  // Reject absolute and protocol-relative URLs.
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed) || trimmed.startsWith('//')) {
    return null
  }
  var decoded
  try {
    decoded = decodeURIComponent(trimmed)
  } catch (_a) {
    return null
  }
  var normalized = decoded.replace(/^\/+/, '')
  if (!normalized) return null
  // Disallow control chars, backslashes, query/fragment injection.
  if (/[\u0000-\u001F\u007F\\?#]/.test(normalized)) {
    return null
  }
  var segments = normalized.split('/')
  // Prevent traversal and require safe path segments only.
  if (
    segments.some(function (segment) {
      return !segment || segment === '.' || segment === '..' || !/^[A-Za-z0-9._-]+$/.test(segment)
    })
  ) {
    return null
  }
  // Restrict to known image directories.
  if (
    !(
      normalized.startsWith('images/') ||
      normalized.startsWith('stock/') ||
      normalized.startsWith('images/stock/')
    )
  ) {
    return null
  }
  // Restrict to expected image file extensions.
  if (!/\.(?:png|jpe?g|webp|gif|svg|avif)$/i.test(normalized)) {
    return null
  }
  return new URL('/'.concat(normalized), ORIGIN_BASE_URL)
}
function tryFetchFromAssets(env, source) {
  return __awaiter(this, void 0, void 0, function () {
    var assetPaths, _i, assetPaths_1, assetPath, assetsResponse, headers, e_1
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          assetPaths = [
            source,
            '/'.concat(source.replace(/^\/+/, '')),
            source.replace(/^images\//, ''),
            source.replace(/^\/images\//, ''),
          ]
          ;((_i = 0), (assetPaths_1 = assetPaths))
          _a.label = 1
        case 1:
          if (!(_i < assetPaths_1.length)) return [3 /*break*/, 6]
          assetPath = assetPaths_1[_i]
          _a.label = 2
        case 2:
          _a.trys.push([2, 4, , 5])
          console.log('Trying ASSETS path: '.concat(assetPath))
          return [4 /*yield*/, env.ASSETS.fetch(new Request(assetPath))]
        case 3:
          assetsResponse = _a.sent()
          if (assetsResponse.ok && assetsResponse.body) {
            console.log('Found image in ASSETS: '.concat(assetPath))
            headers = new Headers(assetsResponse.headers)
            headers.set('cache-control', 'public, max-age=31536000, immutable')
            return [2 /*return*/, new Response(assetsResponse.body, { headers: headers })]
          }
          return [3 /*break*/, 5]
        case 4:
          e_1 = _a.sent()
          console.error('Failed to fetch %s from ASSETS:', assetPath, e_1)
          return [3 /*break*/, 5]
        case 5:
          _i++
          return [3 /*break*/, 1]
        case 6:
          return [2 /*return*/, null]
      }
    })
  })
}
function GET(request) {
  return __awaiter(this, void 0, void 0, function () {
    var env, url, source, assetsResponse, validatedOriginUrl, originResponse, headers, e_2
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          env = (0, cloudflare_1.getCloudflareContext)().env
          url = new URL(request.url)
          source = url.searchParams.get('src')
          if (!source) {
            return [2 /*return*/, new Response('Missing src parameter', { status: 400 })]
          }
          console.log('Image request for: '.concat(source))
          return [4 /*yield*/, tryFetchFromAssets(env, source)]
        case 1:
          assetsResponse = _a.sent()
          if (assetsResponse) return [2 /*return*/, assetsResponse]
          validatedOriginUrl = getValidatedOriginUrl(source)
          if (!validatedOriginUrl) {
            return [2 /*return*/, new Response('Invalid src URL', { status: 400 })]
          }
          _a.label = 2
        case 2:
          _a.trys.push([2, 4, , 5])
          console.log('Trying origin fetch for: '.concat(validatedOriginUrl.toString()))
          return [4 /*yield*/, fetch(validatedOriginUrl)]
        case 3:
          originResponse = _a.sent()
          if (originResponse.ok) {
            console.log('Found image at origin: '.concat(validatedOriginUrl.toString()))
            headers = new Headers(originResponse.headers)
            headers.set('cache-control', 'public, max-age=31536000, immutable')
            return [2 /*return*/, new Response(originResponse.body, { headers: headers })]
          }
          return [3 /*break*/, 5]
        case 4:
          e_2 = _a.sent()
          console.error('Origin fetch error:', e_2)
          return [3 /*break*/, 5]
        case 5:
          console.log('Image not found: '.concat(source))
          return [2 /*return*/, new Response('Image not found: '.concat(source), { status: 404 })]
      }
    })
  })
}
