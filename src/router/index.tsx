import React, { ReactNode, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Spin } from "antd";
import routers from "@/router/routers";

export interface Meta {
  permissions?: string[];
}

export interface RoutesOption {
  path: string;
  component?:
  | React.LazyExoticComponent<(props: any) => JSX.Element>
  | ((props: any) => JSX.Element);
  title?: string;
  children?: RoutesOption[];
  meta?: Meta;
}

interface PrivateRouteProps {
  children: ReactNode;
}

// eslint-disable-next-line import/no-anonymous-default-export
function AppRouter() {
  // 权限控制路由
  const PrivateRoute = (props: PrivateRouteProps) => {
    const { children, ...rest } = props;
    const userInfo = true;
    return (
      <Route
        {...rest}
        render={({ location }) =>
          userInfo ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  // 递归路由
  const tileRouter = (routers: RoutesOption[] | undefined, fPath: string = ''): any => {
    return routers?.map(x => {
      const mergePath = fPath + x.path;
      if(x.children && x.children.length > 0) {
        return (
          <Route
            key={mergePath}
            path={mergePath}
            render={() => {
              return <Suspense fallback={<Spin tip="加载中..." />}>{React.createElement(x.component || Switch, {}, tileRouter(x.children, mergePath))}</Suspense>;
            }}
          />
        );
      } else {
        return (
          <Route
            key={mergePath}
            path={mergePath}
            component={x.component}
          />
        );
      }
    })
  }

  return (
    <Router>
      <Switch>
        <Redirect from="/" to="/login" exact />
        <PrivateRoute>
          <Suspense fallback={<Spin tip="加载中..." />}>
            <Switch>
              {tileRouter(routers)}
            </Switch>
          </Suspense>
        </PrivateRoute>
        <Route path="*">
          <h1>404</h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
