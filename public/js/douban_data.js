$(function() {
	$('#douban').blur(function() {
		var douban = $(this);
		var id = douban.val()

		if((+id)) {
			$.ajax({
				url: 'https://api.douban.com/v2/movie/subject/' + id,
				type: 'get',
				dataType: 'jsonp',
				crossDomain: true,
				success: function(data) {
					$('#movieName').val(data.title);
					$('#movieDoctor').val(data.directors[0].name);
					$('#movieCountry').val(data.countries[0]);
					$('#movieLanguage').val('多语言');
					$('#moviePoster').val(data.images.large);
					$('#movieYear').val(data.year);
					$('#movieSummary').val(data.summary);
				}
			})
		}
	})
})