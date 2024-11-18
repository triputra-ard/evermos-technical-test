import headerSettings from "~/composables/headerSettings";
import buildUrl from "~/utils/buildUrl";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  //type of request : product
  if (body.type != "product") {
    throw createError({
      statusCode: 417,
      message: "Invalid request type",
    });
  }

  const header = headerSettings("GET", config, event);
  let url = null;
  if (body.request) {
    const requestUrl: InfRequestPaginationServer = {
      limit: body.request.perPage,
      skip: body.request.pageStart,
      sortBy: body.request.sortBy,
      order: body.request.orderBy,
    };
    if (Object.hasOwn(body.request, "search")) {
      Object.assign(requestUrl, {
        q: body.request.search,
      });
    }
    url = buildUrl(`${config.public.apiHostUrl}/products`, requestUrl);
  } else {
    url = `${config.public.apiHostUrl}/products`;
  }
  try {
    return {
      data: "ok",
    };
  } catch (error) {
    return {
      data: "fail",
    };
  }
});
