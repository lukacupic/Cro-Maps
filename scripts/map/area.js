import { createSeries, createDataset } from "./util.js";

function createMap(data, label) {
	let mapElement = document.getElementById("map");
	mapElement.innerHTML = "";

	let series = createSeries(data);
	let dataset = createDataset(series, "#adffbe", "#163d1e");

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

function showAreaMap() {
	createMap(
		[
			2640,
			2024,
			1823,
			2030,
			4155,
			2454,
			3626,
			4468,
			3588,
			5353,
			3646,
			2984,
			4540,
			2813,
			1781,
			641,
			729,
			1262,
			1748,
			1229,
			3060,
		],
		"Površina (km²)"
	);
}

window.showAreaMap = showAreaMap;
