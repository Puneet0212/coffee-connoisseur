import { useRouter } from "next/router";
import Head from "next/head";

const DynamicRoute = () => {
    const router = useRouter();
    const query = router.query.dynamic;
    console.log("query",query);
    return (
    <div>
        <Head>
            <title>{query}</title>
        </Head>
        <h1>Puneet Satish Patil {query}</h1>
    </div>
    );
}

export default DynamicRoute;