let mongoose = require('mongoose');

let MovieSchema = mongoose.Schema({
	title: String,
	doctor: String,
	country: String,
	flash: String,
	poster: String,
	year: Number,
	summary: String,
	language: String,
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
MovieSchema.pre('save', function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}

	next(); // 调用接下去的流程
});

// 静态方法（Model使用的方法）
MovieSchema.statics = {
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

module.exports = MovieSchema;