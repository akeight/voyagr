import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import LandingPage from "../features/trips/pages/LandingPage";
import GenerateTripPage from "../features/trips/pages/GenerateTripPage";
import TripIdeasPage from "../features/trips/pages/TripIdeasPage";

export const router = createBrowserRouter([
  { path: "/", element: <Layout><LandingPage /></Layout> },
  { path: "/generate", element: <Layout><GenerateTripPage /></Layout> },
  { path: "/ideas", element: <Layout><TripIdeasPage /></Layout> },
]);
