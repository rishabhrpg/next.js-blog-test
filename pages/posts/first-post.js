import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";

export default function FirstPost() {
    return (
        <Layout>
        <Head>
            <title>Frist Post</title>
        </Head>
            <h1>First Post</h1>
            <SecondPost/>
            <h2>
                <Link href="/">Back to home </Link>
            </h2>
        </Layout>
    )
}

export function SecondPost() {
    return (
        <><h1>Second Post</h1></>
    )
}