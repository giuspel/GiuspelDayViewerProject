var args = arguments[0] || {};

var listAppointments = [
	{
		id : 1,
		description : "Appuntamento dal dentista",
		group : 4,
		author : "Giuseppe Pellegrino",
		hourStart : 8,
		minuteStart : 15,
		hourEnd : 9,
		minuteEnd : 30
	},
	{
		id : 2,
		description : "Giornalaio",
		group : 4,
		author : "Giuseppe Pellegrino",
		hourStart : 8,
		minuteStart : 30,
		hourEnd : 10,
		minuteEnd : 30
	},
	{
		id : 3,
		description : "Pranzo fuori ...",
		group : 1,
		author : "Giuseppe Pellegrino",
		hourStart : 12,
		minuteStart : 45,
		hourEnd : 13,
		minuteEnd : 30
	},
	{
		id : 4,
		description : "Lavoro",
		group : 2,
		author : "Giuseppe Pellegrino",
		hourStart : 14,
		minuteStart : 0,
		hourEnd : 17,
		minuteEnd : 30
	},
	{
		id : 6,
		description : "Spesa",
		group : 0,
		author : "Giuseppe Pellegrino",
		hourStart : 18,
		minuteStart : 0,
		hourEnd : 19,
		minuteEnd : 30
	}	
];

$.agendaday.paintListOfAppointments(listAppointments);

