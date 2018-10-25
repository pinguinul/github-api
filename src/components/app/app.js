import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { fetchProfiles } from '../../actions';
import { fetchProfiles } from '../../epics';
import './app.less';
import Repos from '../repos/repos';

class App extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: '',
            reposPerPage: this.props.reposPerPage,
            currentPage: 1,
            order: 'name',
            sort: 'asc',
        };
    }

    onSubmit(e) {
        e.preventDefault();
        this.usernameInput.parentNode.classList.remove('has-error');
        const username = this.usernameInput.value;
        if (!username) {
            this.usernameInput.parentNode.classList.add('has-error');
        } else {
            const reposPerPage = this.reposPerPageInput.value ? this.reposPerPageInput.value : this.props.reposPerPage;
            this.setState({
                username,
                reposPerPage,
                currentPage: 1,
            });
            this.props.fetchProfiles(username, reposPerPage);
        }
    }

    onClickNavigationPage(e, nextPage) {
        e.preventDefault();
        this.setState({
            currentPage: parseInt(nextPage, 10),
        });
        this.props.fetchProfiles(
            this.state.username,
            this.state.reposPerPage,
            nextPage,
            this.state.order, this.state.sort
        );
    }

    onChangeOrder(e) {
        this.setState({
            order: e.target.value,
        });
    }

    onChangeSort(e) {
        this.setState({
            sort: e.target.value,
        });
    }

    onSubmitOrderByForm(e) {
        e.preventDefault();
        this.props.fetchProfiles(this.state.username, this.state.reposPerPage, 1, this.state.order, this.state.sort);
    }

    render() {
        // console.log(this.props);
        console.log('render');
        const loadingState = this.props.isLoading ?
            <div className="loading-state text-center">Fetching repos...</div> :
            null;

        let repos;
        if (this.props.repos.length) {
            // console.log(666);
            repos = this.props.repos.map(repo =>
                <li key={repo.id} className="list-group-item">
                    <a target="_blank" rel="noopener noreferrer" href={repo.svn_url}>{repo.name}</a>
                    {repo.description && (<p className="repo-description">({repo.description})</p>)}
                </li>
            );
        }

        const links = this.props.links.map(link => (
            <li key={this.props.links.indexOf(link)} className="page-item">
                <a
                    className="page-link"
                    href={link.url}
                    rel={link.rel}
                    onClick={e => this.onClickNavigationPage(e, link.page)}
                >
                    {link.rel}
                </a>
            </li>
        ));

        return (
            <div className="my-app">
                <h1 className="text-center">Github repositories app</h1>
                <form onSubmit={this.onSubmit} className="username-form">
                    <div className="form-group">
                        <label htmlFor="username">
                            Please enter a Github username <sup>Required</sup>
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="username"
                            ref={(input) => { this.usernameInput = input; }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="repos-per-page">
                            Please enter how many repos you want per page <sup>Default value is 1</sup>
                        </label>
                        <input
                            className="form-control"
                            type="number"
                            name="repos-per-page"
                            ref={(input) => { this.reposPerPageInput = input; }}
                            defaultValue={this.props.reposPerPage}
                            min={1}
                        />
                    </div>
                    <input type="submit" value="Submit" className="btn btn-default" />
                </form>
                {loadingState}
                {repos && !this.props.isLoading &&
                    <Repos
                        list={repos}
                        username={this.state.username}
                        currentPage={this.state.currentPage}
                        onSubmitOrderByForm={e => this.onSubmitOrderByForm(e)}
                        onChangeOrder={e => this.onChangeOrder(e)}
                        onChangeSort={e => this.onChangeSort(e)}
                    />
                }
                <nav aria-label="Page navigation example" className="text-center">
                    <ul className="pagination">
                        {links}
                    </ul>
                </nav>
            </div>
        );
    }

}

export default connect(
    state => ({
        isLoading: state.isLoading,
        repos: state.repos,
        links: state.links,
    }),
    dispatch => ({
        fetchProfiles: (username, reposPerPage, page, orderBy, direction) => {
            dispatch(fetchProfiles(username, reposPerPage, page, orderBy, direction));
        },
    })
)(App);

App.propTypes = {
    fetchProfiles: PropTypes.func,
    isLoading: PropTypes.bool,
    repos: PropTypes.arrayOf(PropTypes.object),
    links: PropTypes.arrayOf(PropTypes.object),
    reposPerPage: PropTypes.number,
};

App.defaultProps = {
    fetchProfiles: () => {},
    isLoading: false,
    repos: [],
    links: [],
    reposPerPage: 1,
};
