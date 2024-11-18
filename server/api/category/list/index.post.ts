import headerSettings from "~/composables/headerSettings";
import buildUrl from "~/utils/buildUrl";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  //type of request : category
  if (body.type != "category") {
    throw createError({
      statusCode: 417,
      message: "Invalid request type",
      stack: undefined,
    });
  }

  const header = headerSettings("GET", config, event);
  const urlRequest = `${config.public.apiHostUrl}/products/categories`;
  try {
    const requestServer = await $fetch(urlRequest, header);

    return {
      data: requestServer.products,
      success: true,
      message: "Category successfully retrieved",
    } as InfResponseStandard;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Failed to retrieve category",
      stack: undefined,
    });
  }
});
