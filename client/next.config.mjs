/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  productionBrowserSourceMaps: false,
  generateBuildId: () => "fruits-deploy-project",

  // 아래의 주소만 out폴더에 만들어줘 (getServerSideProps가 있는 페이지는 제외함)
  // exportPathMap: () => ({
  //   "/": {
  //     page: "/",
  //     query: { __nextDefaultLocale: "en", __nextLocale: "en" },
  //   },
  //   "/fruitsmap": {
  //     page: "/fruitsmap",
  //     query: { __nextDefaultLocale: "en", __nextLocale: "en" },
  //   },
  // }),
};

export default nextConfig;
