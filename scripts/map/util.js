export function createDataset(series, minColor, maxColor) {
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

export function createSeries(data) {
	let codes = [
		"HR021", // Bjelovarsko-bilogorska
		"HR022", // Virovitičko-podravska
		"HR023", // Požeško-slavonska
		"HR024", // Brodsko-posavska
		"HR025", // Osječko-baranjska
		"HR026", // Vukovarsko-srijemska
		"HR027", // Karlovačka
		"HR028", // Sisačko-moslavačka
		"HR031", // Primorsko-goranska
		"HR032", // Ličko-senjska
		"HR033", // Zadarska
		"HR034", // Šibensko-kninska
		"HR035", // Splitsko-dalmatinska
		"HR036", // Istarska
		"HR037", // Dubrovačko-neretvanska
		"HR050", // Grad Zagreb
		"HR061", // Međimurska
		"HR062", // Varaždinska
		"HR063", // Koprivničko-križevačka
		"HR064", // Krapinsko-zagorska
		"HR065", // Zagrebačka
	];

	const zip = (a, b) => a.map((k, i) => [k, b[i]]);
	return zip(codes, data);
}
