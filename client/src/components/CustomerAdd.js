import React from "react";
import { post } from "axios";

class CustomerAdd extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file: null,
			userName: "",
			birthday: "",
			gender: "",
			job: "",
			fileName: "",
		};
	}

	handleFormSubmit = (event) => {
		event.preventDefault();
		this.addCustomer().then((response) => {
			this.props.stateRefresh();
		});

		this.setState({
			file: null,
			userName: "",
			birthday: "",
			gender: "",
			job: "",
			fileName: "",
		});
	};

	handleFileChange = (event) => {
		this.setState({
			//파일을 여러개 올리는 형태지만 우리는 하나만 올리니까
			file: event.target.files[0],
			fileName: event.target.value,
		});
	};

	handleValueChange = (event) => {
		let nextState = {};
		nextState[event.target.name] = event.target.value;
		this.setState(nextState);
	};

	addCustomer = () => {
		const url = "/api/customers";
		const formData = new FormData();
		formData.append("image", this.state.file);
		formData.append("name", this.state.userName);
		formData.append("birthday", this.state.birthday);
		formData.append("gender", this.state.gender);
		formData.append("job", this.state.job);
		// 파일 전송할시 필요한 웹표준
		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};

		return post(url, formData, config);
	};

	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>
				<h1> 고객추가 </h1>
				프로필 이미지 :
				<input
					type="file"
					name="file"
					file={this.state.file}
					value={this.state.fileName}
					onChange={this.handleFileChange}
				></input>
				<br />
				이름:{" "}
				<input
					type="text"
					name="userName"
					value={this.state.userName}
					onChange={this.handleValueChange}
				></input>
				<br />
				생년월일:{" "}
				<input
					type="text"
					name="birthday"
					value={this.state.birthday}
					onChange={this.handleValueChange}
				></input>
				<br />
				성별:{" "}
				<input
					type="text"
					name="gender"
					value={this.state.gender}
					onChange={this.handleValueChange}
				></input>
				<br />
				직업:{" "}
				<input
					type="text"
					name="job"
					value={this.state.job}
					onChange={this.handleValueChange}
				></input>
				<br />
				<button type="submit">추가하기</button>
			</form>
		);
	}
}

export default CustomerAdd;
