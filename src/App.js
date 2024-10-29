import { RouterProvider } from "react-router-dom";
import router from "./router";
function App() {
  return (
    <div className=' bg-gray-500 w-full h-screen flex flex-col items-center justify-center'>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
