export const GlobalStyle = createGlobalStyle`
* {
    font-family: "Gill Sans", sans-serif;
    margin: 0;
    padding: 0;
  }
`
import { createGlobalStyle } from 'styled-components';
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";


export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
        <ThirdwebProvider
        supportedWallets={[
          metamaskWallet({
            recommended: true,
          }),
          coinbaseWallet(),
          walletConnect(),
        ]}
        clientId="692c1e35e40aa2dfe356446c76922bdd"
      >
        <Component {...pageProps} />
      </ThirdwebProvider>
    </>
  );
}