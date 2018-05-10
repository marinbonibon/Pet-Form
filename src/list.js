//let React = require("react");
import React from "react";
import Item from "./item";




class List extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				pet: "",
				owner: "",
				date: "",
				time: "",
				notes: "",
				vis: true,
				sortBy: "",
				filteredTerm: "",
				arr:[]
			};
		}

	deleteItem(index){
		let arrCopy = this.state.arr.concat([]);
		arrCopy.splice(index, 1);
		this.setState({arr: arrCopy});
		console.log('this', this);
	}

	getData(e){
		e.preventDefault();
		let arrCopy = this.state.arr.concat([]);
		let key = this.generateId();
		let noteObj = {
			petName: this.state.pet,
			ownerName: this.state.owner,
			dateOfAp: this.state.date,
			timeOfAp: this.state.time,
			AptNotes: this.state.notes,
			key: key+"li"
		};
		arrCopy.push(noteObj);
		this.setState({arr:arrCopy, pet: ""}, () => {console.log(this.state)} );

	}
	generateId() {
		this.uId = this.uId || 0;
		return this.uId++;
	}
	getText(id, e){
		let text = e.target.value;
		let helperObj = {};
		helperObj[id] = text;
  		this.setState( helperObj );  
	}
	setSort(e) {
		console.log("SetSort")
		this.setState({sortBy: e.target.value});
	}
	setFilter(e) {
		this.setState({filteredTerm: e.target.value});
	}
	filterArr(arr, term) {
		let filteredArr;
		filteredArr = arr.filter(item => {
			return item.petName.toLowerCase().indexOf(term.toLowerCase() ) > -1;
		})
		return filteredArr;
	}


	render() {

		let sortedArr = [...this.state.arr];

		if (this.state.sortBy == 'up') {
			sortedArr.sort((a,b) => {
				if(a.petName.toLowerCase() > b.petName.toLowerCase()) {
					return 1;
					console.log(a.petName);
				}
				else return -1;
			});
		}
		else if (this.state.sortBy == 'down') {
			sortedArr.sort((a,b) => {
				if(a.petName.toLowerCase() > b.petName.toLowerCase()) {
					return -1;
				}
				return 1;
			});
		}
		else {
			sortedArr = this.state.arr;
		}

		let finalArr = this.filterArr(sortedArr, this.state.filteredTerm);


		let lis = finalArr.map( (item, index) => {
			return <Item pet={item.petName} owner={item.ownerName} date={item.dateOfAp} time={item.timeOfAp} notes={item.AptNotes} numberInList={index} key={item.key} deleteItem={this.deleteItem.bind(this)} />
		})
		let displ = this.state.vis ? "none" : "block";
		return (
			<div>
				<div className="maindiv">
			        <div id="title" className="titleborder"
			        onClick = {() => {this.setState({vis:!this.state.vis})}}
			        >
						<p> + Add Appointment</p>
			        </div>
			        <div id="form" style = {{display:displ}}>
						<form onSubmit={this.getData.bind(this)}>
				            <div className="formplace">
								<span>Pet Name</span>
								<input type="text" placeholder="Pet Name" className="long1" 
								onChange={this.getText.bind(this, "pet")}
								value={this.state.pet}
								/>
				            </div>
				            <div className="formplace">
								<span>Pet Owner</span>
								<input type="text" placeholder="Owner's Name" className="long2" 
								onChange={this.getText.bind(this, "owner")}
								value={this.state.owner}
								/>
				            </div>
				            <div className="formplace">
								<span>Date</span>
								<input type="date" placeholder="mm.dd.yyyy" className="short1" 
								onChange={this.getText.bind(this, "date")}
								/>
								<span>Time</span>
								<input type="time" placeholder="--:-- --" className="short2"
								onChange={this.getText.bind(this, "time")}
								 />
				            </div>
				            <div className="formplace">
								<span>Apt.Notes</span>
								<input id="textarea" placeholder="Apointment Notes" 
								onChange={this.getText.bind(this, "notes")}
								/>
				            </div>
				            <button className="btn">Add Appointment</button>
						</form>
			        </div>
			    </div>
			    <select className="sort" onChange={this.setSort.bind(this)} >
					<option value="">No Sort</option>
					<option value="up">A-Z</option>
					<option value="down">Z-A</option>
				</select>
				<input className="filter" type="text" placeholder="Filter by Pet Name"
				onChange={this.setFilter.bind(this)} value={this.state.filteredTerm} />
				<ul className="appstyle">
					{lis}
				</ul>
			</div>
		)
	}
}
export default List;




	