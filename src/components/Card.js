import classes from "./Card.module.css";
import { Row, Col } from "react-bootstrap";
import {
	FaEnvelope,
	FaPhoneAlt,
	FaGlobe,
	FaHeart,
	FaRegHeart,
	FaEdit,
	FaCheck,
	FaTrash,
} from "react-icons/fa";

import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../store/users";

const Card = (props) => {
	const dispatch = useDispatch();
	const [editMode, setEditMode] = useState();
	const emailRef = useRef();
	const phoneRef = useRef();
	const websiteRef = useRef();

	const toggleFavoriteHandler = () => {
		dispatch(userActions.toggleFavorite(props.id));
	};

	const deleteUserHandler = () => {
		dispatch(userActions.deleteUser(props.id));
	};

	const toggleEditMode = () => {
		setEditMode((state) => !state);
	};

	const updateUserHandler = () => {
		let email = emailRef.current.value
		let phone = phoneRef.current.value
		let website = websiteRef.current.value
		dispatch(userActions.editUser({id:props.id,email:email,phone:phone,website:website}))

		toggleEditMode()
	};

	return (
		<div className={classes.card}>
			<div className={classes.cardImage}>
				<img
					src={`https://avatars.dicebear.com/v2/avataaars/%7B%7B${props.username}%7D%7D.svg?options[mood][]=happy`}
					alt="user profile"
				/>
			</div>

			<div className={classes.cardDetails}>
				<h2>{props.name}</h2>
				{!editMode && (
					<>
						<p>
							<FaEnvelope className={classes.icon} /> {props.email}
						</p>
						<p>
							<FaPhoneAlt className={classes.icon} /> {props.phone}
						</p>
						<p>
							<FaGlobe className={classes.icon} /> {props.website}
						</p>
					</>
				)}

				{editMode && (
					<>
						<p>
							<FaEnvelope className={classes.icon} /> <input ref={emailRef} defaultValue={props.email} />
						</p>
						<p>
							<FaPhoneAlt className={classes.icon} /> <input ref={phoneRef} defaultValue={props.phone} />
						</p>
						<p>
							<FaGlobe className={classes.icon} /> <input ref={websiteRef} defaultValue={props.website} />
						</p>
					</>
				)}

				
			</div>

			<div className={classes.footer}>
				<Row className="text-center">
					<Col sm={4} md={4} lg={4}>
						{props.isFavorite && (
							<FaHeart
								className={classes.red}
								onClick={toggleFavoriteHandler}
							/>
						)}
						{!props.isFavorite && (
							<FaRegHeart
								className={classes.red}
								onClick={toggleFavoriteHandler}
							/>
						)}
					</Col>
					<Col sm={4} md={4} lg={4}>
						{!editMode && <FaEdit onClick={toggleEditMode} />}
						{editMode && (
							<FaCheck onClick={updateUserHandler} className={classes.green} />
						)}
					</Col>
					<Col sm={4} md={4} lg={4}>
						<FaTrash onClick={deleteUserHandler} />
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Card;
