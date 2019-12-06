import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {addProjectTask} from "../../actions/projectTaskActons"
import classnames from "classnames"

class AddProjectTask extends Component {
    constructor(){
        super();
        this.state = {
            name : "",
            description : "",
            employee : "",
            hours : "",
            status : "",
            errors : {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors : nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const newProjectTask = {
            name : this.state.name,
            description : this.state.description,
            employee : this.state.employee,
            hours : this.state.hours,
            status : this.state.status
        };
       // console.log(newProjectTask);
       this.props.addProjectTask(newProjectTask, this.props.history);
    }
    render() {
        const {errors} = this.state;
        return (
            <div className="addProjectTask">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/projectBoard" className="btn btn-light">
                                Back to Board
                            </Link>
                            <h4 className="display-4 text-center">Add /Update Project</h4>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" 
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid":errors.name
                                    })} 
                                    name="name"
                                    value={this.state.name} 
                                    placeholder="Project Task name"
                                    onChange={this.onChange} />
                                    {
                                        errors.name && (
                                            <div className="invalid-feedback">{errors.name}</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="text" 
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid":errors.description
                                    })} 
                                    name="description"
                                    value={this.state.description} 
                                    placeholder="Project Task description"
                                    onChange={this.onChange} />
                                    {
                                        errors.description && (
                                            <div className="invalid-feedback">{errors.description}</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="number" 
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid":errors.hours
                                    })} 
                                    name="hours"
                                    value={this.state.hours} 
                                    placeholder="Number of hours"
                                    onChange={this.onChange} />
                                    {
                                        errors.hours && (
                                            <div className="invalid-feedback">{errors.hours}</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                <input type="text" 
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid":errors.employee
                                })} 
                                name="employee"
                                value={this.state.employee} 
                                placeholder="Employee name"
                                onChange={this.onChange} />
                                {
                                    errors.employee && (
                                        <div className="invalid-feedback">{errors.employee}</div>
                                    )
                                }
                            </div>
                                <div className="form-group">
                                    <select className="form-control form-control-lg" 
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}>
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>
                                <input type="submit" className="btn btn-dark btn-block mt-4" value="Submit"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddProjectTask.propTypes = {
    addProjectTask:PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, {addProjectTask}) (AddProjectTask);
