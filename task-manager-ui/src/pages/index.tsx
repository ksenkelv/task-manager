// pages/index.tsx

import { Button, Typography } from '@mui/material';
import {FC, useEffect} from 'react';
import Layout from "@/pages/layout";
import {useRouter} from "next/router";

const Home = () => {
    const router = useRouter()

    useEffect(() => {
        router.push('/tasks')
    }, [])
};

Home.getLayout = (page: JSX.Element) => {
    return <Layout>{ page }</Layout>
}

export default Home;
