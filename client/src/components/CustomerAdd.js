import React from "react";
import { post } from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
	hidden: {
		display: "none",
	},
});

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
			open: false,
		};
	}

	handleClickOpen = () => {
		this.setState({
			open: true,
		});
	};

	handleClose = () => {
		this.setState({
			file: null,
			userName: "",
			birthday: "",
			gender: "",
			job: "",
			fileName: "",
			open: false,
		});
	};

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
			open: false,
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
		const { classes } = this.props;
		return (
			<div>
				<Button
					variant="contained"
					color="primary"
					onClick={this.handleClickOpen}
				>
					고객추가하기
				</Button>
				<Dialog open={this.state.open} onClose={this.handleClose}>
					<DialogTitle>고객 추가</DialogTitle>
					<DialogContent>
						<input
							className={classes.hidden}
							accept="image/*"
							id="raised-button-file"
							type="file"
							file={this.state.file}
							value={this.state.fileName}
							onChange={this.handleFileChange}
						></input>
						<label htmlFor="raised-button-file">
							<Button
								variant="contained"
								color="primary"
								component="span"
								name="file"
							>
								{this.state.fileName === ""
									? "프로필 이미지 선택"
									: this.state.fileName}
							</Button>
						</label>
						<br />
						<TextField
							label="이름"
							type="text"
							name="userName"
							value={this.state.userName}
							onChange={this.handleValueChange}
						></TextField>
						<br />
						<TextField
							label="생년월일"
							type="text"
							name="birthday"
							value={this.state.birthday}
							onChange={this.handleValueChange}
						></TextField>
						<br />
						<TextField
							label="성별"
							type="text"
							name="gender"
							value={this.state.gender}
							onChange={this.handleValueChange}
						></TextField>
						<br />
						<TextField
							label="직업"
							type="text"
							name="job"
							value={this.state.job}
							onChange={this.handleValueChange}
						></TextField>
						<br />
					</DialogContent>
					<DialogActions>
						<Button
							variant="contained"
							color="primary"
							onClick={this.handleFormSubmit}
						>
							추가
						</Button>
						<Button
							variant="outlined"
							color="primary"
							onClick={this.handleClose}
						>
							닫기
						</Button>
					</DialogActions>
				</Dialog>
			</div>
			// <form onSubmit={this.handleFormSubmit}>
			// 	<h1> 고객추가 </h1>
			// 	프로필 이미지 :

			// 	<br />
			// 			<button type="submit">추가하기</button>

			// </form>
		);
	}
}

export default withStyles(styles)(CustomerAdd);
