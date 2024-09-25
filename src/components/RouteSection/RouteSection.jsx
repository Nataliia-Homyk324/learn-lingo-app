import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../Loader/Loader.jsx";

const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);
const TeachersPage = lazy(() =>
  import("../../pages/TeachersPage/TeachersPage.jsx")
);
const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));

const FavoritesPage = lazy(() =>
  import("../../pages/FavoritesPage/FavoritesPage.jsx")
);
const Details = lazy(() => import("../Details/Details.jsx"));

const RouteSection = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />}>
          <Route path="details" element={<Details />} />
        </Route>

        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default RouteSection;
