let mongoose = require('mongoose');
let bcrypt = require('bcrypt'); // 加密工具,密码加盐
let POWER = 10; // 加密的计算强度，默认10

let UserSchema = mongoose.Schema({
	name: {
		type: String,
		unique: true // 唯一
	},
	password: {
		type: String
	},
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});

// 自定义方法
// 每次存储前更新时间
UserSchema.pre('save', function(next) {
	let user = this; // 指向实例

	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}

	bcrypt.genSalt(POWER, function(err, salt) { //生成盐
		if(err) return next(err);
		bcrypt.hash(user.password, salt, function(err, hash) { // 密码合成
			if(err) return next(err);
			user.password = hash;
			next();// 调用接下去的流程
		})
	})
});

// 静态方法（Model使用的方法）
UserSchema.statics = {
	fetch: function(cb) {
		return this
					.find({})
					.sort('meta.updateAt')
					.exec(cb);
	},
	findById: function(id, cb) {
		return this
					.findOne({_id: id})
					.exec(cb);
	}
};

module.exports = UserSchema;