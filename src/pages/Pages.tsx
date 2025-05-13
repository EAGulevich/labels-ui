import { lazy } from "react";
import { Route, Routes } from "react-router";

import { ROUTE_PATHS } from "@constants";

const HomePageRouteComponent = lazy(() => import("./HomePage/HomePage.tsx"));
const HostPageRouteComponent = lazy(() => import("./HostPage/HostPage.tsx"));
const PlayerPageRouteComponent = lazy(
  () => import("./PlayerPage/PlayerPage.tsx"),
);

const NotFoundPageRouteComponent = lazy(
  () => import("./NotFoundPage/NotFoundPage.tsx"),
);

export const Pages = () => {
  return (
    <Routes>
      <Route path={ROUTE_PATHS.home} element={<HomePageRouteComponent />} />
      <Route path={ROUTE_PATHS.host} element={<HostPageRouteComponent />} />
      <Route path={ROUTE_PATHS.player} element={<PlayerPageRouteComponent />} />
      <Route path="*" element={<NotFoundPageRouteComponent />} />
    </Routes>
  );
};
