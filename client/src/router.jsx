import { createBrowserRouter, redirect } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Paint from "./pages/Paint";

const url = "https://phase2-aio.vercel.app";

const router = createBrowserRouter([
  //   {
  //     path: "/login",
  //     element: <Login url={url} />,
  //     loader: () => {
  //       if (localStorage.access_token) {
  //         Swal.fire({
  //           title: "Ngapain cuk?????",
  //           icon: "question",
  //         });
  //         return redirect("/");
  //       }

  //       return null;
  //     },
  //   },
  {
    path: "/draw-together",
    element: <Paint />,

    // children: [
    //   {
    //     path: "/",
    //     element: <Home url={url} />,
    //   },
    // ],
  },
]);
export default router;
