import React, { Component, PropTypes } from 'react';

export default class Repos extends Component {
    render() {
        if (!this.props.list.length) {
            return null;
        }

        return (
            <div className="repos-list">
                <div className="repos-info">
                    <h4 className="text-center">
                        Repos list for&nbsp;
                        <a
                            className="user"
                            href={`https://github.com/${this.props.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {this.props.username}
                        </a>
                    </h4>
                    <p className="current-page-info text-center">
                        (Current page: <strong>{this.props.currentPage}</strong>)
                    </p>
                </div>
                <form className="order-form" onSubmit={e => this.props.onSubmitOrderByForm(e)}>
                    <div className="form-group form-inline">
                        <label htmlFor="order">Order repos by: </label>
                        <select className="form-control" id="order" onChange={e => this.props.onChangeOrder(e)}>
                            <option value="name" default>Full name</option>
                            <option value="created">Date created</option>
                            <option value="updated">Date updated</option>
                            <option value="pushed">Date pushed</option>
                        </select>
                        <label htmlFor="sort">Sort: </label>
                        <select className="form-control" id="sort" onChange={e => this.props.onChangeSort(e)}>
                            <option value="asc" default>Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                        <input type="submit" value="Submit" className="btn btn-default" />
                    </div>
                </form>
                <ul className="list-group">{this.props.list}</ul>
            </div>
        );
    }
}

Repos.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object),
    username: PropTypes.string,
    currentPage: PropTypes.number,
    onSubmitOrderByForm: PropTypes.func.isRequired,
    onChangeOrder: PropTypes.func.isRequired,
    onChangeSort: PropTypes.func.isRequired,
};

Repos.defaultProps = {
    list: [],
    username: '',
    currentPage: 1,
};
