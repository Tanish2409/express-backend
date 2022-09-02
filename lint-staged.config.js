module.exports = {
	"src/**/*.ts": (filenames) => [
		"yarn tsc --noEmit",
		`yarn eslint --resolve-plugins-relative-to ${filenames.join(" ")}`,
		`yarn prettier --write ${filenames.join(" ")}`,
	],
};
