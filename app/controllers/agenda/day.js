var args = arguments[0] || {};

var listAppointments = [
	{
		id : 1,
		description : "Appuntamento 01",
		group : 4,
		author : "Giuseppe Pellegrino",
		idStart : 1,
		idEnd : 4
	},
	{
		id : 2,
		description : "Appuntamento 01",
		group : 4,
		author : "Giuseppe Pellegrino",
		idStart : 3,
		idEnd : 12
	},
	{
		id : 3,
		description : "Appuntamento 1",
		group : 2,
		author : "Giuseppe Pellegrino",
		idStart : 10,
		idEnd : 15
	},
	{
		id : 4,
		description : "Appuntamento 3",
		group : 1,
		author : "Giuseppe Pellegrino",
		idStart : 24,
		idEnd : 34
	},
	{
		id : 5,
		description : "Appuntamento x",
		group : 0,
		author : "Giuseppe Pellegrino",
		idStart : 24,
		idEnd : 27
	},
	{
		id : 6,
		description : "Appuntamento 5",
		group : 4,
		author : "Giuseppe Pellegrino",
		idStart : 30,
		idEnd : 36
	}
];

$.agendaday.paintListOfAppointments(listAppointments);

