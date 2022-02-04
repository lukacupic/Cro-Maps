import { createSeries, createDataset } from "./util.js";

function createMap(data, label) {
	let mapElement = document.getElementById("map");
	mapElement.innerHTML = "";

	let series = createSeries(data);
	let dataset = createDataset(series, "#adcdff", "#003385");

	let map = new Datamap({
		element: mapElement,
		scope: "croatia",
		setProjection: function (element) {
			let projection = d3.geo
				.mercator()
				.center([16.4688717, 44.4737849])
				.scale(element.offsetWidth < 1000 ? 3000 : 7000)
				.translate([element.offsetWidth / 2, element.offsetHeight / 2]);
			let path = d3.geo.path().projection(projection);
			return {
				path: path,
				projection: projection,
			};
		},
		fills: { defaultFill: "#F5F5F5" },
		data: dataset,
		geographyConfig: {
			popupOnHover: true,
			borderWidth: 0.5,
			dataUrl: "/croatia.topo.json",
			popupTemplate: function (geo, data) {
				if (!data) return;

				function stringifyNumber(n) {
					return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
				}

				return [
					'<div class="hoverinfo">',
					"<strong>",
					geo.properties.name,
					"</strong>",
					`<br>${label}: <strong>`,
					stringifyNumber(data.value),
					"</strong>",
					"</div>",
				].join("");
			},
		},
	});
}

function showPopulationMap() {
	createMap(
		[
			103448,
			71432,
			65158,
			134283,
			262852,
			147022,
			114254,
			142613,
			269508,
			43439,
			162481,
			98460,
			431213,
			198155,
			117242,
			777183,
			107615,
			161820,
			102564,
			121934,
			304348,
		],
		"Populacija (2021.)"
	);
}

window.showPopulationMap = showPopulationMap;
