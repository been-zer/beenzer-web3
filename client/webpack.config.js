module.exports = {
  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "stream-browserify": require.resolve("stream-browserify"),
      "crypto-browserify": require.resolve('crypto-browserify')
    } 
  }
}