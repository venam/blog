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


	d3.select("#crazy_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3100, 10600)');
	d3.select("#crazy_2")
		.attr('transform', "rotate(-90)");

	d3.select("#crazy_1")
		.transition()
		.delay('100')
		.ease('ease out')
		.duration('500')
		.attr('transform',"translate(3500,9000)");

	d3.select("#crazy_2")
		.transition()
		.delay('100')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-87)");

	d3.select("#crazy_1")
		.transition()
		.delay('600')
		.ease('ease out')
		.duration('500')
		.attr('transform',"translate(3300,8000)");

	d3.select("#crazy_2")
		.transition()
		.delay('600')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-93)");

	d3.select("#crazy_1")
		.transition()
		.delay('1100')
		.ease('ease out')
		.duration('800')
		.attr('transform',"translate(3100,6000)");

	d3.select("#crazy_2")
		.transition()
		.delay('1100')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-90)");

	change_car_flasher('#crazy', true, 'right',1800, 0);
	change_car_flasher('#crazy', true, 'left', 1800, 0);

	d3.select("#crazy_1")
		.transition()
		.delay('1900')
		.ease('ease out')
		.duration('800')
		.attr('transform',"translate(3800,4000)");

	d3.select("#crazy_2")
		.transition()
		.delay('1900')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-83)");

	change_car_flasher('#crazy', false, 'right',2300, 0);
	change_car_flasher('#crazy', false, 'left', 2300, 0);

	d3.select("#crazy_1")
		.transition()
		.delay('2700')
		.ease('ease out')
		.duration('800')
		.attr('transform',"translate(3700,3000)");

	d3.select("#crazy_2")
		.transition()
		.delay('2700')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-90)");

	d3.select("#crazy_1")
		.transition()
		.delay('3500')
		.ease('ease out')
		.duration('800')
		.attr('transform',"translate(4400,1500)");

	d3.select("#crazy_2")
		.transition()
		.delay('3500')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-83)");

	d3.select("#crazy_2")
		.transition()
		.delay('3800')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-90)");

	d3.select("#crazy_1")
		.transition()
		.delay('4300')
		.ease('ease out')
		.duration('800')
		.attr('transform',"translate(4300,-1000)")
		.each('end', function() {
			anim_done = true;
		});



	d3.select("#you_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3100, 10600)');
	d3.select("#you_2")
		.attr('transform', "rotate(-90)");

	d3.select("#you_1")
		.transition()
		.delay('850')
		.ease('ease out')
		.duration('1700')
		.attr('transform',"translate(3100,5200)");

	d3.select("#you_1")
		.transition()
		.delay('2550')
		.ease('ease out')
		.duration('2700')
		.attr('transform',"translate(3100,-1000)");

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
create_car(carCanvas, "you", "#969664", 0, 0, 0);
create_car(carCanvas, "crazy", "#BF3819", 0, 0, 0);

create_car(carCanvas, "other", "#32A4CE", 0, 0, 0);
create_car(carCanvas, "other2", "#32A4CE", 0, 0, 0);
