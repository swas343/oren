import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { userActions } from "./store/users";
import Card from "./components/Card";
import Loader from "./components/Loader";
import { FaRedoAlt } from "react-icons/fa";

function App() {
	const users = useSelector((state) => state.users.users);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [resetUser, setResetUser] = useState(false);

	useEffect(() => {
		if (users.length === 0 || resetUser) {
			// make an api call here to populate users
			setResetUser(false)
			setIsLoading(true);
			try {
				const res = fetch(
					`https://jsonplaceholder.typicode.com/users`
				).then((response) => {
					if (!response.ok) {
						console.log(response);
						throw new Error("Request failed!");
					}

					const data = response.json().then((res) => {
						dispatch(userActions.addUserTemplate(res));
						setIsLoading(false);
					});
				});
			} catch (err) {
				setIsLoading(false);
				alert("Something went wrong!");
			}
		}
	}, [resetUser]);

	const resetUserHandler = () => {
		setResetUser(true)
	}

	if (isLoading) {
		return <Loader />;
	}

	if (!isLoading && users.length === 0) {
		return <h1 className="text-center pt-5">No users found!!</h1>;
	}

	return (
		<Container>
			<Row> <h1 className="text-center"><FaRedoAlt title="Reset Users" onClick={resetUserHandler} /></h1> </Row>
			<Row>
				
				{Object.keys(users).map((user) => {
					return (
						<Col sm={6} md={6} lg={6} key={Math.random()}>
							<Card
								key={Math.random()}
								id={users[user].id}
								name={users[user].name}
								username={users[user].username}
								email={users[user].email}
								website={users[user].website}
								phone={users[user].phone}
								isFavorite={users[user].isFavorite}
							/>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
}

export default App;
