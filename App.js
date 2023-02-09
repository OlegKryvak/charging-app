import React from 'react';
import {AppStackRoutes} from './src/navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://b4e2f6652f694b75bf52dfb929be2d87@o1037274.ingest.sentry.io/6517047',
});

const App = () => {
  return (
    <Provider store={store}>
      <AppStackRoutes />
    </Provider>
  );
};

export default Sentry.wrap(App);
