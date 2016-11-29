var Role = require('../Role');
var User = require('../User');
var mongoose = require('mongoose');
var config = require('../../config');

mongoose.connect(config.mongodb);

let leader = Role({
  role_name: '班长',
  role_rights: ['发布开班会帖', '收班费帖', '收党费帖', '评优等生帖', '发布考勤结果帖', '回复帖'],
})
leader.save(function(err) {
  if (err) {
    console.log("create role leader success");
  } else {
    console.log("create role leader fail")
  }
});

let competitive_person = Role({
  role_name: '团支书',
  role_rights: ['收党费帖', '评优等生帖', '发布考勤结果帖', '回复帖'],
})
competitive_person.save(function(err) {
  if (err) {
    console.log("create role competitive_person success");
  } else {
    console.log("create role competitive_person fail")
  }
});

let learning_committee_member = Role({
  role_name: '学习委员',
  role_rights: ['评优等生帖', '发布考勤结果帖', '回复帖'],
})
learning_committee_member.save(function(err) {
  if (err) {
    console.log("create role learning_committee_member success");
  } else {
    console.log("create role learning_committee_member fail")
  }
});

let class_representative = Role({
  role_name: '课代表',
  role_rights: ['评优等生帖', '发布考勤结果帖', '回复帖'],
})
class_representative.save(function(err) {
  if (err) {
    console.log("create role class_representative success");
  } else {
    console.log("create role class_representative fail")
  }
});

let class_member = Role({
  role_name: '班级成员',
  role_rights: ['回复帖'],
})
class_member.save(function(err) {
  if (err) {
    console.log("create role class_member success");
  } else {
    console.log("create role class_member fail")
  }
});


Role.findOne({
  role_name: '班长'
}, function(err, role) {
  if (err) {
    console.log(err)
  } else {
    let user = User({
      username: 'root',
      password: 'root',
      role_id: role._id,
    });
    user.save(function(err) {
      if (err) {
        console.log("create root user fail")
      } else {
        console.log("create root user success")
      }
    });
  }
});
