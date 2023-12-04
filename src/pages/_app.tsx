import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

// const emotionCache = createCache({
//   key: "emotion-cache",
//   prepend: true, // ensures styles are prepended to the <head>, instead of appended
// });
const colors = {
  ink: "#141414",
  washi: "#F9F9F0",
  dampWashi: "#EBEBE1",
  off: "#3B3B38",
};
const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// export const theme = extendTheme({
//   config: {
//     initialColorMode: "light",
//     useSystemColorMode: false,
//   },
//   styles: {
//     global: () => ({
//       body: {
//         background: "",
//         color: "",
//         fontFamily: "DM Mono, monospace",
//         fontWeight: "400",
//       },
//     }),
//   },
//   colors,
//   breakpoints,
// });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>YOHAKU Marketplace</title>
      </Head>
      {/* <ChakraProvider theme={theme}> */}
      {/* <MarketProvider> */}
      {/* <BaseLayout> */}
      <Component {...pageProps} />
      {/* </BaseLayout> */}
      {/* </MarketProvider> */}
      {/* </ChakraProvider> */}
    </>
  );
}
