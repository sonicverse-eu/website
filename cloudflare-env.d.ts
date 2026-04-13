declare global {
  interface CloudflareEnv {
    ASSETS: Fetcher
    IMAGES: Fetcher
    WORKER_SELF_REFERENCE: Fetcher

    // Add any additional bindings here
    // Example:
    // MY_KV: KVNamespace;
    // MY_DURABLE_OBJECT: DurableObjectNamespace;
  }
}

export {}
