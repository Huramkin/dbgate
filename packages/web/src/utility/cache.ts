type CacheChangeHandler = (data: any) => void;

const cacheChangeHandlers: CacheChangeHandler[] = [];
let batchedTriggers: any[] = [];
let batchTimeout: ReturnType<typeof setTimeout> | null = null;

export function subscribeCacheChange(handler: CacheChangeHandler) {
  cacheChangeHandlers.push(handler);
  return () => {
    const idx = cacheChangeHandlers.indexOf(handler);
    if (idx >= 0) cacheChangeHandlers.splice(idx, 1);
  };
}

export function dispatchCacheChange(data: any) {
  for (const handler of cacheChangeHandlers) {
    handler(data);
  }
}

export function batchDispatchCacheTriggers(filter?: (trigger: any) => boolean) {
  if (batchTimeout) {
    clearTimeout(batchTimeout);
  }

  batchTimeout = setTimeout(() => {
    for (const trigger of batchedTriggers) {
      if (!filter || filter(trigger)) {
        dispatchCacheChange(trigger);
      }
    }
    batchedTriggers = [];
    batchTimeout = null;
  }, 100);
}
