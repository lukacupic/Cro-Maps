let map = new Datamap({
	element: document.getElementById("map"),
	scope: "croatia",
	geographyConfig: {
		popupOnHover: true,
		highlightOnHover: true,
		borderColor: "#444",
		borderWidth: 0.5,
		dataUrl: "/croatia.topo.json",
	},
	fills: {
		MAJOR: "#306596",
		MEDIUM: "#0fa0fa",
		MINOR: "#bada55",
		defaultFill: "#dddddd",
	},
	setProjection: function (element) {
		let projection = d3.geo
			.mercator()
			.center([16.4688717, 44.4737849])
			.scale(7000)
			.translate([element.offsetWidth / 2, element.offsetHeight / 2]);
		let path = d3.geo.path().projection(projection);
		return { path: path, projection: projection };
	},
});
