import React, { Component } from "react";
import "./App.css";
import Customer from "./components/Customer";

const customers = [
	{
		id: 1,
		image: "https://placeimg.com/64/64/1",
		name: "나동빈",
		birthday: "961222",
		gender: "남자",
		job: "대학생",
	},
	{
		id: 2,
		image: "https://placeimg.com/64/64/2",
		name: "나동현",
		birthday: "961222",
		gender: "남자",
		job: "대학생",
	},
	{
		id: 3,
		image: "https://placeimg.com/64/64/3",
		name: "나동진",
		birthday: "961222",
		gender: "남자",
		job: "대학생",
	},
];

class App extends Component {
	render() {
		return (
			<div>
				{customers.map((customer) => (
					<Customer
						key={customer.id}
						id={customer.id}
						image={customer.image}
						name={customer.name}
						birthday={customer.birthday}
						gender={customer.gender}
						job={customer.job}
					/>
				))}
			</div>
		);
	}
}

export default App;
