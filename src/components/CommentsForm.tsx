import React, { useEffect, useState } from 'react';
import { submitComment } from '../services/submit-comment';

const CommentForm = ({ slug }: { slug: string }) => {
	const [error, setError] = useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		comment: '',
		storeData: false
	});

	/*
	 * @see: https://stackoverflow.com/questions/66963289/useref-typescript-not-assignable-to-type-legacyrefhtmldivelement
	 */

	useEffect(() => {
		/* You can use Boolean() or !! to convert a string to truthy/ falsy values
		 * @see https://jorgedacostaza.gitbook.io/typescript-pt/recap/truthy
		 */
		const IsSavedBefore =
			!!window.localStorage.getItem('name') ||
			Boolean(window.localStorage.getItem('email'));

		const initialFormData = {
			name: window.localStorage.getItem('name') ?? '',
			email: window.localStorage.getItem('email') ?? '',
			storeData: IsSavedBefore,
			comment: ''
		};
		setFormData(initialFormData);
	}, []);

	const onInputChange = (e: any) => {
		const { target } = e;
		if (target.type === 'checkbox') {
			setFormData(prevState => ({
				...prevState,
				[target.name]: target.checked
			}));
		} else {
			setFormData(prevState => ({
				...prevState,
				[target.name]: target.value
			}));
		}
	};

	const handleCommentOnSubmit = () => {
		setError(false);
		const { name, email, comment, storeData } = formData;

		if (!comment || !name || !email) {
			setError(true);
			return;
		}

		const commentObj = { name, email, comment, slug };



		submitComment(commentObj)
			.then(res => {
				if (res.createComment) {
					if (!storeData) {
						formData.name = '';
						formData.email = '';
					}
					formData.comment = '';

					setFormData(prevState => ({
						...prevState,
						...formData
					}));
					setShowSuccessMessage(true);
					setTimeout(() => {
						setShowSuccessMessage(false);
					}, 3000);
				} else {
					setError(true);
				}
			})
			.catch(error => {
				setError(true);
				console.log(error);
			});

		if (storeData) {
			window.localStorage.setItem('name', name);
			window.localStorage.setItem('email', email);
		} else {
			window.localStorage.removeItem('name');
			window.localStorage.removeItem('email');
		}
	};

	return (
		<div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
			<h3 className="text-xl mb-8 font-semibold border-b pb-4">
				Leave a Reply
			</h3>
			<div className="grid grid-cols-1 gap-4 mb-4">
				<textarea
					className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
					placeholder="Comment"
					name="comment"
					value={formData.comment}
					onChange={onInputChange}
				/>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
				<input
					type="text"
					className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
					placeholder="Name"
					name="name"
					value={formData.name}
					onChange={onInputChange}
				/>
				<input
					type="email"
					className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
					placeholder="Email"
					name="email"
					value={formData.email}
					onChange={onInputChange}
				/>
			</div>
			<div className="grid grid-cols-1 gap-4 mb-4">
				<div>
					<input
						type="checkbox"
						id="storeData"
						name="storeData"
						defaultChecked={
							formData.storeData
						}
						// checked={formData.storeData}
						onChange={onInputChange}
					/>
					<label
						htmlFor="storeDate"
						className="text-gray-500 cursor-pointer ml-2"
					>
						Save my e-mail and name for the
						next time I comment.
					</label>
				</div>
			</div>
			{error && (
				<p className="text-xs text-red-500">
					All Fields are required. Please ensure
					you've entered all fields in a proper
					way!
				</p>
			)}
			<div className="mt-8">
				<button
					type="button"
					onClick={handleCommentOnSubmit}
					className="transition duration-500 ease-in hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
				>
					Post Comment
				</button>
				{showSuccessMessage && (
					<span className="text-xl float-right font-semibold mt-3 text-green-500">
						Comment submitted for review.
					</span>
				)}
			</div>
		</div>
	);
};

export default CommentForm;
