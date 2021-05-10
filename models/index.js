// 다른 모델들을 하나로 모아주는 역할 : index.js
'use strict';

const Sequelize = require('sequelize'); //1. require로 sequelize를 불러오면 항상 class로 불러온다
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const User = require('./user'); //class 관련 내용은 초록색으로 표현됨
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // 2. 소문자 sequelize 에 new로 객체형태로 class 인 Sequelize를 넣어준다.
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.User = User;   // db.User라는 프로퍼티를 만들고 User라는 class를 넣는다.
User.init(sequelize);

// 3. 이 db 객체에 소문자 대문자 프로퍼티를 만들어서 각각의 sequelize를 넣는다.
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;