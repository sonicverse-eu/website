declare global {
	interface CloudflareEnv {
		ASSETS: Fetcher;

		// Add any additional bindings here
		// Example:
		// MY_KV: KVNamespace;
		// MY_DURABLE_OBJECT: DurableObjectNamespace;
	}
}

export {};