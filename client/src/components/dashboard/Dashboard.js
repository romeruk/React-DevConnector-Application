import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
	deleteAccount,
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading }
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'>
				Dashboard
				<p className='lead'>
					<i className='fas fa-user'>Welcome {user && user.name}</i>
				</p>
				{profile !== null ? (
					<Fragment>
						<DashboardActions />
						<Experience experience={profile.experience} />
						<Education education={profile.education} />

						<div className='my-2'>
							<button onClick={() => deleteAccount()} className='btn btn-danger'>
								<i className='fa fa-user-minus' />
							</button>
						</div>
					</Fragment>
				) : (
					<Fragment>
						<p>You have not yet setup a profile</p>
						<Link to='/create-profile' className='btn btn-primary my-1'>
							Create Profile
						</Link>
					</Fragment>
				)}
			</h1>
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ getCurrentProfile, deleteAccount }
)(Dashboard);
