import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { TripProvider } from "../features/trips/context";

const qc = new QueryClient();

export default function Providers() {
  return (
    <QueryClientProvider client={qc}>
      <TripProvider>
        <RouterProvider router={router} />
      </TripProvider>
    </QueryClientProvider>
  );
}

