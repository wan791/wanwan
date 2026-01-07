interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
  VITE_API_URL?: string;
  VITE_Web_Trader_UUID?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // 处理 API 请求
    if (url.pathname.startsWith("/api/")) {
      // 这里可以添加自定义 API 处理逻辑
      if (url.pathname === "/api/name") {
        return new Response(JSON.stringify({ name: "Cloudflare" }), {
          headers: { "Content-Type": "application/json" },
        });
      }
      // 其他 API 请求可以在这里处理
      return new Response("API Not Found", { status: 404 });
    }

    // 处理静态资源（通过 ASSETS binding）
    // 当配置了 [assets] 时，env.ASSETS 会自动处理静态文件
    // 包括 index.html 和所有静态资源（JS、CSS、图片等）
    // 对于 SPA，所有非 API 请求都应该返回 index.html
    if (env.ASSETS) {
      try {
        const response = await env.ASSETS.fetch(request);
        
        // 如果是 HTML 文件，注入环境变量
        if (response.status === 200 && response.headers.get("content-type")?.includes("text/html")) {
          let html = await response.text();
          
          // 在 </head> 之前注入环境变量脚本
          const envScript = `
<script>
  // 运行时注入环境变量（从 Cloudflare Worker env 读取）
  window.__ENV__ = {
    VITE_API_URL: ${JSON.stringify(env.VITE_API_URL || "https://apistock-1hgl.onrender.com")},
    VITE_Web_Trader_UUID: ${JSON.stringify(env.VITE_Web_Trader_UUID || "default-trader-uuid")}
  };
  
  // 替换 import.meta.env 的值（在 Vite 构建后）
  if (typeof window !== 'undefined' && window.__ENV__) {
    // 在模块加载前设置
    Object.defineProperty(window, '__VITE_ENV__', {
      value: window.__ENV__,
      writable: false,
      configurable: false
    });
  }
</script>
`;
          html = html.replace("</head>", envScript + "</head>");
          
          // 复制原始响应头
          const newHeaders = new Headers(response.headers);
          newHeaders.set("Content-Type", "text/html; charset=utf-8");
          
          return new Response(html, {
            headers: newHeaders,
          });
        }
        
        // 如果静态资源不存在，返回 index.html（SPA 路由）
        if (response.status === 404) {
          const indexRequest = new Request(new URL("/index.html", request.url), request);
          const indexResponse = await env.ASSETS.fetch(indexRequest);
          
          // 注入环境变量到 index.html
          if (indexResponse.status === 200) {
            let html = await indexResponse.text();
            const envScript = `
<script>
  // 运行时注入环境变量（从 Cloudflare Worker env 读取）
  window.__ENV__ = {
    VITE_API_URL: ${JSON.stringify(env.VITE_API_URL || "https://apistock-1hgl.onrender.com")},
    VITE_Web_Trader_UUID: ${JSON.stringify(env.VITE_Web_Trader_UUID || "default-trader-uuid")}
  };
  
  // 替换 import.meta.env 的值（在 Vite 构建后）
  if (typeof window !== 'undefined' && window.__ENV__) {
    Object.defineProperty(window, '__VITE_ENV__', {
      value: window.__ENV__,
      writable: false,
      configurable: false
    });
  }
</script>
`;
            html = html.replace("</head>", envScript + "</head>");
            
            // 复制原始响应头
            const newHeaders = new Headers(indexResponse.headers);
            newHeaders.set("Content-Type", "text/html; charset=utf-8");
            
            return new Response(html, {
              headers: newHeaders,
            });
          }
          return indexResponse;
        }
        return response;
      } catch (error) {
        console.error("Error fetching assets:", error);
        return new Response("Internal Server Error", { status: 500 });
      }
    }

    // 如果没有 ASSETS binding，返回 404
    return new Response("Not Found - ASSETS binding not available", { status: 404 });
  },
};