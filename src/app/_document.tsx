import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { headers } from "next/headers";

interface HtmlProps {
  nonce?: string;
}

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
      const initialProps = await Document.getInitialProps(ctx);
      // Assuming you have a way to get or generate a nonce in your server-side logic
      // For example, you might attach it to the request object in middleware
      const nonce = ctx.req?.headers['x-nonce'] as string | undefined;
      return { ...initialProps, nonce };
    }

  render() {
    const { nonce } = this.props as any;
    return (
      <Html>
        <Head nonce={nonce}>
          <link
            rel="stylesheet"
            href="/_next/static/css/72fa974a8d79c950.css"
            nonce={nonce}
          />
          <link
            rel="stylesheet"
            href="/_next/static/css/4309c086c8631f6d.css"
            nonce={nonce}
          />
          <link
            rel="stylesheet"
            href="/_next/static/css/a3067f9f25a29071.css"
            nonce={nonce}
          />
          {/* Other head elements */}
        </Head>
        <body>
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;