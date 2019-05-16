const path = require('path');

var config = {
 	context: __dirname,
	entry:"./main.js",
	output:{
		path:__dirname + "/",
		filename:"index.js"
	},
	devServer:{
		inline:true,
		port:8080
	},
	module: {
		rules:[
			{
				test:/\.jsx?$/,
				exclude:/node_modules/,
				loader:'babel-loader',
				options: {
					presets: ["@babel/react","@babel/env"]
				}
			}
		]
	}
}

module.exports = config;
