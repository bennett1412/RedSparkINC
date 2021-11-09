import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CustomTextField from './CustomTextField';
import './AuthComponentsStyle.css';
import GreenBtn from '../../../components/GreenBtn/GreenBtn';

import { signup, login } from '../../../actions/auth';
import { Button } from '@material-ui/core';
import OtpInput from 'react-otp-input';
import { getOTP } from '../../../actions/otp';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const initialState = { name: '', email: '', uplandUsername: '', password: '', passwordConfirm: '' }
const AuthBox = ({ signupState }) => {
	const [isSignup, setisSignup] = useState((signupState === undefined) ? true : signupState)
	const [otpToggle, setOtpToggle] = useState(false);
	const [otp, setOtp] = useState("");
	const EnterOtp = () => {
		dispatch(getOTP(form.email));
		setOtpToggle(true);
	}
	const switchMode = () => {
		setForm(initialState);
		setisSignup((prevIsSignup) => !prevIsSignup);
	};
	const [form, setForm] = useState(initialState);
	const dispatch = useDispatch();
	const history = useHistory();
	const verification_key =  useSelector((state) => { return state.otp.verification_key });
	const handleLogin = (e) => {
		e.preventDefault();
		if (isSignup && otp) {
			const s = dispatch(signup(form, history));
			console.log(s)
		}
		else {
			try {
				dispatch(login(form, history));
			} catch (error) {

				console.log('this is the error:' + error);
			}
		}
	};

	const handleSignup = (e) => {
		e.preventDefault();

		const send = { form: form, otp:otp, verification_key: verification_key}
		dispatch(signup(send,history));
	}
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	}
	const handleOtp = (otp) => {
		setOtp(otp);
	}
	return (

		<div className="signupbox">
			{!otpToggle && (
				<>

					<form autoComplete='off' noValidate action="">
						{isSignup && (
							<>
								<CustomTextField label="Name" name="name" className={"textfield"} variant="outlined" margin="dense" color="primary" fullWidth onChange={handleChange} />
								<CustomTextField label="Upland Username" name="uplandUsername" className={"textfield"} variant="outlined" margin="dense" color="primary" fullWidth onChange={handleChange} />
							</>
						)}
						<CustomTextField label="Email" name="email" className={"textfield"} variant="outlined" margin="dense" color="primary" fullWidth onChange={handleChange} />
						<CustomTextField label="Password" name="password" className="textfield" variant="outlined" type="password" margin="dense" fullWidth onChange={handleChange} />
						{isSignup && <CustomTextField label="Confirm Password" name="passwordConfirm" className="textfield" variant="outlined" type="password" margin="dense" fullWidth onChange={handleChange} />}
						{!isSignup && <>  <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Remember Me" /> <GreenBtn className="signup-button" content='Login' onClick={handleLogin} /> </> }
					</form>
					{isSignup && <GreenBtn className="signup-button" content='Signup' onClick={EnterOtp} />}
					<Button onClick={switchMode}>
						{isSignup ? 'Log In?' : 'Signin?'}
					</Button>
				</>
			)}
			{otpToggle && (
				<>
					<OtpInput
						value={otp}
						onChange={handleOtp}
						numInputs={6}
						separator={<span> - </span>}
					/>
					<GreenBtn className="signup-button" content='Submit' onClick={handleSignup} />
				</> 
			)}
		</div>
	)
}

export default AuthBox;
