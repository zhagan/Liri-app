console.log('this is loaded');

exports.twitter = {
  consumer_key: "4Irec5AUIQhnEXGBvdsJBqhQz", //process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: "xyiZIQOaqPR441yRCDdFZCNmq4j4DXZCfQ830tNDdzlEDb1NCM", //process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: "214228576-o93nN61nct5b53KZf9M5hxAzmrzHSX5QH2y1x2PQ",//process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: "Bmm5vAzLk5NEyhTI5EhtSHFMgUhGFRPrIyd2rBKf3MMma"//process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: "c2c53a4ccbd7481a96761da8e557bdbd", //process.env.SPOTIFY_ID,
  secret: "a7fba3b17cb54fcf89bb9b2a8e6ae413" //process.env.SPOTIFY_SECRET
};

exports.omdb = {
	key: "b656971e"//process.env.OMDB_KEY
};
