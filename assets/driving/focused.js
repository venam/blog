var anim_done = true;

function animate() {
	anim_done = false;


	d3.select("#crazy_2")
		.attr('transform', "rotate(-110)");
	d3.select("#crazy_1")
		.style('display', 'block')
		.attr('transform', 'translate( 6500, 10000)')
		.transition()
		.ease('ease out')
		.delay(500)
		.duration(2000)
		.attr('transform', 'translate( 4100, 4800)');
	d3.select("#crazy_2")
		.transition()
		.delay('1800')
		.ease('ease in')
		.duration('500')
		.attr('transform', "rotate(-90)");
	d3.select("#crazy_1")
		.transition()
		.delay(2500)
		.ease('ease out')
		.duration(1000)
		.attr('transform', 'translate( 4100, -900)');

	d3.select("#easy1_2")
		.attr('transform', "rotate(-90)");
	d3.select("#easy1_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3100, 10600)')
		.transition()
		.delay(100)
		.ease('linear')
		.duration(3000)
		.attr('transform', 'translate( 3100, -1000)');

	d3.select("#you_2")
		.attr('transform', "rotate(-90)");
	d3.select("#you_1")
		.style('display', 'block')
		.attr('transform', 'translate( 4300, 10600)')
		.transition()
		.delay(1300)
		.ease('linear')
		.duration(1400)
		.attr('transform', 'translate( 4300,  5000)');

	change_car_flasher('#you', true, 'right', 2000, 0);
	change_car_flasher('#you', true, 'left', 2000, 0);

	change_car_flasher('#you', false, 'right', 2500, 0);
	change_car_flasher('#you', false, 'left', 2500, 0);


	d3.select("#you_1")
		.transition()
		.delay(2700)
		.ease('ease out')
		.duration(2400)
		.attr('transform', 'translate( 4350,  -800)')
		.each('end', function() {
			anim_done = true;
		});

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
create_car(carCanvas, "crazy", "#BF3819", 0, 0, 0);
create_car(carCanvas, "you", "#969664", 0, 0, 0);
create_car(carCanvas, "easy1", "#969664", 0, 0, 0);
