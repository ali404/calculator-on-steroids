var context = require.context('./src/js/__tests__', true, /\.test\.js$/)
context.keys().forEach(context)
