module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .use('i18n')
        .loader('@kazupon/vue-i18n-loader')
        .end();
  }
};
