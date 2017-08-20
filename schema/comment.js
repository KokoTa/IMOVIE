let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId; // 获得MongoDB数据的特殊类型：ObjectId

let CommentSchema = mongoose.Schema({
	movie: {
		type: ObjectId,
		ref: 'movie' // ref对应要关联的Model，而不是Schema
	},
	from: { // 评论的发表者
		type: ObjectId,
		ref: 'user'
	},
	reply: [{ // 评论的回复
		from: {type: ObjectId, ref: 'user'},
		to: {type: ObjectId, ref: 'user'},
		content: String
	}],
	content: String, // 评论内容
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
CommentSchema.pre('save', function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}

	next(); // 调用接下去的流程
});

// 静态方法（Model使用的方法）
CommentSchema.statics = {
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

module.exports = CommentSchema;