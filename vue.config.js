const path = require('path');
const webpack = require('webpack');
module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },

  chainWebpack: config => {
/*    config
        .plugin('provide')
        .use(webpack.ProvidePlugin, [{
          'window.mapboxgl': 'mapbox-gl',
          mapv:'mapv'
        }])*/
    // vue默认@指向src目录，这里要修正为examples，另外新增一个~指向packages
    config.resolve.alias
      //.set('@', path.resolve('examples'))
      .set('~', path.resolve('packages'))

    // packages和examples目录需要加入编译
    config.module
      .rule('js')
      .include.add(/packages/).end()
      .include.add(/examples/).end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
  },
  configureWebpack:{
    externals:[
    /*  {
        vue: {
          root: 'Vue',
          commonjs: 'vue',
          commonjs2: 'vue',
          amd: 'vue'
        },
        mapv: 'mapv',
      },
      /// \/static\/libs\//,
      function(context, request, callback) {
        if (/\/static\/libs\/mapboxgl\/mapbox-gl-enhance/.test(request)) {
          return callback(null, {
            root: 'mapboxgl',
            commonjs: '../static/libs/mapboxgl/mapbox-gl-enhance.js',
            commonjs2: '../static/libs/mapboxgl/mapbox-gl-enhance.js',
            amd: '../static/libs/mapboxgl/mapbox-gl-enhance.js'
          });
        }
        if (/\/static\/libs\/deckgl\/deck.gl/.test(request)) {
          return callback(null, {
            root: 'DeckGL',
            commonjs: '../static/libs/deckgl/deck.gl.min.js',
            commonjs2: '../static/libs/deckgl/deck.gl.min.js',
            amd: '../static/libs/deckgl/deck.gl.min.js'
          });
        }
        if (/\/static\/libs\/echarts-layer\/EchartsLayer/.test(request)) {
          return callback(null, {
            root: 'EchartsLayer',
            commonjs: '../static/libs/echarts-layer/EchartsLayer.js',
            commonjs2: '../static/libs/echarts-layer/EchartsLayer.js',
            amd: '../static/libs/echarts-layer/EchartsLayer.js'
          });
        }
        if (/\/static\/libs\/iclient-mapboxgl\/iclient-mapboxgl/.test(request)) {
          return callback(null, {
            root: 'SuperMap',
            commonjs: '../static/libs/iclient-mapboxgl/iclient-mapboxgl.min.js',
            commonjs2: '../static/libs/iclient-mapboxgl/iclient-mapboxgl.min.js',
            amd: '../static/libs/iclient-mapboxgl/iclient-mapboxgl.min.js'
          });
        }
        if (/\/static\/libs\/mapbox-gl-draw\/mapbox-gl-draw/.test(request)) {
          return callback(null, {
            root: 'MapboxDraw',
            commonjs: '../static/libs/mapbox-gl-draw/mapbox-gl-draw.js',
            commonjs2: '../static/libs/mapbox-gl-draw/mapbox-gl-draw.js',
            amd: '../static/libs/mapbox-gl-draw/mapbox-gl-draw.js'
          });
        }
        callback();
      }*/
    ]
  },
}
