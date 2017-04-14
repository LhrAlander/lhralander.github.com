$(document).ready(function(){
	var imgCnt=$('.img-wrap').children('.normal-img');
	for(var i=0;i<imgCnt.length;i++){
		imgCnt.eq(i).on('click',imgput);
	}
	var tabHeadCnt=$('.tab-head-cnt');
	for(var i=0;i<tabHeadCnt.length;i++) {
		tabHeadCnt.eq(i).on('click',tabtoggle);
	}
	var dataDel=$('.data-cnt-del');
	for(var i=0;i<dataDel.length;i++) {
		dataDel.eq(i).on('click',datadel);
	}
	$('.data-btn').on('click',dataadd);
});

function imgput(e) {
	var pre=$("<div></div>"),
		cover=$('<div></div>');
	pre.addClass('big-img');
	pre.text($(this).index()+1);
	cover.addClass('cover');
	cover.click(function(event) {
		pre.remove();
		this.remove();
		$('.img-wrap').toggleClass('de-emphasized');
	});
	$('body').append(pre);
	$('body').append(cover);
	$('.img-wrap').toggleClass('de-emphasized');

}

 function tabtoggle(e) {
 	var tabHeadCnt=$('.tab-head-cnt');
	for(var i=0;i<tabHeadCnt.length;i++) {
		tabHeadCnt.eq(i).removeClass('tab-head-selected');
	}
	$(this).addClass('tab-head-selected');
	$('.tab-cnt').text($(this).index()+1);
}

function datadel(e) {
	console.log($(this).parent().index());
	
	$(this).parent().remove();
	var dataDel=$('.data-cnt');
	for(var i=0;i<dataDel.length;i++) {
		dataDel.eq(i).children('.data-cnt-index').text(i+1);
	}
}

function dataadd(e) {
	var cnt=$('<div></div>'),
		cntIndex=$('<div></div>'),
		cntDel=$('<div></div>');
	cnt.addClass('data-cnt');
	cntIndex.addClass('data-cnt-index');
	cntDel.addClass('data-cnt-del');
	cntIndex.text($('.data-cnt').length+1);
	cntDel.text('Delete');
	cntDel.on('click',datadel);
	cnt.append(cntIndex);
	cnt.append(cntDel);
	$('.data-cnt-wrap').append(cnt);
}