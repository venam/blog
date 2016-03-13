var anim_done = true;

function animate() {
	anim_done = false;

	d3.select("#wakata_1")
		.style("display", "block");

	d3.select("#wakata_1")
		.attr('transform', 'translate( 3700, 10200)');
	d3.select("#wakata_2")
			.attr('transform', "rotate(-90)");

	d3.select("#you_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3200, 10200)');
	d3.select("#you_2")
		.attr('transform', "rotate(-90)");

	d3.select("#you_1")
		.transition()
		.delay('1400')
		.ease('ease')
		.duration('1200')
		.attr('transform',"translate(3220,5600)");

	d3.select("#you_1")
		.transition()
		.delay('2600')
		.ease('ease out')
		.duration('1000')
		.attr('transform',"translate(3120, 2900)");

	d3.select("#you_1")
		.transition()
		.delay('3600')
		.ease('ease out')
		.duration('500')
		.attr('transform',"translate(3115, 0)");


	//d3.select("#wakata_r_flash")
	//	.transition()
	//	.delay(0)
	//	.duration(200)
	//	.style('opacity', 0.7)
	//	.each('end', function() {
	//		d3.select(this)
	//			.transition()
	//			.delay(900)
	//			.duration(200)
	//			.style('opacity', 0.0);
	//	});

	d3.select("#wakata_1")
		.transition()
		.delay(500)
		.duration(4000)
		.ease('cubic out')
		.attr('transform',"translate(3670,0)");


	d3.select("#wakato_1")
		.style("display", "block")
		.attr('transform', 'translate( 800, -960)');

	d3.select("#wakato_1")
		.transition()
		.delay(1500)
		.duration(3000)
		.ease('ease out')
		.attr('transform', 'translate( 800, 9990)');




	d3.select("#wakati_1")
		.style("display", "block")
		.attr('transform', 'translate( 3000, 10200)');

	d3.select("#wakati_2")
			.attr('transform', "rotate(-90)");

	d3.select("#wakati_1")
		.transition()
		.delay(2000)
		.duration(2600)
		.ease('ease out')
		.attr('transform', 'translate( 4400, 0)')
		.each('end', function() {
			anim_done = true;
		});


	//d3.select("#wakata_2")
	//	.transition()
	//	.delay(500)
	//	.duration(800)
	//	.ease('cubic out')
	//	.attr('transform', "rotate(-70)");

	//d3.select("#wakata_2")
	//	.transition()
	//	.delay(1300)
	//	.duration(300)
	//	.ease('cubic out')
	//	.attr('transform', "rotate(-90)");

	//d3.select("#wakata_1")
	//	.transition()
	//	.delay(1300)
	//	.duration(2000)
	//	.ease('cubic out')
	//	.attr('transform',"translate(4300,0)");
}

var width = 300;
var height = 460;

var carCanvas = d3.select("#rect-demo")
	.append('svg')
	.style("box-shadow",'3px 3px  5px #212121')
	.attr('viewBox','0 0 6000 9200')
	.attr('width',width)
	.attr('height',height)
	.on("click", function() {
		if (anim_done == true) {
			animate()
		}
	});
draw_background(carCanvas, 0);
create_car(carCanvas, "wakata", "#32A4CE", 0, 0, 0);
create_car(carCanvas, "wakati", "#32A4CE", 0, 0, 0);
create_car(carCanvas, "wakato", "#32A4CE", 0, 0, 0);
create_car(carCanvas, "you", "#969664", 0, 0, 0);
