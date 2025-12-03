export const validateEmail = (email: string): boolean => {
	const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return re.test(email);
};

export const validatePassword = (password: string): boolean => {
	// Min 8 chars, at least one letter and one number
	const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
	return re.test(password);
};
