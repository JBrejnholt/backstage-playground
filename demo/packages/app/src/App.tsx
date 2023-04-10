import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { apiDocsPlugin, ApiExplorerPage } from '@backstage/plugin-api-docs';
import { githubAuthApiRef } from '@backstage/core-plugin-api';
import { SignInPage } from '@backstage/core-components';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
} from '@backstage/plugin-catalog';
import {
  CatalogImportPage,
  catalogImportPlugin,
} from '@backstage/plugin-catalog-import';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { orgPlugin } from '@backstage/plugin-org';
import { SearchPage } from '@backstage/plugin-search';
import { TechRadarPage } from '@backstage/plugin-tech-radar';
import {
  TechDocsIndexPage,
  techdocsPlugin,
  TechDocsReaderPage,
} from '@backstage/plugin-techdocs';
import { TechDocsAddons } from '@backstage/plugin-techdocs-react';
import { ReportIssue } from '@backstage/plugin-techdocs-module-addons-contrib';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { apis } from './apis';
import { entityPage } from './components/catalog/EntityPage';
import { searchPage } from './components/search/SearchPage';
import { Root } from './components/Root';

import { AlertDisplay, OAuthRequestDialog } from '@backstage/core-components';
import { AppRouter, FlatRoutes } from '@backstage/core-app-api';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import { RequirePermission } from '@backstage/plugin-permission-react';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';
import { DemoPluginPage } from '@internal/plugin-demo-plugin';
import { createApp } from '@backstage/app-defaults';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LightIcon from '@material-ui/icons/WbSunny';

const app = createApp({
  apis,
  themes: [{
    id: 'my-theme',
    title: 'My Custom Theme',
    variant: 'light',
    icon: <LightIcon />,
    Provider: ({ children }) => (
      <ThemeProvider theme={myTheme}>
        <CssBaseline>{children}</CssBaseline>
      </ThemeProvider>
    ),
  }],
  components: {
    SignInPage: props => (
      <SignInPage
        {...props}
        auto
        provider={{
          id: 'github-auth-provider',
          title: 'GitHub',
          message: 'Sign in using GitHub',
          apiRef: githubAuthApiRef,
        }}
      />
    ),
  },
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
      viewTechDoc: techdocsPlugin.routes.docRoot,
    });
    bind(apiDocsPlugin.externalRoutes, {
      registerApi: catalogImportPlugin.routes.importPage,
    });
    bind(scaffolderPlugin.externalRoutes, {
      registerComponent: catalogImportPlugin.routes.importPage,
    });
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },
});

const routes = (
  <FlatRoutes>
    <Route path="/" element={<Navigate to="catalog" />} />
    <Route path="/catalog" element={<CatalogIndexPage />} />
    <Route
      path="/catalog/:namespace/:kind/:name"
      element={<CatalogEntityPage />}
    >
      {entityPage}
    </Route>
    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route
      path="/docs/:namespace/:kind/:name/*"
      element={<TechDocsReaderPage />}
    >
      <TechDocsAddons>
        <ReportIssue />     
      </TechDocsAddons>
    </Route>
    <Route path="/create" element={<ScaffolderPage />} />
    <Route path="/api-docs" element={<ApiExplorerPage />} />
    <Route
      path="/tech-radar"
      element={<TechRadarPage width={1500} height={800} />}
    />
    <Route
      path="/catalog-import"
      element={
        <RequirePermission permission={catalogEntityCreatePermission}>
          <CatalogImportPage />
        </RequirePermission>
      }
    />
    <Route path="/search" element={<SearchPage />}>
      {searchPage}
    </Route>
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/catalog-graph" element={<CatalogGraphPage />} />
    <Route path="/demo-plugin" element={<DemoPluginPage />} />
  </FlatRoutes>
);

import {
  createTheme,
  genPageTheme,
  lightTheme,
  shapes,
} from '@backstage/theme';

const myTheme = createTheme({
  palette: {
    ...lightTheme.palette,
    primary: {
      main: '#031329',
    },
    secondary: {
      main: '#1b73ee',
    },
    error: {
      main: '#F44336',
    },
    warning: {
      main: '#FFC107',
    },
    info: {
      main: '#031329',
    },
    success: {
      main: '#4CAF50',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    banner: {
      info: '#031329',
      error: '#F44336',
      text: '#343b58',
      link: '#565a6e',
    },
    errorBackground: '#F44336',
    warningBackground: '#FFC107',
    infoBackground: '#031329',
    navigation: {
      background: '#031329',
      indicator: '#F44336',
      color: '#FFFFFF',
      selectedColor: '#FFFFFF',
    },
  },
  defaultPageTheme: 'home',
  fontFamily: 'Arial',
  /* below drives the header colors */
  pageTheme: {
    home: genPageTheme({ colors: ['#031329', '#1b73ee'], shape: shapes.wave }),
    documentation: genPageTheme({
      colors: ['#031329', '#1b73ee'],
      shape: shapes.wave2,
    }),
    tool: genPageTheme({ colors: ['#031329', '#1b73ee'], shape: shapes.round }),
    service: genPageTheme({
      colors: ['#031329', '#1b73ee'],
      shape: shapes.wave,
    }),
    website: genPageTheme({
      colors: ['#031329', '#1b73ee'],
      shape: shapes.wave,
    }),
    library: genPageTheme({
      colors: ['#031329', '#1b73ee'],
      shape: shapes.wave,
    }),
    other: genPageTheme({ colors: ['#031329', '#1b73ee'], shape: shapes.wave }),
    app: genPageTheme({ colors: ['#031329', '#1b73ee'], shape: shapes.wave }),
    apis: genPageTheme({ colors: ['#031329', '#1b73ee'], shape: shapes.wave }),
    settings: genPageTheme({ colors: ['#031329', '#1b73ee'], shape: shapes.round }),
    search: genPageTheme({ colors: ['#031329', '#1b73ee'], shape: shapes.round }),
    component: genPageTheme({ colors: ['#031329', '#1b73ee'], shape: shapes.round }),
    team: genPageTheme({ colors: ['#031329', '#1b73ee'], shape: shapes.round }),
    about: genPageTheme({ colors: ['#031329', '#1b73ee'], shape: shapes.round }),
  },
});

export default app.createRoot(
  <>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <Root>{routes}</Root>
    </AppRouter>
  </>,
);
