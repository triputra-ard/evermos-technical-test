import headerSettings from "~/composables/headerSettings";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const params = getRouterParam(event, "product_id");

  const header = headerSettings("GET", config, event);
  const urlRequest = `${config.public.apiHostUrl}/products/${params}`;

  try {
    const requestServer = await $fetch(urlRequest, header);
    return {
      data: requestServer,
      success: true,
      message: "Product was successfully retrieved",
    } as InfResponseStandard;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Failed to retrieve product detail",
      stack: undefined,
    });
  }
});
