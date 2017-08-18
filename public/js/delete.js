$(function() {
	$(".del").click(function(e) {
		let target = $(e.target);
		let id = target.data('id');
		let tr = $('.item-id-' + id);

		$.ajax({
			type: 'DELETE',
			url: '/admin/movie/list?id=' + id
		})
		.done(function(result) {
			if(result.success === 1) {
				if(tr.length > 0) {
					tr.remove()
				}
			}
		})
	})
})