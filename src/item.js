import React from "react";

export default function(props){

	return ( 
	<li onClick={ () => {console.log(props.pet)} } >
		<h2>
		<button onClick={ () => {props.deleteItem(props.numberInList)} }>X</button>
		Name: {props.pet} 	
		</h2>
		<p>Owner: {props.owner}</p>
		<p>{props.date}</p>
		<p>{props.time}</p>
		<p>{props.notes}</p>
	</li>
	)
}