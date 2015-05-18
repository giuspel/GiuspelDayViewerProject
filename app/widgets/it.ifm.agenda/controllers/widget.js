var args = arguments[0] || {};


"use strict";

var Appointment = function(id, description, author, group, priority, date_start, date_end){
	this.id = id;
	this.description = description;
	this.author = author;
	this.group = group;
	this.priority = priority;
	this.dateStart = date_start;
	this.dateEnd = date_end;
	
	this.hourStart = 0;
	this.hourEnd = 0;
	this.minuteStart = 0;
	this.minuteEnd = 0;
	
	this.idStart = 0;
	this.idEnd = 0;
	
	this.expandInColumns = 1;
	 	
	this.referencedColumn = 1;
};

Appointment.prototype.toString = function () {
	return "[app id : "+this.id+" ] "+ this.idStart+" - "+this.idEnd;	
};

Appointment.prototype.inCollision = function ( appointment ){
	var x = false;

	if(this.id === appointment.id) return false;

	if((this.idStart >= appointment.idStart) && (this.idStart <= appointment.idEnd)){
		x = true;
	} else 
	if((this.idEnd >= appointment.idStart) && (this.idEnd <= appointment.idEnd)){
		x = true;
	}

	return x; 		 	
		
};

module.exports = Appointment;


var LINE_HEIGHT = 44;
var SPACE_TIME = 15;  // 15 minuti
var LINES = 24 * 60 / SPACE_TIME;


var Colours = new Array();
Colours[0] = "green";
Colours[1] = "red";
Colours[2] = "yellow";
Colours[3] = "orange";
Colours[4] = "blue";

function dip(pixel){
	var dp = pixel * 160 /  Ti.Platform.displayCaps.dpi;
	return dp;	
}

function convertTimeToTop(h, m){
	if(+h <= 0 && +h >= 24)
		throw new Error("Ora non valida [ammesso un valore da 0 a 23]");
		
	if(+m !== 0 && +m !== 15 && +m !== 30 && +m !== 45)
		throw new Error("Minuti non validi [ammesso un valore tra {0, 15, 30, 45} ]");	
	
	var x = +h * 60 / SPACE_TIME;
	var y = (+m / SPACE_TIME);
	
	Ti.API.error("X="+x+", Y="+y);
	
	return x + y;

}

function format(i){
	if(i < 10) return "0"+i;
	return ""+i;
};


function setup(){
	$.agenda.removeAllChildren();
	
	var h = 0;
	var m = 0;
	
	
	for(var i = 0 ; i< LINES; i++){
		
		h = Math.floor(i / 4);
		
		var  l= Titanium.UI.createLabel({
			top : i * LINE_HEIGHT,
			left: 0,
			width : 50,
			font : {
				fontWeight : i % 4 == 0 ? 'bold':'normal',
				color : 'black',
				fontSize :  i % 4 == 0 ? 14:11
			},
			textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
			color : 'black',
			text : format(h)+":"+format((i % 4) * SPACE_TIME)
			
 		});

		$.agenda.add(l);
		var v = Titanium.UI.createView({
			height : 1,
			top : i * LINE_HEIGHT,
			left: 50,
			width : Ti.UI.FILL,
			borderColor : '#ccc',
			borderWidth : 1
			 
		});
		
		$.agenda.add(v);	
				
	}
}



var TOTAL_COLUMNS = 1;

var listAppointments = new Array();
var viewsAppointments = new Array();
var listColumns = new Array();

function repaintAppointments(){
	
	// cancello dallo schermo gli appuntamenti	
	for(pi = 0; pi < viewsAppointments.length; pi++){

		$.agenda.remove(viewsAppointments[pi]);
	}
	
	viewsAppointments = new Array();
	listColumns = new Array();
	
	// calcolo gli appuntamenti e creo gli slot da renderizzare
	arrangeAppointments();
	
	// creo le view degli appuntamenti
	for(pi = 0; pi < listAppointments.length; pi++){
		var li = listAppointments[pi];
		var v = createAppointmentView(pi, li);
		viewsAppointments.push(v);
	}	
	
	// adatto allo schermo attuale gli appuntamenti
	adaptAppointmentsWidth();		

	// disegno a video gli appuntamenti ridimensionati
	for(pi = 0; pi < viewsAppointments.length; pi++){
		var v = viewsAppointments[pi];
		$.agenda.add(v);
	}
	
	for(col = 0; col < listColumns.length; col++)
		Ti.API.error(listColumns[col]);
};


