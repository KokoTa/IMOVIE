let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let CategorySchema = mongoose.Schema({
	name: String,
	movies: [{type: ObjectId, ref: 'movie'}],
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
CategorySchema.pre('save', function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}

	next(); // 调用接下去的流程
});

// 静态方法（Model使用的方法）
CategorySchema.statics = {
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

module.exports = CategorySchema;