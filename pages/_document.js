import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {    //Used here 'class' and not function bcoz we have to extend it.
    render() {
        return (
        <Html lang="en">
            <Head>

            </Head>
            <body>
                <Main></Main>
                <NextScript/>
            </body>
        </Html>
        );
    }
}

export default MyDocument;