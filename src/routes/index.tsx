import Home from "../pages/Home";
import { useRoutes } from "react-router-dom";
import { PostDetails } from "../pages/PostDetails";

export default function Router() {
    return useRoutes([
        {
            path: '', element: <Home />
        },
        {
            path: '/:id', element: <PostDetails />
        },
    ])
}