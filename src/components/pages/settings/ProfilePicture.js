import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import UserService from "../../../services/UserService";
import { Cropper as CropperBase } from "react-cropper";
import "cropperjs/dist/cropper.css";

import Error from "../../atoms/Error";

import PageTemplate from "../../templates/PageTemplate";
import UserContext from "../../../context/UserContext";

const Form = styled.form`
	
	display: flex;
	flex-direction: column;
	align-items: center;
	background: var(--secondary-background);
	border: 1px solid var(--primary-border);
	position: relative;
	padding: 30px;

	width: 900px;
	margin: 50px auto;

	@media (max-width: 950px) {
		width: 90%;
	}
	* {
		
		direction: ltr;
	}
`;


const H1 = styled.h1`
	font-size: 30px;
	margin-bottom: 20px;
`;

const Label = styled.label`
	background: var(--main-color);
	width: 30%;
	color: white;
	padding: 5px 0;
	text-align: center;
	font-size: 18px;
	border-radius: 2px;
	cursor: pointer;
	margin-bottom: 30px;
`;

const Input = styled.input`
	display: none;
`;

const Button = styled.button`
	background: var(--main-color);
	color: white;
	border: none;
	font-size: 18px;
	position: relative;
	top: 10px;
	margin-bottom: 20px;
	padding: 5px 0;
	width: 40%;
	cursor: pointer;
`;

const Cropper = styled(CropperBase)`
	max-width: 500px;
	
`;

const SettingsProfilePicture = () => {

	const user = useContext(UserContext);
	const userService = new UserService();

	const [ error, setError ] = useState("");
	const [ pending, setPending ] = useState(false);
	const [ success, setSuccess ] = useState(false);
	const [ picture, setPicture ] = useState();
	const [ cropper, setCropper ] = useState();

	const handleInput = (e) => {
	
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = function () {
			setPicture(reader.result);
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};
		
	};

	const Submit = async (e) => {
		e.preventDefault();

		setPending(true);

		cropper.getCroppedCanvas().toBlob(async (blob) => {
			try {
				
				userService.updateProfilePicture(user.uid, blob);

				setSuccess(true);
			}
			catch(error) {
				setError(error.message);
				setPending(false);
			}
		});

	};

	if(!user) {
		return <Redirect to="/login" />;
	}

	return (
		<PageTemplate>
			<Form onSubmit={e => Submit(e)}>
				<H1>تغيير صوره</H1>
				<Label htmlFor="picture">اختيار صورة</Label>
				{ error && <Error width="50%">{error}</Error> }
				{ success && <Redirect to={"/profile/" + user.uid} /> }
				<Input 
					type="file" 
					id="picture" 
					name="picture" 
					onChange={e => handleInput(e)} 
					disabled={pending}
				/>
				{ picture && 
					<>
						<Cropper
								initialAspectRatio={1}
								aspectRatio={1}
								src={picture}
								viewMode={0}
								zoomable={false}
								guides={false}
								disabled={pending}
								onInitialized={(cropper) => setCropper(cropper)}
							/>
						<Button 
							type="submit"
							disabled={pending}
						>حفظ التعديلات</Button>
				</>}
			</Form>
		</PageTemplate>
	);

};

export default SettingsProfilePicture;