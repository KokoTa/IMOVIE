$(function() {
	$(".comment-header").click(function(e) {
		let target = $(this);
		let commentId = target.data('cid');
		let toId = target.data('tid');

		if($('#toId').length > 0) {
			$('#toId').val(toId)
		} else {
			$("<input>").attr({
				type: 'hidden',
				name: 'tid',
				value: toId,
				id: 'toId'
			}).appendTo("#comments");
		}

		if($('#commentId').length > 0) {
			$('#commentId').val(toId)
		} else {
			$("<input>").attr({
				type: 'hidden',
				name: 'cid',
				value: commentId,
				id: 'commentId'
			}).appendTo("#comments");
		}


	})
})