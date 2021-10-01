import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { UserRole } from "../__generated__/globalTypes";
import { Header } from "../components/header";

import MyPodcasts from "../pages/host/myPodcasts";
import { CreatePodcast } from "../pages/host/createPodcast";
import { UpdatePodcast } from "../pages/host/updatePodcast";
import Episodes from "../pages/host/episodes";
import { CreateEpisode } from "../pages/host/createEpisode";
import { UpdateEpisode } from "../pages/host/updateEpisode";

import { EditProfile } from "../pages/editProfile";
import NotFound from "../pages/404";

import Podcasts from "../pages/listener/podcasts";
import Podcast from "../pages/listener/podcast";
import { Subscriptions } from "../pages/listener/subscriptions";

const listenerRoutes = [
  { path: "/", component: <Podcasts /> },
  { path: "/podcast/:id", component: <Podcast /> },
  { path: "/subscriptions", component: <Subscriptions /> },
];

const commonRoutes = [{ path: "/edit-profile", component: <EditProfile /> }];

const hostRoutes = [
  { path: "/", component: <MyPodcasts /> },
  { path: "/episodes/:id", component: <Episodes /> },
  { path: "/createPodcast", component: <CreatePodcast /> },
  { path: "/updatePodcast", component: <UpdatePodcast /> },
  { path: "/createEpisode", component: <CreateEpisode /> },
  { path: "/updateEpisode", component: <UpdateEpisode /> },
];

export const LoggedInRoute = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === UserRole.Listener &&
          listenerRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {data.me.role === UserRole.Host &&
          hostRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {commonRoutes.map((route) => (
          <Route key={route.path} path={route.path}>
            {route.component}
          </Route>
        ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