function createAppointmentView(last, app){
	var max_width = dip(Ti.Platform.displayCaps.platformWidth);

	if(+TOTAL_COLUMNS <= 0)
		TOTAL_COLUMNS = 1;
		
	var x = app.referencedColumn;
	if(x < 0) 
		x = 0;
	 	
	var w  = (max_width -60 - 10) ;
	app.idStart = convertTimeToTop(app.hourStart, app.minuteStart);
	app.idEnd = convertTimeToTop(app.hourEnd, app.minuteEnd);
	var t = LINE_HEIGHT *  app.idStart;
	var l = (x * w) + 60;
	var h = LINE_HEIGHT * (app.idEnd - app.idStart);
		
	var view = Ti.UI.createView({
		top : t,
		left : l, 
		width : w,
		height : h,
		backgroundColor : Colours[app.group],
		borderRadius : 1,
		borderColor : '#555',
		borderWidth : 1
		 
	});
	
	var label = Ti.UI.createLabel({
		backgroundColor : 'white',
		color: 'navy',
		left : 10,
		top: 0,
		bottom:0,
		right : 0,
		font : {
			fontSize : 9,
			fontColor: 'navy',
			fontFamily : 'Montserrat-Regular'
		},
		text : app.description
	});
	
	view.add(label);

	return view;
}

function adaptAppointmentsWidth(){
	var max_width = dip(Ti.Platform.displayCaps.platformWidth);
		
	for(appi = 0; appi < listAppointments.length; appi++){
		var app = listAppointments[appi];
		
		var b = false;

		// reset app.expandInColumns = 1
		app.expandInColumns = 1;

		for(col = app.referencedColumn; col < TOTAL_COLUMNS; col++){
			var array_col = listColumns[col];
			for(app_col = 0; app_col < array_col.length; app_col++){
				if(app.inCollision(array_col[app_col])){
					b = true;
					break;
				}
			}
			
			if(!b) 
				app.expandInColumns = app.expandInColumns+1;
			else 
				break; 
		}		
	}
	

	for(appi = 0; appi < listAppointments.length; appi++){
		var app = listAppointments[appi];
	
		var w = ((max_width  - 60) / TOTAL_COLUMNS * app.expandInColumns ) - 5;
		var l = 60 + ((max_width - 60)  / TOTAL_COLUMNS * (app.referencedColumn - 1)) + 1;
	
		viewsAppointments[appi].width = w;
		viewsAppointments[appi].left = l;
	}
		
}

function arrangeAppointments(){

	var firstColumn = new Array();
	firstColumn.push(listAppointments[0]);
	
	listColumns.push(firstColumn);
	
	for(pointer = 1; pointer < listAppointments.length; pointer++){
		var apptmp = listAppointments[pointer];
		apptmp.referencedColumn = 1;
		var appointmentCollocated = false;
		for(col=0; col < listColumns.length;  col++){
			if(!appointmentCollocated && !findAppointmentInColumn(apptmp, listColumns[col])){
				listColumns[col].push(apptmp);
				apptmp.referencedColumn=col+1;
				appointmentCollocated = true;
			}
		}
		
		if(!appointmentCollocated){
			var newColumn = new Array();
			newColumn.push(apptmp);
			listColumns.push(newColumn);
			TOTAL_COLUMNS = listColumns.length;
			apptmp.referencedColumn = TOTAL_COLUMNS;
			appointmentCollocated = true;
		}		
	}
	
	TOTAL_COLUMNS = listColumns.length;
	

}

// verifico se l'appuntamento va in collisione con altri appuntamenti in lista
function findAppointmentInColumn(app, list){
	for(ix =0; ix < list.length; ix++){
		if(app.inCollision(list[ix])){
			return true;
		}
	}
	return false;
}


function transform(x){
	var app = new Appointment();
	app.id = x.id;
	app.description = x.description;

	app.hourStart = x.hourStart;
	app.hourEnd = x.hourEnd;
	app.minuteStart = x.minuteStart;
	app.minuteEnd = x.minuteEnd;

	app.idStart = convertTimeToTop(app.hourStart, app.minuteStart);
	app.idEnd = convertTimeToTop(app.hourEnd, app.minuteEnd);
	app.author = x.author;
	app.group = x.group;
	
	Ti.API.error("idStart = "+app.idStart+" , idEnd = "+app.idEnd);
	
	return app;	
}

$.paintListOfAppointments = function paintListOfAppointments(listapp){
	setup();
	listAppointments = listapp.map(transform);
	repaintAppointments();
};

Ti.Gesture.addEventListener('orientationchange', onOrientationChange);

function onOrientationChange(event) {
	updateOrientation(event.source.isPortrait());
}

function updateOrientation(portrait) {
	repaintAppointments();
}
