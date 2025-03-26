import React, { useState } from 'react';

export default function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:3000/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (response.ok) {
				setMessage('Login successful');
			} else {
				setMessage('Username or password was incorrect');
			}
		} catch (error) {
			setMessage('An error occurred. Please try again.');
		}

		setEmail('');
		setPassword('');
	};

	return (
		<div className="max-w-sm mx-auto mt-10 p-6 border rounded-2xl shadow-lg bg-white">
			<h2 className="text-2xl font-semibold mb-4">Login</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div>
					<label className="block text-sm font-medium mb-1">Email</label>
					<input
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
						className="w-full border px-3 py-2 rounded-lg"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">Password</label>
					<input
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
						className="w-full border px-3 py-2 rounded-lg"
					/>
				</div>
				<button type="submit" className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
					Submit
				</button>
			</form>

			{message && <div className="mt-4 text-center text-sm text-gray-700">{message}</div>}
		</div>
	);
}

