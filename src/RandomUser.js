import React from 'react';

export class RandomUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			filtered: []
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		fetch("https://randomuser.me/api/?results=12")
			.then(res => res.json())
			.then(parsedJSON => parsedJSON.results.map(data => (
				{
					firstName: `${data.name.first}`,
		            lastName: `${data.name.last}`,
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
			.catch(error => console.log('parsing failed', error));

		this.setState({
			filtered: this.props.items
		})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			filtered: nextProps.items
		})
	}

	render() {
		const {items} = this.state;

		return (
			<div>
				<div className="row">
                    <div className="col-md-12">                        
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <p>Use search to find contacts. You can search by: name, address, phone. Or use the advanced search.</p>
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <div className="col-md-8">
                                            <div className="input-group">
                                                <div className="input-group-addon">
                                                    <span className="fa fa-search"></span>
                                                </div>
                                                <input type="text" className="form-control" onChange={this.handleChange} placeholder="Who are you looking for?"/>
                                                <div className="input-group-btn">
                                                    <button className="btn btn-primary">Search</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>                                    
                            </div>
                        </div>                        
                    </div>
                </div>
                <div className="row">
					{
						items.length > 0 ? items.map(item => {
							const {firstName, lastName, location, thumbnail, email, phone, username} = item;
							return (
								<div key={phone}>
									<div className="col-md-3">
			                            <div className="panel panel-default">
			                                <div className="panel-body profile">
			                                    <div className="profile-image">
			                                        <img src={thumbnail} alt={firstName} />
			                                    </div>
			                                    <div className="profile-data">
			                                        <div className="profile-data-name">{firstName} {lastName}</div>
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
							);
						}) : null
					};
				</div>
			</div>
		);
	}

	handleChange(e) {
		let currentList = [];
		let newList = [];

		if(e.target.value !== "") {
			currentList = this.props.items;

			newList = currentList.filter(item => {
				const lc = item.toLowerCase();
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
}