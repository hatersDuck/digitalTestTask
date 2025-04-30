import { joinURL } from "ufo";

export default defineEventHandler(async (event) => {
    const proxyUrl = useRuntimeConfig().proxyUrl;
    console.log(proxyUrl);
    const path = event.path.replace(/^\/api\//, '');
    const target = joinURL(proxyUrl, path);

    return proxyRequest(event, target);
})