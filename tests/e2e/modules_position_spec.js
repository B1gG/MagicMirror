const helpers = require("./global-setup");

const describe = global.describe;
const it = global.it;

describe("Position of modules", function () {
	helpers.setupTimeout(this);

	let app = null;

	describe("Using helloworld", function () {
		after(function () {
			return helpers.stopApplication(app);
		});

		before(function () {
			// Set config sample for use in test
			process.env.MM_CONFIG_FILE = "tests/configs/modules/positions.js";
			return helpers
				.startApplication({
					args: ["js/electron.js"]
				})
				.then(function (startedApp) {
					app = startedApp;
				});
		});

		const positions = ["top_bar", "top_left", "top_center", "top_right", "upper_third", "middle_center", "lower_third", "bottom_left", "bottom_center", "bottom_right", "bottom_bar", "fullscreen_above", "fullscreen_below"];

		for (const position of positions) {
			const className = position.replace("_", ".");
			it("should show text in " + position, function () {
				return app.client.$("." + className).then((result) => {
					return result.getText("." + className).should.eventually.equal("Text in " + position);
				});
			});
		}
	});
});
