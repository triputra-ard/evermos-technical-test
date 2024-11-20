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
      stack: undefined,
    });
  }

  const header = headerSettings("GET", config, event);
  let urlRequest = null;
  if (body.request) {
    const objectUrlRequest: InfRequestPaginationServer = {
      limit: body.request.perPage,
      skip: body.request.pageStart,
      order: body.request.order,
    };
    if (Object.hasOwn(body.request, "sortBy")) {
      Object.assign(objectUrlRequest, {
        sortBy: body.request.sortBy,
      });
    }
    if (Object.hasOwn(body.request, "search")) {
      Object.assign(objectUrlRequest, {
        q: body.request.search,
      });
      urlRequest = buildUrl(
        `${config.public.apiHostUrl}/products/search`,
        objectUrlRequest
      );
    } else {
      urlRequest = buildUrl(
        `${config.public.apiHostUrl}/products`,
        objectUrlRequest
      );
    }
  } else {
    throw createError({
      statusCode: 417,
      message: "Request body is invalid",
      stack: undefined,
    });
  }
  try {
    const requestServer = await $fetch(urlRequest, header);

    return {
      data: requestServer.products,
      success: true,
      message: "Product successfully retrieved",
      pagination: {
        total: Math.ceil(requestServer.total / body.request.perPage),
        pageStart: requestServer.skip,
        perPage: requestServer.limit,
        page: body.request.page,
        order: body.request.order,
      },
    } as InfResponseStandard;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Failed to retrieve product",
      stack: undefined,
    });
  }
});
