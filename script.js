function createMap(data, label) {
	let series = createSeries(data);
	let dataset = createDataset(series, "#adcdff", "#003385");

	return new Datamap({
		element: document.getElementById("map"),
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
			highlightOnHover: true,
			borderColor: "#444",
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

function createDataset(series, minColor, maxColor) {
	let dataset = {};

	let onlyValues = series.map((obj) => obj[1]);
	let minValue = Math.min.apply(null, onlyValues);
	let maxValue = Math.max.apply(null, onlyValues);

	let paletteScale = d3.scale.linear().domain([minValue, maxValue]).range([minColor, maxColor]);

	series.forEach((item) => {
		let iso = item[0];
		let value = item[1];

		dataset[iso] = {
			fillColor: paletteScale(value),
			value: value,
		};
	});

	return dataset;
}

function createSeries(data) {
	let codes = [
		"HR021",
		"HR022",
		"HR023",
		"HR024",
		"HR025",
		"HR026",
		"HR027",
		"HR028",
		"HR031",
		"HR032",
		"HR033",
		"HR034",
		"HR035",
		"HR036",
		"HR037",
		"HR050",
		"HR061",
		"HR062",
		"HR063",
		"HR064",
		"HR065",
	];

	const zip = (a, b) => a.map((k, i) => [k, b[i]]);
	return zip(codes, data);
}

// -------------------------------------------------------------------------

let population = [
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
];

let map = createMap(population, "Populacija");

//

//on resize, move search and top nav position according to window width
var resizing = false;
window.addEventListener("resize", function () {
	if (resizing) return;
	resizing = true;
	!window.requestAnimationFrame ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
});
window.dispatchEvent(new Event("resize")); //trigger the moveNavigation function

function moveNavigation() {
	var mq = checkMQ();
	if (mq == "mobile" && !Util.hasClass(navList.parentNode, "js-cd-side-nav")) {
		detachElements();
		sidebar.appendChild(navList);
		sidebar.insertBefore(searchInput, sidebar.firstChild);
	} else if (mq == "desktop" && !Util.hasClass(navList.parentNode, "js-cd-main-header")) {
		detachElements();
		mainHeader.appendChild(navList);
		mainHeader.insertBefore(searchInput, mainHeader.firstChild.nextSibling);
	}
	resizing = false;
}

function detachElements() {
	searchInput.parentNode.removeChild(searchInput);
	navList.parentNode.removeChild(navList);
}
