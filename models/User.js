var mongoose = require('mongoose');
var Role = require('./Role');
var sha1 = require('sha1');
var getJsonFromReq = require('./utils/getJsonFromReq');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  },
  sex: {
    type: String,
    enum: ['男', '女']
  }, 
  age: {
    type: Number,
    min: 0
  },
  class: String,
  password: {
    type: String,
    required: true
  },
  role_id: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }
});

UserSchema.statics = {
  // 根据req传来到内容，进行 add user,并设置初始角色
  createFromReq: function(req, cb) {
    let jsonObj = getJsonFromReq(UserSchema, req);
    jsonObj.password = sha1(jsonObj.password);
    Role.findOne({
      role_name: '班级成员'
    }, function(err, role) {
      if (err) {
        cb(err);
      } else {
        jsonObj.role_id = role._id;
        user = User(jsonObj);
        return user.save(cb);
      }
    });
  },
  // 根据req传来到内容，进行更新
  updateByIdFromReq: function(req, cb) {
    let jsonObj = getJsonFromReq(UserSchema, req);
    return User.findByIdAndUpdate(req.params.id, jsonObj, cb);
  },
  //获取除了密码之外的所有字段
  fetch: function(json, cb) {
    return this.find(json, 'username email sex age class role_id')
      .populate('role_id')
      .exec(cb);
  },
  //获取除了密码之外的所有字段
  fetchById: function(id, cb) {
    return this.findById(id, 'username email sex age class role_id')
      .populate('role_id')
      .exec(cb);
  },

};

var User = mongoose.model('User', UserSchema);
module.exports = User;