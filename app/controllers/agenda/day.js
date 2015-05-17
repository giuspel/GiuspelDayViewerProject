var args = arguments[0] || {};

var listAppointments = [
	{
		id : 1,
		description : "Appuntamento dal dentista",
		group : 4,
		author : "Giuseppe Pellegrino",
		hourStart : 8,
		minuteStart : 15,
		hourStart : 9,
		minuteStart : 30
	},
	{
		id : 2,
		description : "Giornalaio",
		group : 4,
		author : "Giuseppe Pellegrino",
		hourStart : 8,
		minuteStart : 30,
		hourStart : 10,
		minuteStart : 30
	},
	{
		id : 3,
		description : "Pranzo fuori ...",
		group : 1,
		author : "Giuseppe Pellegrino",
		hourStart : 12,
		minuteStart : 45,
		hourStart : 13,
		minuteStart : 30
	},
	{
		id : 4,
		description : "Lavoro",
		group : 2,
		author : "Giuseppe Pellegrino",
		hourStart : 14,
		minuteStart : 0,
		hourStart : 17,
		minuteStart : 30
	},
	{
		id : 6,
		description : "Spesa",
		group : 0,
		author : "Giuseppe Pellegrino",
		hourStart : 18,
		minuteStart : 0,
		hourStart : 19,
		minuteStart : 30
	}	
];

$.agendaday.paintListOfAppointments(listAppointments);

