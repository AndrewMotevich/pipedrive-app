import AppExtensionsSDK, { Command } from "@pipedrive/app-extensions-sdk";

let SDK: AppExtensionsSDK;

export const getCustomUISDK = async () => {
  try {
    if (SDK) return SDK;
    SDK = await new AppExtensionsSDK().initialize({
      size: { height: 550, width: 550 },
    });
    return SDK;
  } catch (e) {}
};

export const closeActivityModal = async (sdk: AppExtensionsSDK) => {
  await sdk.execute(Command.CLOSE_MODAL);
  console.log("Close modal");
};

(async function () {
  const sdk = await getCustomUISDK();
})();
