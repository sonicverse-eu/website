declare global {
	interface CloudflareEnv {
		ASSETS: Fetcher;
		IMAGES: any;
		IMAGE_ASSETS: R2Bucket;
		SEND_EMAIL: any;
		
		// Add any additional bindings here
		// Example:
		// MY_KV: KVNamespace;
		// MY_DURABLE_OBJECT: DurableObjectNamespace;
	}
}

export {};