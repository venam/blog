var anim_done = true;

function animate() {
	anim_done = false;

	change_car_light('#crazy',1, 1, 1);

	d3.select("#other_1")
		.style('display', 'block')
		.attr('transform', 'translate( 1750, -1600)')
		.transition()
		.delay(1500)
		.duration(2400)
		.attr('transform', 'translate( 1800, 10000)');

	d3.select("#other2_1")
		.style('display', 'block')
		.attr('transform', 'translate( 1800, -1600)')
		.transition()
		.delay(500)
		.duration(2000)
		.attr('transform', 'translate( 1800, 10000)');

	d3.select("#other3_2")
		.attr('transform', "rotate(-90)");
	d3.select("#other3_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3100, 10600)')
		.transition()
		.delay(100)
		.ease('linear')
		.duration(3000)
		.attr('transform', 'translate( 3100, -1000)');

	d3.select("#other4_2")
		.attr('transform', "rotate(-90)");
	d3.select("#other4_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3100, 10600)')
		.transition()
		.delay(1000)
		.ease('linear')
		.duration(3000)
		.attr('transform', 'translate( 3100, -1000)');


	d3.select("#crazy_1")
		.style('display', 'block')
		.attr('transform', 'translate( 5300, -2700)')
		.transition()
		.ease('linear')
		.delay(000)
		.duration(7000)
		.attr('transform', 'translate( 5300, 10000)')
		.each('end', function() {
			anim_done = true;
		});



	d3.select("#you_2")
		.attr('transform', "rotate(-90)");
	d3.select("#you_1")
		.style('display', 'block')
		.attr('transform', 'translate( 4300, 10600)')
		.transition()
		.delay(300)
		.ease('linear')
		.duration(2000)
		.attr('transform', 'translate( 4300, 5000)');

	change_car_light('#crazy',2, 1500, 1);

	change_car_flasher('#you', true, 'right',1700, 0);
	change_car_flasher('#you', true, 'left', 1700, 0);
	change_car_flasher('#you', false, 'right',2000, 0);
	change_car_flasher('#you', false, 'left', 2000, 0);

	d3.select("#you_1")
		.transition()
		.delay(2300)
		.ease('linear')
		.duration(200)
		.attr('transform', 'translate( 4100, 4500)');

	d3.select("#you_2")
		.transition()
		.delay('1950')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-93)");

	d3.select("#you_2")
		.transition()
		.delay('2300')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-90)");


	d3.select("#you_1")
		.transition()
		.delay(2500)
		.ease('linear')
		.duration(1200)
		.attr('transform', 'translate( 4100, -1000)');

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




draw_background(carCanvas, 1);
create_car(carCanvas, "crazy", "#BF3819", 1, 0, 0);
create_car(carCanvas, "other", "#32A4CE", 1, 0, 0);
create_car(carCanvas, "other2", "#32A4CE", 2, 0, 0);

create_car(carCanvas, "other3", "#32A4CE", 2, 0, 0);
create_car(carCanvas, "other4", "#32A4CE", 1, 0, 0);
create_car(carCanvas, "you", "#969664", 1, 0, 0);
