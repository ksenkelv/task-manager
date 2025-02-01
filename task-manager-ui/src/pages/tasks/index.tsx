import {Button, Typography} from "@mui/material";
import Layout from "@/pages/layout";
import Home from "@/pages";
import TasksTable from "@/components/TasksTable";

const Tasks = () => {

    return (
        <TasksTable/>
    )
}

Tasks.getLayout = (page: JSX.Element) => {
    return <Layout>{ page }</Layout>
}

export default Tasks
