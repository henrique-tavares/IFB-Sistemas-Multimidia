import { Configuration } from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';
import merge from 'webpack-merge';
import common from './webpack.common';

const config: Configuration = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    compress: true,
    port: 9000,
    open: true,
    watchFiles: ['src/**/*', 'dist/**/*'],
  },
});

export default config;
