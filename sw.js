self.addEventListener("activate", async (event) => {
    await self.clients.claim();
})

self.addEventListener("fetch", (event) => {
    async function cacheFirst(url) {
        const cacheStorage = await caches.open("cache-v1");
        // キャシュからのリスポンスの取得
        const cachedResponse = await cacheStorage.match(url);

        if (cachedResponse) {
            // キャシュに存在すれば、そのまま返却する
            return cachedResponse;
        } else {
            // キャシュになければ、まずフェッチする
            const response = await fetch(url);
            // 3秒待ち
            await new Promise(resolve => setTimeout(resolve, 1000));
            // 取得済みのリスポンスをキャシュに保存する
            await cacheStorage.put(url, response.clone());
            // そしてクライアント側へ返す
            return response
        }
    }

    const {url} = event.request;
    event.respondWith(cacheFirst(url))
})