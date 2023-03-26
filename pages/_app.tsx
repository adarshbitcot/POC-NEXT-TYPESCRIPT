
import { wrapper } from "../store/store";
import "../styles/main.css";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";
import { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}



function App({ Component, ...rest }:AppPropsWithLayout) {
  //console.log("rest",rest);
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  // const renderWithLayout =
  //   Component.getLayout ||
  //   function (page) {
  //     return <FullLayout>{page}</FullLayout>;
  //   };
  const getLayout = Component.getLayout || ((page) => page);
  

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </SessionProvider>
  );

  // return (
  //   <FullLayout>
  //     <SessionProvider session={pageProps.session}>
  //       <Component {...pageProps} />
  //     </SessionProvider>
  //   </FullLayout>
  // );
}

export default App;
