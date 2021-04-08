import React, { ReactNode, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Spin } from "antd";
import routers from "@/router/routers";
import Container from "@/components/layout";

export interface RoutesOption {
  path: string;
  component:
    | React.LazyExoticComponent<(props: any) => JSX.Element>
    | ((props: any) => JSX.Element);
  title?: string;
  children?: RoutesOption[];
}

interface PrivateRouteProps {
  children: ReactNode;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  // 权限控制路由
  function PrivateRoute(props: PrivateRouteProps) {
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
  return (
    <Router>
      <Switch>
        <Redirect from="/" to="/login" exact />
        {/* <Route path="/login" component={require("@/pages/Login").default} /> */}
        <PrivateRoute>
          <Container>
            <Suspense fallback={<Spin tip="加载中..." />}>
              <Switch>
                {routers.map((d: RoutesOption) => {
                  if (d.component) {
                    return (
                      <Route
                        key={d.path}
                        path={d.path}
                        component={d.component}
                      />
                    );
                  }
                  if (d.children && d.children.length > 0) {
                    return d.children.map((v) => (
                      <Route
                        key={v.path}
                        path={v.path}
                        component={v.component}
                      />
                    ));
                  }
                })}
              </Switch>
            </Suspense>
          </Container>
        </PrivateRoute>
        <Route path="*">
          <h1>404</h1>
        </Route>
      </Switch>
    </Router>
  );
};
