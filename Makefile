lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test-watch:
	npx -n --experimental-vm-modules jest --watch
