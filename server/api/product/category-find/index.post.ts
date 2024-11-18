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

  // if category not included
  if (!Object.hasOwn(body, "category")) {
    throw createError({
      statusCode: 417,
      message: "Category not included",
      stack: undefined,
    });
  }

  const header = headerSettings("GET", config, event);
  let urlRequest = null;
  if (body.request) {
    const objectUrlRequest: InfRequestPaginationServer = {
      limit: body.request.perPage,
      skip: body.request.pageStart,
      sortBy: body.request.sortBy,
      order: body.request.order,
    };
    if (Object.hasOwn(body.request, "search")) {
      Object.assign(objectUrlRequest, {
        q: body.request.search,
      });
    }
    urlRequest = buildUrl(
      `${config.public.apiHostUrl}/products/category/${body.category}`,
      objectUrlRequest
    );
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
        total: requestServer.total,
        pageStart: requestServer.skip,
        perPage: requestServer.limit,
        page: body.request.page,
        sortBy: body.request.sortBy,
        order: body.request.sortBy,
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
