import { EmailValidator } from './EmailValidator';

test('EmailValidator.validate() returns proper value', () => {
	function valid(email: string, expectedResult: boolean) {
		const r = EmailValidator.validate(email);
		expect(r).toEqual(expectedResult);
	}

	valid('test@gmail.com', true);
	valid('admin+test@gmail.com', true);

	valid('', false);
	valid('@', false);
	valid('a', false);
	valid('test@', false);
	valid('@gmail.com', false);
});
