var anim_done = true;

function animate() {
	anim_done = false;

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


	d3.select("#traffic1_2")
		.attr('transform', "rotate(-90)");
	d3.select("#traffic1_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3100, 10600)')
		.transition()
		.delay(100)
		.ease('linear')
		.duration(3000)
		.attr('transform', 'translate( 3100, -1000)');


	d3.select("#traffic2_2")
		.attr('transform', "rotate(-90)");
	d3.select("#traffic2_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3100, 10600)')
		.transition()
		.delay(1200)
		.ease('linear')
		.duration(2500)
		.attr('transform', 'translate( 3100, 4000)');

	change_car_flasher('#traffic2', true, 'right',3600, 0);
	change_car_flasher('#traffic2', true, 'left', 3600, 0);


	d3.select("#traffic2_1")
		.transition()
		.delay('3700')
		.ease('ease out')
		.duration('700')
		.attr('transform',"translate(3100,3000)");


	d3.select("#traffic2_1")
		.transition()
		.delay('4400')
		.ease('ease out')
		.duration('700')
		.attr('transform',"translate(3100,-1000)");

	change_car_flasher('#traffic2', false, 'right',4300, 0);
	change_car_flasher('#traffic2', false, 'left', 4300, 0);



	d3.select("#double_2")
		.attr('transform', "rotate(-90)");
	d3.select("#double_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3100, 10600)')
		.transition()
		.delay(1700)
		.ease('linear')
		.duration(1000)
		.attr('transform', 'translate( 3100, 8000)');


	d3.select("#double_2")
		.transition()
		.delay('2600')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-86)");


	d3.select("#double_2")
		.transition()
		.delay('2800')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-90)");



	d3.select("#double_1")
		.transition()
		.delay('2700')
		.ease('ease out')
		.duration('300')
		.attr('transform',"translate(4200,6000)");


	d3.select("#double_1")
		.transition()
		.delay('3000')
		.ease('ease out')
		.duration('300')
		.attr('transform',"translate(4200,3500)");

	change_car_flasher('#double', true, 'right',3200, 0);
	change_car_flasher('#double', true, 'left', 3200, 0);


	d3.select("#double_2")
		.transition()
		.delay('3300')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-96)");

	d3.select("#double_1")
		.transition()
		.delay('3300')
		.ease('ease out')
		.duration('500')
		.attr('transform',"translate(3800,3200)");

	change_car_flasher('#double', false, 'right',4400, 0);
	change_car_flasher('#double', false, 'left', 4400, 0);

	d3.select("#double_1")
		.transition()
		.delay('4600')
		.ease('ease out')
		.duration('500')
		.attr('transform',"translate(3200,2800)");

	d3.select("#double_2")
		.transition()
		.delay('4800')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-90)");

	d3.select("#double_1")
		.transition()
		.delay('5000')
		.ease('ease out')
		.duration('400')
		.attr('transform',"translate(3100,-800)");



	d3.select("#waiting1_2")
		.attr('transform', "rotate(-90)");
	d3.select("#waiting1_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3100, 10600)')
		.transition()
		.delay(2500)
		.ease('linear')
		.duration(2500)
		.attr('transform', 'translate( 3100, 4000)');

	change_car_flasher('#waiting1', true, 'right',4900, 0);
	change_car_flasher('#waiting1', true, 'left', 4900, 0);


	change_car_flasher('#waiting1', false, 'right',5500, 0);
	change_car_flasher('#waiting1', false, 'left', 5500, 0);


	d3.select("#waiting1_1")
		.transition()
		.delay('5100')
		.ease('ease out')
		.duration('400')
		.attr('transform',"translate(3100,3000)");


	d3.select("#waiting1_1")
		.transition()
		.delay('5500')
		.ease('ease out')
		.duration('400')
		.attr('transform',"translate(3050,2500)");

	d3.select("#waiting1_1")
		.transition()
		.delay('5900')
		.ease('ease out')
		.duration('900')
		.attr('transform',"translate(3100,-800)");



	d3.select("#waiting2_2")
		.attr('transform', "rotate(-90)");
	d3.select("#waiting2_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3100, 10600)')
		.transition()
		.delay(3200)
		.ease('linear')
		.duration( 800)
		.attr('transform', 'translate( 4300, 4000)');

	change_car_flasher('#waiting2', true, 'right',4000, 0);
	change_car_flasher('#waiting2', true, 'left', 4000, 0);


	d3.select("#waiting2_1")
		.transition()
		.delay('4800')
		.ease('ease out')
		.duration('400')
		.attr('transform',"translate(4200,3500)");



	change_car_flasher('#inter', false, 'right',5500, 0);
	change_car_flasher('#inter', false, 'left', 5500, 0);

	d3.select("#waiting2_2")
		.transition()
		.delay('5500')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-94)");


	d3.select("#waiting2_1")
		.transition()
		.delay('5600')
		.ease('ease out')
		.duration('400')
		.attr('transform',"translate(4000,3000)");


	d3.select("#waiting2_2")
		.transition()
		.delay('6100')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-96)");

	d3.select("#waiting2_1")
		.transition()
		.delay('6300')
		.ease('ease out')
		.duration('400')
		.attr('transform',"translate(3800,3000)");


	d3.select("#waiting2_1")
		.transition()
		.delay('6700')
		.ease('ease out')
		.duration('400')
		.attr('transform',"translate(3400,2800)");

	d3.select("#waiting2_2")
		.transition()
		.delay('6600')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-90)");


	d3.select("#waiting2_1")
		.transition()
		.delay('7100')
		.ease('ease out')
		.duration('800')
		.attr('transform',"translate(3400,-800)");

	change_car_flasher('#waiting2', false, 'right',7000, 0);
	change_car_flasher('#waiting2', false, 'left', 7000, 0);



	d3.select("#inter_2")
		.attr('transform', "rotate(-90)");
	d3.select("#inter_1")
		.style('display', 'block')
		.attr('transform', 'translate( 4300, 10600)')
		.transition()
		.delay(3200)
		.ease('linear')
		.duration(1500)
		.attr('transform', 'translate( 3700, 4000)');


	change_car_flasher('#inter', true, 'right',4700, 0);
	change_car_flasher('#inter', true, 'left', 4700, 0);


	d3.select("#inter_1")
		.transition()
		.delay('5100')
		.ease('ease out')
		.duration('400')
		.attr('transform',"translate(3600,3300)");

	d3.select("#inter_2")
		.transition()
		.delay('5400')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-94)");


	d3.select("#inter_1")
		.transition()
		.delay('5350')
		.ease('ease out')
		.duration('400')
		.attr('transform',"translate(3550,3100)");


	d3.select("#inter_1")
		.transition()
		.delay('5900')
		.ease('ease out')
		.duration('400')
		.attr('transform',"translate(3500,2900)");

	d3.select("#inter_2")
		.transition()
		.delay('6000')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-96)");

	d3.select("#inter_1")
		.transition()
		.delay('6300')
		.ease('ease out')
		.duration('400')
		.attr('transform',"translate(3450,2600)");

	d3.select("#inter_2")
		.transition()
		.delay('6900')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-90)");

	d3.select("#inter_1")
		.transition()
		.delay('6300')
		.ease('ease out')
		.duration('900')
		.attr('transform',"translate(3150,-800)");

	change_car_flasher('#inter', false, 'right',6200, 0);
	change_car_flasher('#inter', false, 'left', 6200, 0);



	d3.select("#behind_2")
		.attr('transform', "rotate(-90)");
	d3.select("#behind_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3100, 10600)')
		.transition()
		.delay(3600)
		.ease('linear')
		.duration(1400)
		.attr('transform', 'translate( 3050, 5000)');

	change_car_flasher('#behind', true, 'right',4800, 0);
	change_car_flasher('#behind', true, 'left', 4800, 0);

	d3.select("#behind_1")
		.transition()
		.delay('5400')
		.ease('ease out')
		.duration('250')
		.attr('transform',"translate(3050,3750)");

	change_car_flasher('#behind', false, 'right',5700, 0);
	change_car_flasher('#behind', false, 'left', 5700, 0);

	d3.select("#behind_1")
		.transition()
		.delay('5700')
		.ease('ease out')
		.duration('200')
		.attr('transform',"translate(3050,3600)");

	change_car_flasher('#behind', true, 'right',5900, 0);
	change_car_flasher('#behind', true, 'left', 5900, 0);

	d3.select("#behind_1")
		.transition()
		.delay('6300')
		.ease('ease out')
		.duration('400')
		.attr('transform',"translate(3100,3000)");

	d3.select("#behind_1")
		.transition()
		.delay('6700')
		.ease('ease out')
		.duration('800')
		.attr('transform',"translate(3100,-800)");

	change_car_flasher('#behind', false, 'right',7500, 0);
	change_car_flasher('#behind', false, 'left', 7500, 0);




	d3.select("#back_2")
		.attr('transform', "rotate(-90)");
	d3.select("#back_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3100, 10600)')
		.transition()
		.delay(4200)
		.ease('linear')
		.duration(1400)
		.attr('transform', 'translate( 3050, 6000)');

	change_car_flasher('#back', true, 'right',5500, 0);
	change_car_flasher('#back', true, 'left', 5500, 0);


	d3.select("#back_1")
		.transition()
		.delay('5600')
		.ease('ease out')
		.duration('800')
		.attr('transform',"translate(3100,5000)");

	change_car_flasher('#back', false, 'right',6800, 0);
	change_car_flasher('#back', false, 'left', 6800, 0);


	d3.select("#back_1")
		.transition()
		.delay('6800')
		.ease('ease out')
		.duration('1500')
		.attr('transform',"translate(3100,-800)")
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
carCanvas.append("rect")
	.attr('width', 1350)
	.attr('height', 200)
	.attr('x', 4000)
	.attr('y', 1700)
	.style('fill', '#FFFFFF');

create_car(carCanvas, "traffic1", "#32A4CE", 0, 0, 0);
create_car(carCanvas, "traffic2", "#32A4CE", 0, 0, 0);

create_car(carCanvas, "double", "#BF3819", 0, 0, 0);

create_car(carCanvas, "waiting1", "#32A4CE", 0, 0, 0);
create_car(carCanvas, "waiting2", "#32A4CE", 0, 0, 0);

create_car(carCanvas, "behind", "#32A4CE", 0, 0, 0);

create_car(carCanvas, "inter", "#32A4CE", 0, 0, 0);

create_car(carCanvas, "back", "#32A4CE", 0, 0, 0);

create_car(carCanvas, "other", "#32A4CE", 0, 0, 0);
create_car(carCanvas, "other2", "#32A4CE", 0, 0, 0);
