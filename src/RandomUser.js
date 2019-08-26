import React from 'react';
import { trackPromise } from 'react-promise-tracker';

export class RandomUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: []
		};
	}

	componentDidMount() {
		trackPromise(
			fetch("https://randomuser.me/api/?results=12")
				.then(res => res.json())
				.then(parsedJSON => parsedJSON.results.map(data => (
					{
						name: `${data.name.first} ${data.name.last}`,
			            location: `${data.location.state}, ${data.nat}`,
			            thumbnail: `${data.picture.large}`,
			            email: `${data.email}`,
			            phone: `${data.phone}`,
			            username: `${data.login.username}`
					}	
				)))
				.then(items => this.setState({
					items, isLoaded: false
				}))
				.catch(error => console.log('parsing failed', error))
		);
	}

	render() {
		return (
			<div>
				<Search items={this.state.items} />
			</div>
		);
	}
}

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filtered: []
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.setState({
			filtered: this.props.items
		})
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			filtered: nextProps.items
		})
	}

	handleChange(e) {
		let currentList = [];
		let newList = [];

		if(e.target.value !== "") {
			currentList = this.props.items;

			newList = currentList.filter(item => {
				const lc = item.name.toLowerCase();
				const filter = e.target.value.toLowerCase();
				return lc.includes(filter);
			});
		}
		else {
			newList = this.props.items;
		}

		this.setState({
			filtered: newList
		});
	}

	render() {
		const {filtered} = this.state;
    	function compare(a,b) {
      		const nameA = a.name;
      		const nameB = b.name;

      		let comparison = 0;
		    if (nameA > nameB) {
		    	comparison = 1;
		    } else if (nameA < nameB) {
		    	comparison = -1;
		    }
      		return comparison;
    	}

    	const fungsisort = () => {
      		console.log(filtered.sort(compare));
      		this.setState({ filtered: filtered })
    	}

		return (
			<div>
				<div className="row">
	                <div className="col-md-12">                        
	                    <div className="panel panel-default">
	                        <div className="panel-body">
	                            <p>Use search to find contacts. You can search by name</p>
	                            <form className="form-horizontal">
	                                <div className="form-group">
	                                    <div className="col-md-8">
	                                        <div className="input-group">
	                                            <div className="input-group-addon">
	                                                <span className="fa fa-search"></span>
	                                            </div>
	                                            <input type="text" className="form-control" onChange={this.handleChange} placeholder="Who are you looking for?"/>
	                                        </div>
	                                    </div>
	                                </div>
	                            </form>     
	                            <br />                   
	                            <button className="btn btn-primary" onClick={fungsisort}>
	                  				Sort By Name
	                			</button>            
	                        </div>
	                    </div>                        
	                </div>
	            </div>
	            <div className="row">
					{
						this.state.filtered.map(item => {
							const {name, location, thumbnail, email, phone, username} = item;
							return (
								<div key={phone}>
									<div className="col-md-3">
			                            <div className="panel panel-default">
			                                <div className="panel-body profile">
			                                    <div className="profile-image">
			                                        <img src={thumbnail} alt={name} />
			                                    </div>
			                                    <div className="profile-data">
			                                        <div className="profile-data-name">{name}</div>
			                                        <div className="profile-data-title">{username}</div>
			                                    </div>
			                                    <div className="profile-controls">
			                                        <a href="#" className="profile-control-left"><span className="fa fa-info"></span></a>
			                                        <a href="#" className="profile-control-right"><span className="fa fa-phone"></span></a>
			                                    </div>
			                                </div>                                
			                                <div className="panel-body">                                    
			                                    <div className="contact-info">
			                                        <p><small>Mobile</small><br/>{phone}</p>
			                                        <p><small>Email</small><br/>{email}</p>
			                                        <p><small>Address</small><br/>{location}</p>                                   
			                                    </div>
			                                </div>                                
			                            </div>
			                        </div>
		                        </div>
							)
						})
					}
				</div>
			</div>
		);
	}
}