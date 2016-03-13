var anim_done = true;

function animate() {
	anim_done = false;
	change_car_flasher('#crazy', false, 'right',1, 0);
	change_car_flasher('#crazy', false, 'left', 1, 0);


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

	d3.select("#easy1_2")
		.attr('transform', "rotate(-90)");
	d3.select("#easy1_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3100, 10600)')
		.transition()
		.delay(100)
		.ease('linear')
		.duration(5000)
		.attr('transform', 'translate( 3100, -1000)');

	d3.select("#easy3_2")
		.attr('transform', "rotate(-90)");
	d3.select("#easy3_1")
		.style('display', 'block')
		.attr('transform', 'translate( 4300, 10600)')
		.transition()
		.delay(1300)
		.ease('linear')
		.duration(5000)
		.attr('transform', 'translate( 4400, -1000)')
		.each('end', function() {
			anim_done = true;
		});


	d3.select("#easy4_2")
		.attr('transform', "rotate(-90)");
	d3.select("#easy4_1")
		.style('display', 'block')
		.attr('transform', 'translate( 4300, 10600)')
		.transition()
		.delay(600)
		.ease('linear')
		.duration(5000)
		.attr('transform', 'translate( 4400, -1000)');


	d3.select("#easy2_2")
		.attr('transform', "rotate(-90)");
	d3.select("#easy2_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3100, 10600)')
		.transition()
		.delay(1000)
		.ease('linear')
		.duration(5000)
		.attr('transform', 'translate( 3100, -1000)');


	d3.select("#crazy_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3100, 10600)');
	d3.select("#crazy_2")
		.attr('transform', "rotate(-90)");

	d3.select("#crazy_1")
		.transition()
		.delay('2000')
		.ease('ease out')
		.duration('500')
		.attr('transform',"translate(3500,8000)");

	change_car_flasher('#crazy', true, 'right',2500, 0);
	change_car_flasher('#crazy', true, 'left', 2500, 0);

	change_car_flasher('#crazy', false, 'right',2800, 0);
	change_car_flasher('#crazy', false, 'left', 2800, 0);

	d3.select("#crazy_1")
		.transition()
		.delay('2500')
		.ease('ease out')
		.duration('300')
		.attr('transform',"translate(3800,7000)");

	d3.select("#crazy_2")
		.transition()
		.delay('2000')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-86)");

	d3.select("#crazy_2")
		.transition()
		.delay('2300')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-90)");

	d3.select("#crazy_1")
		.transition()
		.delay('2800')
		.ease('ease out')
		.duration('300')
		.attr('transform',"translate(3800,5000)");

	d3.select("#crazy_1")
		.transition()
		.delay('3100')
		.ease('ease out')
		.duration('300')
		.attr('transform',"translate(3200,3800)");

	d3.select("#crazy_2")
		.transition()
		.delay('3100')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-93)");

	d3.select("#crazy_2")
		.transition()
		.delay('3300')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-90)");

	d3.select("#crazy_1")
		.transition()
		.delay('3400')
		.ease('ease out')
		.duration('200')
		.attr('transform',"translate(3900,3400)");

	d3.select("#crazy_1")
		.transition()
		.delay('3600')
		.ease('ease out')
		.duration('300')
		.attr('transform',"translate(4200,1400)");

	d3.select("#crazy_2")
		.transition()
		.delay('3600')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-86)");

	d3.select("#crazy_2")
		.transition()
		.delay('3900')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-90)");

	d3.select("#crazy_1")
		.transition()
		.delay('3900')
		.ease('ease out')
		.duration('400')
		.attr('transform',"translate(3200,-1400)");

	d3.select("#crazy_2")
		.transition()
		.delay('3800')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-95)");

	d3.select("#crazy_2")
		.transition()
		.delay('4600')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-90)");

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
create_car(carCanvas, "easy1", "#969664", 0, 0, 0);
create_car(carCanvas, "easy2", "#969664", 0, 0, 0);
create_car(carCanvas, "easy3", "#969664", 0, 0, 0);
create_car(carCanvas, "easy4", "#969664", 0, 0, 0);
create_car(carCanvas, "crazy", "#BF3819", 0, 0, 0);
create_car(carCanvas, "other", "#32A4CE", 0, 0, 0);
create_car(carCanvas, "other2", "#32A4CE", 0, 0, 0);
